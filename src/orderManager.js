import {OrderProvider} from './orderFiller';
import mysql from 'mysql';
import {BittrexService} from './xchng/bittrex';
import {CryptopiaService} from './xchng/cryptopia';
import {HitbtcService} from './xchng/hitbtc';
import {getWinnexApiKey, getWinnexMinorDic} from './xchng/winnex';
import {Log} from './loggerMongo';

// OrderProvider.Start();

const logFiller = (err) => {
    Log('filler', err);
};

let MiniorDic = null;
export const InitMinorDic =
    getWinnexApiKey()
        .then(getWinnexMinorDic)
        .then((dictionary) => {
            MiniorDic = dictionary.reduce((obj, cur) => {
                obj[cur.Name] = cur['MinorUnit'];
                return obj;
            }, {});
            console.log('Minor dictionary initialized, length:', Object.keys(MiniorDic).length);
        })
        .catch((error) => {
            Log('winnex', error);
        });


export const DIGITS = 12;

const bittrex = new BittrexService({
    apiKey: '5fdc7db03ec640e0b7c999b2974fff71',
    apiSecret: '8ce9441e5e554b9e825183593ab7f8ce'
});
const cryptopia = new CryptopiaService({
    apiKey: '5faa3ddfb5534283a582d1658ca6cbfc',
    apiSecret: 'g7ubvgNa/HoidZD1I5pm3HmachDktm5P4mH0O4INk3U='
});
const hitbtc = new HitbtcService({
    apiKey: '50326421a58eb0d56e67676c448ecbe3',
    apiSecret: 'b4a4d6b823506a3e9aa0375a5ac7c8ee'
});

export let MinreqDic = null;
export let InitMinreqDic = bittrex.get('public/getmarkets')
    .then((markets) => {
        if (markets.success && markets.data && Array.isArray(markets.data)) {
            MinreqDic = markets.data.reduce((agr, cur) => {
                agr[cur.BaseCurrency + cur.MarketCurrency] =
                    cur.MinTradeSize;
                return agr;
            }, {});
            console.log('Minimum requirements dictionary initialized, length:', Object.keys(MinreqDic).length);
        }
        return markets;
    })
    .catch((err) => {
        Log('mindic', {err: err.toString()});
    });

const dbString = process.env.DB_STRING || 'mysql://root@localhost/tbot_db';
const db = mysql.createConnection(dbString);

