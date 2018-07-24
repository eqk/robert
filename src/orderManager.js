import {OrderProvider} from './orderFiller';

OrderProvider.Start();

import mysql from 'mysql';
import {BittrexService} from './xchng/bittrex';
import {CryptopiaService} from './xchng/cryptopia';
import {HitbtcService} from './xchng/hitbtc';

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

const db = mysql.createConnection({
    //TODO config
    host: 'localhost',
    user: 'root',
    database: 'tbot_db'
});

export const SaveOrder = (order) => {
    const insertOrderQuery = 'INSERT INTO orders (PairFrom, PairTo, Type, Rate, ' +
        'Amount, RateOpen, AmountOpen, Status, Source, Email, OrderId, ' +
        'OrderType, AmountChange, Total, Progress) VALUES ' +
        '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, \'pending\')';

    return new Promise((resolve, reject) => {
        db.query(insertOrderQuery, [order.PairFrom, order.PairTo, order.Type, order.Rate,
                order.Amount, order.RateOpen, order.AmountOpen, order.Status, order.Source, order.Email,
                order.OrderId, order.OrderType, order.AmountChange, order.Total],
            (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
    });
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

//TODO уточнить у биржи формат
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
    orders = orders.filter(filter.RateFilter).sort(filter.RateSorter);

    if (!orders.length) {
        //TODO log
        return [];
    }

    return Spread(order.Amount, orders);
};

const createOrder = (order) => {
    //TODO register order in DB
    //TODO Watch registered order
    //TODO sukablyad
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         console.log(order);
    //         resolve(`Order: ${type}, ${Number(order.amount.toFixed(6))}, ${order.rate}, ${order.name}`);
    //     }, Math.random() * 1000 + 1000);
    // });
    //TODO sdelat' krasivo
    switch (order.name) {
        case 'Bittrex':
            return bittrex.orderCreate(order);
        case 'Cryptopia':
            return cryptopia.orderCreate(order);
        case 'HitBTC':
            return hitbtc.orderCreate(order);
    }
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

const processPendingOrders = () => {
    getPendingOrders()
        .then((orders) => {
            orders.forEach((order) => {
                const filter = getOrderFilter(order);
                const ordersToPlace = getOrdersToPlace(order, OrderProvider.Orders[order.PairFrom + order.PairTo][order.Type], filter);
                ordersToPlace.forEach((orderToPlace) => {
                    orderToPlace.arPair = [order.PairFrom, order.PairTo];
                    orderToPlace.type = order.Type;
                    createOrder(orderToPlace) //TODO true param
                        .then(saveExternalOrder);
                });
            });
        })
        .catch(console.error); // TODO log
};

const saveExternalOrder = (order) => {
    console.log('Save order id:', order.order_id); //TODO save
};

setInterval(processPendingOrders, 1000);