export const SaveOrder = (order) => {
    return new Promise((resolve, reject) => {

        if (!MiniorDic) {
            reject(new Error('Minor dictionary not defined'));
            return;
        }

        if (!MiniorDic[order.PairTo]) {
            reject(new Error('Pair doesn\'t defined in minor dictionary'));
            return;
        }

        if (!MinreqDic) {
            reject(new Error('Minimum dictionary not defined'));
            return;
        }

        if (!MinreqDic[order.PairFrom + order.PairTo]) {
            reject(new Error('Pair doesn\'t defined in Minimum dictionary'));
            return;
        }

        order.AmountChange = Number((order.AmountChange / MiniorDic[order.PairTo]).toFixed(DIGITS));

        const minimum = MinreqDic[order.PairFrom + order.PairTo];

        // console.log('amount', order.AmountChange);
        // console.log('rate', order.Rate);
        // console.log('rate*amount', order.AmountChange * order.Rate);
        // console.log('rate*amount<0.0005', order.AmountChange * order.Rate < 0.0005);

        let table = 'orders';
        if (order.AmountChange < minimum)
            table = 'mini_orders';
        if (order.AmountChange * order.Rate < 0.0005)
            table = 'mini_orders';

        const insertOrderQuery = 'INSERT INTO ' + table + ' (PairFrom, PairTo, Type, Rate, ' +
            'Amount, RateOpen, AmountOpen, Status, Source, Email, OrderId, ' +
            'OrderType, AmountChange, Total, OppositeOrderId, Progress) VALUES ' +
            '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, \'pending\')';

        db.query(insertOrderQuery, [order.PairFrom, order.PairTo, order.Type, order.Rate,
                order.AmountChange, order.RateOpen, order.AmountOpen, order.Status, 'source', order.Email,
                order.OrderId, order.OrderType, order.AmountChange, order.Total, order.OppositeOrderId],
            (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
    });
};

export const ProcessOrder = (order) => {
    return new Promise((resolve, reject) => {
        try {
            checkDictionaries(order.PairTo, order.PairFrom);
        } catch (e) {
            reject(e);
        }

        const minor = MiniorDic[order.PairTo];
        const minimum = MinreqDic[order.PairFrom + order.PairTo];

        order.Amount = Number((order.AmountChange / minor).toFixed(DIGITS));

        getWeightedArithmeticMeanFromQueue(order)
            .then((mean) => {
                Log('mean', mean);
                if (mean.amountSum >= minimum && mean.weightedMean * mean.amountSum >= 0.0005)
                    return makeOrder(mean, order)
                        .then((mkOrderRes) => {
                            setOrdersUsed(mean.ids);
                            resolve(mkOrderRes);
                        })
                        .catch((err) => {
                            enqueueOrder(order);
                            unlockOrders(mean.ids);
                            reject(err);
                        });
                else {
                    unlockOrders(mean.ids);
                    return enqueueOrder(order)
                        .then(resolve)
                        .catch(reject);
                }
            })
            .catch(reject);
    });
};


const makeOrder = async (mean, order) => {
    return new Promise((resolve, reject) => {
        Log('makingOrder', {mean: mean, order: order});
        order.Rate = mean.weightedMean;
        order.Amount = mean.amountSum;

        bittrex.orderCreate(order)
            .then((res) => {
                saveExternalOrder(order)
                    .catch(reject);
                bittrex.getOrder(res.order_id)
                    .then((res) => {
                        resolve({
                            status: 'Created',
                            data: res.data
                        });
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
};

const enqueueOrder = (order) => {
    return new Promise((resolve, reject) => {
        const insertFields = 'PairFrom, PairTo, Type, Rate, Amount, RateOpen, AmountOpen, Status, Source, Email, OrderId, OppositeOrderId, OrderType, AmountChange, Total';
        const query = `INSERT INTO order_queue (PairFrom,
                                                PairTo,
                                                Type,
                                                Rate,
                                                Amount,
                                                RateOpen,
                                                AmountOpen,
                                                Status,
                                                Source,
                                                Email,
                                                OrderId,
                                                OppositeOrderId,
                                                OrderType,
                                                AmountChange,
                                                Total)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const insertDate = [order.PairFrom, order.PairTo, order.Type, order.Rate, order.Amount, order.RateOpen, order.AmountOpen, order.Status, 'source', order.Email, order.OrderId, order.OppositeOrderId, order.OrderType, order.AmountChange, order.Total];
        db.query(query, insertDate, (err, res) => {
            if (err)
                reject(err);
            else resolve({
                status: 'Enqueued',
                data: {
                    insertId: res.insertId
                }
            });
        });
    });
};

const unlockOrders = (ids) => {
    if (!Array.isArray(ids) || !ids.length)
        return;
    const query = `UPDATE order_queue SET LockId = NULL WHERE Id IN (${ids})`;
    db.query(query);
};

const setOrdersUsed = (ids) => {
    if (!Array.isArray(ids) || !ids.length)
        return;
    const query = `UPDATE order_queue SET Used = 1 WHERE Id IN (${ids})`;
    db.query(query);
};

const getWeightedArithmeticMeanFromQueue = (order) => {
    const unixtime = Date.now();
    const queryLock = 'UPDATE order_queue SET LockId = ? WHERE PairTo = ? AND PairFrom = ? AND Type = ? AND LockId IS NULL AND Used = 0';
    const dataLock = [unixtime, order.PairTo, order.PairFrom, order.Type];

    const queryGetIds = 'SELECT Id FROM order_queue WHERE LockId = ?';
    const dataGetIds = [unixtime];

    const getSumsQuery = 'SELECT SUM(Amount * Rate) as numerator, SUM(Amount) AS denominator FROM order_queue WHERE LockId = ?';
    const dataGetSums = [unixtime];

    return new Promise((resolve, reject) => {
        db.query(queryLock, dataLock, (err) => {
            if (err)
                reject(err);
            else {
                db.query(queryGetIds, dataGetIds, (err, ids) => {
                    ids = ids.map((id) => id['Id']);
                    if (err)
                        reject(err);
                    else {
                        db.query(getSumsQuery, dataGetSums, (err, sums) => {
                            if (err)
                                reject(err);
                            else {
                                if (isNaN(sums[0]['numerator']) || !sums[0]['numerator'])
                                    sums[0]['numerator'] = order.Amount * order.Rate;
                                else
                                    sums[0]['numerator'] += order.Amount * order.Rate;

                                if (isNaN(sums[0]['denominator']) || !sums[0]['denominator'])
                                    sums[0]['denominator'] = order.Amount;
                                else
                                    sums[0]['denominator'] += +order.Amount;

                                resolve({
                                    ids: ids,
                                    weightedMean: sums[0]['numerator'] / sums[0]['denominator'],
                                    amountSum: sums[0]['denominator']
                                });
                            }
                        });
                    }
                });
            }
        });
    });
};

const checkDictionaries = (PairTo, PairFrom) => {
    if (!MiniorDic) {
        throw new Error('Minor dictionary not defined');
    }

    if (!MinreqDic) {
        throw new Error('Minimum dictionary not defined');
    }

    if (!MiniorDic[PairTo]) {
        throw new Error(`Pair ${PairTo} doesn't defined in minor dictionary`);
    }

    if (!MinreqDic[PairFrom + PairTo]) {
        throw new Error(`Pair ${PairFrom + PairTo} doesn't defined in Minimum dictionary`);
    }
    return true;
};

export const GetOrder = (id, fields = '*') => {
    const getOrderQuery = `SELECT ${fields} FROM orders WHERE Id = ?`;
    return new Promise((resolve, reject) => {
        db.query(getOrderQuery, [id], (err, res) => {
            if (err)
                reject(err);
            resolve(res[0]);
        });
    });
};

const reverseTypes = {
    BUY: 'SELL',
    SELL: 'BUY',
    BID: 'ASK',
    ASK: 'BID'
};

export const getOrderFilter = (order) => {
    /**
     *      ASK = BUY
     *      BID = SELL
     */
    const filter = {};

    filter.Type = reverseTypes[order.Type.toUpperCase()];
    filter.Pair = order.PairFrom + order.PairTo;

    filter.RateFilter = filter.Type === 'BID' ?
        (x) => x.rate >= order.Rate : (x) => x.rate <= order.Rate;
    filter.RateSorter = filter.Type === 'BID' ?
        (a, b) => (a.rate - b.rate) * -1 : (a, b) => a.rate - b.rate;

    return filter;
};

export const Spread = (amount, orders) => {
    let spreadArr = [];
    orders.some((order) => {
        if (order.amount <= amount)
            spreadArr.push(order);
        else
            spreadArr.push(Object.assign(order, {amount: amount}));
        amount -= spreadArr[spreadArr.length - 1].amount;
        amount = Number(amount.toFixed(DIGITS));
        return amount === 0;
    });

    return spreadArr;
};

export const getOrdersToPlace = (order, orders, filter) => {
    console.log(orders.length);
    orders = orders.filter(filter.RateFilter).sort(filter.RateSorter);

    if (!orders.length) {
        Log('orderMismatch', order);
        return [];
    }

    return Spread(order.Amount, orders);
};

const createOrder = (order) => {
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         console.log(order);
    //         resolve(`Order: ${type}, ${Number(order.amount.toFixed(6))}, ${order.rate}, ${order.name}`);
    //     }, Math.random() * 1000 + 1000);
    // });
    Log('ordersToCreate', order);
    return bittrex.orderCreate(order);
    // case 'Cryptopia':
    //     return cryptopia.orderCreate(order);
    // case 'HitBTC':
    //     return hitbtc.orderCreate(order);
};

export const getPendingOrders = () => {
    const getOrdersQuery = 'SELECT * FROM orders WHERE Progress = \'pending\'';
    const setOrders = 'UPDATE orders SET Progress = \'processing\' WHERE Progress = \'pending\'';
    return new Promise((resolve, reject) => {
        db.query('BEGIN', (err) => {
            if (err) reject(err);
            db.query(getOrdersQuery, (err, orders) => {
                if (err) {
                    reject(err);
                } else {
                    db.query(setOrders, (err) => {
                        if (err) reject(err);
                        db.query('COMMIT', (err) => {
                            if (err) reject(err);
                            else
                                resolve(orders);
                        });
                    });
                }
            });
        });

    });
};

const getMiniOrdersSum = (order) => {
    const rateComparator = order.type.toUpper() === 'BID' || order.type.toUpper() === 'SELL' ?
        '<=' : '>=';

    const getOrdersQuery = `SELECT SUM(Amount) AS amount
                            FROM mini_orders ` +
        `WHERE PairFrom = ? AND PairTo = ? AND Type = ? ` +
        `Rate ${rateComparator} ? AND Status = 'pending'`;
    const updateOrdersQuery = `UPDATE mini_orders
                               SET Progress = 'added' ` +
        `WHERE PairFrom = ? AND PairTo = ? AND Type = ? ` +
        `Rate ${rateComparator} ? AND Status = 'pending'`;

    const options = [order.PairFrom, order.PairTo, order.Type];

    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err)
                reject(err);
            else
                db.query(getOrdersQuery, options, (err, sum) => {
                    if (err)
                        reject(err);
                    else
                        db.query(updateOrdersQuery, options, (err) => {
                            if (err)
                                reject(err);
                            else
                                db.commit((err) => {
                                    if (err)
                                        reject(err);
                                    else
                                        resolve(sum);
                                });
                        });
                });
        });
    });
};

export const addMiniOrders = (order) => {
    const rateComparator = order.Type.toUpperCase() === 'BID' || order.Type.toUpperCase() === 'SELL' ?
        '<=' : '>=';
    const setOrdersAddedQuery =
        `UPDATE mini_orders SET BigOrderId = ? WHERE 
         PairTo = ? AND PairFrom = ? AND Type = ? AND
         Rate ${rateComparator} ? AND
         BigOrderId IS NULL`;
    const setOrdersAddedOptions = [order.Id, order.PairTo,
        order.PairFrom, order.Type, order.Rate];

    const getOrdersAddedQuery = 'SELECT SUM(Amount) as sum FROM mini_orders WHERE BigOrderId = ?';

    return new Promise((resolve, reject) => {
        db.query(setOrdersAddedQuery, setOrdersAddedOptions, (err) => {
            if (err)
                reject(err);
            else
                db.query(getOrdersAddedQuery, order.Id, (err, res) => {
                    if (err)
                        reject(err);
                    else {
                        if (res[0].sum)
                            order.Amount = (Number(order.Amount) + res[0].sum).toFixed(DIGITS);
                        resolve(order);
                    }
                });
        });
    });
};

const processPendingOrders = () => {
    getPendingOrders()
        .then((orders) => {
            orders.forEach((order) => {
                addMiniOrders(order)
                    .then((addedOrder) => {
                        createOrder(addedOrder)
                            .then(saveExternalOrder)
                            .catch((err) => {
                                Log('orderCreation', err);
                            });
                    })
                    .catch((err) => {
                        console.error(err);
                        Log('miniOrders', {err: err.toString()});
                    });

                // OLD V1
                // const filter = getOrderFilter(order);
                // console.log(order.PairFrom + order.PairTo);
                // const ordersToPlace = getOrdersToPlace(order, OrderProvider.Orders[order.PairFrom + order.PairTo]
                //     [order.Type], filter);
                // ordersToPlace.forEach((orderToPlace) => {
                //     orderToPlace.arPair = [order.PairFrom, order.PairTo];
                //     orderToPlace.type = order.Type;
                //     createOrder(orderToPlace)
                //         .then(saveExternalOrder)
                //         .catch((err) => {
                //             Log('orderCreation', err)
                //         });
                // });
            });
        })
        .catch((err) => {
            Log('orderMatching', {error: err.toString()});
        });
};

export const saveExternalOrder = (order) => {
    const saveOrderQuery = 'INSERT INTO outer_orders (Name, Type, PairFrom, ' +
        'PairTo, Amount, Rate, OrderId) VALUES (?, ?, ?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
        db.query(saveOrderQuery, ['Bittrex', order.Type, order.PairFrom,
            order.PairTo, order.Amount, order.Rate, order.order_id], (err, res) => {
            if (err)
                reject(err);
            resolve(res);
        });
    });
};

const getExternalOpenedOrders = () => {
    const getOpenedOrdersQuery =
        'SELECT * FROM outer_orders WHERE Status = \'opened\'';

    return new Promise((resolve, reject) => {
        db.query(getOpenedOrdersQuery, (err, orders) => {
            if (err)
                reject(err);
            resolve(orders);
        });
    });
};

const setClosedExternalOrders = () => {
    getExternalOpenedOrders()
        .then((orders) => {
            orders.forEach((order) => {
                let getOrderPromise;
                switch (order.Name) {
                    case 'Bittrex':
                        getOrderPromise = bittrex.getOrder(order.OrderId)
                            .then((res) => {
                                return res.success && !res.data.isOpen;
                            });
                        break;
                    case 'Cryptopia': //TODO Криптопия дно ебаное нельзя получить свой ордер
                        getOrderPromise = new Promise(resolve => {
                            resolve(true);
                        });
                        break;
                    case 'HitBTC':
                        getOrderPromise = hitbtc.getOrder(order.OrderId)
                            .then((res) => {
                                return res && (res.status !== 'new' || res.status !== 'partiallyFilled');
                            });
                        break;
                }
                getOrderPromise
                    .then((isClosed) => {
                        if (isClosed)
                            setOrderClosed(order.OrderId)
                                .catch((err) => {
                                    Log('orderClosing', err);
                                });
                    })
                    .catch((err) => {
                        Log('getOrder', err);
                    });
            });
        })
        .catch((err) => {
            Log('orderDbGet', err);
        });
};

const setOrderClosed = (orderId) => {
    const setClosedQuery = 'UPDATE outer_orders SET Status = \'closed\' WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(setClosedQuery, orderId, (err, res) => {
            if (err)
                reject(err);
            resolve(res);
        });
    });
};

const watchExternalOrders = () => {

};

const groupMiniOrders = (order) => {
    const getTotalGroupsQuery = '';
};

setInterval(processPendingOrders, 1e3);
// setInterval(setClosedExternalOrders, 5 * 1e3);