import mysql from 'mysql';
import assert from 'assert';
import {
    getOrdersToPlace, getOrderFilter,
    Spread, DIGITS,
    SaveOrder, GetOrder, getPendingOrders
} from '../src/orderManager';


const c1_Orders = {
    BTCUSD: {
        CockTopia: {
            BID: [
                {rate: 6500, amount: 0.1, name: 'CockTopia'},
                {rate: 6502, amount: 0.12, name: 'CockTopia'},
                {rate: 6400, amount: 0.38, name: 'CockTopia'},
                {rate: 6300, amount: 0.002, name: 'CockTopia'},
                {rate: 6600, amount: 0.2, name: 'CockTopia'},
            ],
            ASK: [
                {rate: 6600, amount: 0.02, name: 'CockTopia'},
                {rate: 6602, amount: 0.13, name: 'CockTopia'},
                {rate: 6500, amount: 0.44, name: 'CockTopia'},
                {rate: 6400, amount: 0.002, name: 'CockTopia'},
                {rate: 6700, amount: 0.24, name: 'CockTopia'},
            ]
        },
        HitMyCock: {
            BID: [
                {rate: 6489, amount: 0.1, name: 'HitMyCock'},
                {rate: 6508, amount: 0.12, name: 'HitMyCock'},
                {rate: 6412, amount: 0.38, name: 'HitMyCock'},
                {rate: 6399, amount: 0.002, name: 'HitMyCock'},
                {rate: 6589, amount: 0.2, name: 'HitMyCock'},
            ],
            ASK: [
                {rate: 6601, amount: 0.02, name: 'HitMyCock'},
                {rate: 6602, amount: 0.13, name: 'HitMyCock'},
                {rate: 6521, amount: 0.44, name: 'HitMyCock'},
                {rate: 6484, amount: 0.002, name: 'HitMyCock'},
                {rate: 6664, amount: 0.24, name: 'HitMyCock'},
            ]
        },
        BitCock: {
            BID: [
                {rate: 6489, amount: 0.1, name: 'BitCock'},
                {rate: 6508, amount: 0.12, name: 'BitCock'},
                {rate: 6412, amount: 0.38, name: 'BitCock'},
                {rate: 6399, amount: 0.002, name: 'BitCock'},
                {rate: 6589, amount: 0.2, name: 'BitCock'},
            ],
            ASK: [
                {rate: 6601, amount: 0.02, name: 'BitCock'},
                {rate: 6602, amount: 0.13, name: 'BitCock'},
                {rate: 6521, amount: 0.44, name: 'BitCock'},
                {rate: 6484, amount: 0.002, name: 'BitCock'},
                {rate: 6664, amount: 0.24, name: 'BitCock'},
            ]
        }
    }
};

const c1_order_ask = {
    Type: 'ASK',
    Amount: 0.5,
    Rate: 6420,
    PairFrom: 'BTC',
    PairTo: 'USD',
    Updated: 'KEK',
    RateOpen: '0.00012',
    AmountOpen: '0.120210',
    Status: 'STATUS',
    Source: 'SOUERCE',
    Email: 'cock@cock.cock',
    OrderId: 12313,
    OrderType: 'Type',
    AmountChange: '0.012',
    Total: 'TOTAL'
};

const c2_order_bid = {
    Type: 'BID',
    Amount: 0.5,
    Rate: 7230,
    PairFrom: 'ETH',
    PairTo: 'XRP',
    Updated: 'KEK',
    RateOpen: '0.00012',
    AmountOpen: '0.120210',
    Status: 'STATUS',
    Source: 'SOUERCE',
    Email: 'cock@cock.cock',
    OrderId: 12313,
    OrderType: 'Type',
    AmountChange: '0.012',
    Total: 'TOTAL'
};

describe('Test methods', () => {
    describe('Test find orders', () => {
        it('should return true', (done) => {
            assert.equal(true, true);
            done();
        });
    });

    describe('Order filter test', () => {
        it('Should reverse bid order', (done) => {
            const filter = getOrderFilter(c1_order_ask);
            assert.equal(filter.Type, 'BID');
            assert.equal(filter.Pair, 'BTCUSD');
            let bidArTest = [];
            for (let i = 0; i < 20; ++i) {
                bidArTest.push({
                    rate: c1_order_ask.Rate + Math.random() * 20 - 10
                });
            }
            bidArTest = bidArTest.filter(filter.RateFilter).sort(filter.RateSorter);
            for (let i = 0; i < bidArTest.length - 2; i++) {
                assert.equal(bidArTest[i].rate > c1_order_ask.Rate, true);
                assert.equal(bidArTest[i].rate > bidArTest[i + 1].rate, true);
            }
            done();
        });

        it('Should reverse ASK order', (done) => {
            const filter1 = getOrderFilter(c2_order_bid);
            assert.equal(filter1.Type, 'ASK');
            assert.equal(filter1.Pair, 'ETHXRP');
            let bidArTest1 = [];
            for (let i = 0; i < 20; ++i) {
                bidArTest1.push({
                    rate: c2_order_bid.Rate + Math.random() * 20 - 10
                });
            }
            bidArTest1 = bidArTest1.filter(filter1.RateFilter).sort(filter1.RateSorter);
            for (let i = 0; i < bidArTest1.length - 2; i++) {
                assert.equal(bidArTest1[i].rate < c2_order_bid.Rate, true);
                assert.equal(bidArTest1[i].rate < bidArTest1[i + 1].rate, true);
            }
            done();
        });
    });

    describe('Order Spread test', () => {
        it('Should Spread order 1', (done) => {
            const orders = [
                {amount: 0.0001, rate: 0.1, name: 'Cock'},
                {amount: 0.0000034, rate: 0.2, name: 'Cock'},
                {amount: 0.000000003, rate: 0.3, name: 'Cock'},
                {amount: 0.00300002, rate: 0.4, name: 'Cock'},
                {amount: 0.02000001, rate: 0.5, name: 'Cock'},
                {amount: 0.000000001, rate: 0.6, name: 'Cock'},
                {amount: 0.022002, rate: 0.7, name: 'Cock'},
                {amount: 0.1, rate: 0.8, name: 'Cock'},
                {amount: 0.200002, rate: 0.9, name: 'Cock'},
                {amount: 0.6, rate: 1.0, name: 'Cock'},
                {amount: 0.06, rate: 1.1, name: 'Cock'},
                {amount: 0.001, rate: 1.2, name: 'Cock'},
                {amount: 0.2, rate: 1.3, name: 'Cock'},
                {amount: 0.2, rate: 1.4, name: 'Cock'},
                {amount: 0.2, rate: 1.5, name: 'Cock'},
            ];
            const amount = 1.006; // 892566

            const spread = Spread(amount, orders);

            for (let i = 0; i < spread.length - 2; ++i) {
                assert.equal(spread[i].amount, orders[i].amount);
                assert.equal(spread[i].rate, orders[i].rate);
            }
            assert.equal(spread[spread.length - 1].amount, 0.000892566);
            done();
        });

        it('Should spread order 2', (done) => {
            const mult = Number((Math.random() * 10).toFixed(DIGITS));
            const amount = Number((Math.random() * mult).toFixed(DIGITS));


            let orders = [];
            const iterations = 100;
            for (let i = 0; i < iterations; ++i) {
                orders.push({
                    rate: Number((Math.random() * mult).toFixed(DIGITS)),
                    amount: Number((Math.random()).toFixed(DIGITS)),
                    name: 'LifeTrade'
                });
            }

            const spread = Spread(amount, orders);
            for (let i = 0; i < spread.length - 2; ++i) {
                assert.equal(spread[i].amount, orders[i].amount);
                assert.equal(spread[i].rate, orders[i].rate);
            }

            const spent = spread.reduce((s, x) => s + x.amount, 0);
            assert.equal(spent.toFixed(DIGITS), amount.toFixed(DIGITS));
            done();
        });
    });

    describe('Test get orders to place', () => {
        it('Should return orders to place', (done) => {
            const orders = [
                {amount: 0.0001, rate: 6421, name: 'Cock'},
                {amount: 0.0001, rate: 6419, name: 'Cock'},
                {amount: 0.0001, rate: 6418, name: 'Cock'},
                {amount: 0.0001, rate: 6000, name: 'Cock'},
                {amount: 0.001, rate: 6421, name: 'Cock'}, // 0.0011
                {amount: 0.0301, rate: 6421, name: 'Cock'}, // 0.0311
                {amount: 0.2, rate: 6430, name: 'Cock'}, // 0.2311
                {amount: 0.2, rate: 6400, name: 'Cock'},
                {amount: 0.00001, rate: 6440, name: 'Cock'}, // 0.23111
                {amount: 0.20001, rate: 6455, name: 'Cock'}, // 0.43112
                {amount: 0.003, rate: 6420, name: 'Cock'}, //
            ];
            const filter = getOrderFilter(c1_order_ask);
            const ordersToPlace = getOrdersToPlace(c1_order_ask, orders, filter);

            let total = 0;
            ordersToPlace.forEach((order) => {
                assert.equal(order.rate >= c1_order_ask.Rate, true);
                total += order.amount;
            });

            assert.equal(total <= c1_order_ask.Amount, true);
            done();
        });

        it('Should return empty array', (done) => {
            const orders = [
                {amount: 0.0001, rate: 6415, name: 'Cock'},
                {amount: 0.0001, rate: 6419, name: 'Cock'},
                {amount: 0.0001, rate: 6418, name: 'Cock'},
                {amount: 0.0001, rate: 6000, name: 'Cock'},
                {amount: 0.001, rate: 6300, name: 'Cock'}, // 0.0011
                {amount: 0.0301, rate: 6415, name: 'Cock'}, // 0.0311
                {amount: 0.2, rate: 6111, name: 'Cock'}, // 0.2311
                {amount: 0.2, rate: 6400, name: 'Cock'},
                {amount: 0.00001, rate: 6410, name: 'Cock'}, // 0.23111
                {amount: 0.20001, rate: 6405, name: 'Cock'}, // 0.43112
                {amount: 0.003, rate: 6419.5, name: 'Cock'}, //
            ];
            const filter = getOrderFilter(c1_order_ask);
            const ordersToPlace = getOrdersToPlace(c1_order_ask, orders, filter);
            assert.equal(ordersToPlace.length, 0);
            done();
        });

        it('Should return 1 elem array', (done) => {
            const orders = [
                {amount: 0.0001, rate: 6415, name: 'Cock'},
                {amount: 0.0001, rate: 6419, name: 'Cock'},
                {amount: 0.0001, rate: 6418, name: 'Cock'},
                {amount: 0.0001, rate: 6000, name: 'Cock'},
                {amount: 0.001, rate: 6300, name: 'Cock'}, // 0.0011
                {amount: 0.0301, rate: 6415, name: 'Cock'}, // 0.0311
                {amount: 0.2, rate: 6111, name: 'Cock'}, // 0.2311
                {amount: 0.2, rate: 6400, name: 'Cock'},
                {amount: 0.00001, rate: 6410, name: 'Cock'}, // 0.23111
                {amount: 0.20001, rate: 6405, name: 'Cock'}, // 0.43112
                {amount: 0.6, rate: 6500, name: 'Cock'}, //
            ];

            const filter = getOrderFilter(c1_order_ask);
            const ordersToPlace = getOrdersToPlace(c1_order_ask, orders, filter);
            assert.equal(ordersToPlace.length, 1);
            assert.equal(ordersToPlace[0].amount, 0.5);
            done();
        });

        it('Should return orders to place', (done) => {
            const rate = 1000;
            const minRate = 3000;
            const iterations = 100;
            const amountRand = 100;
            let orders = [];

            for (let i = 0; i < iterations; i++) {
                orders.push({
                    amount: Math.random() * amountRand,
                    rate: Math.random() * rate + minRate,
                    name: 'Cock'
                });
            }

            const order = {
                Type: 'BID',
                Amount: Math.random() * amountRand,
                Rate: Math.random() * rate + minRate,
            };

            const filter = getOrderFilter(order);
            const ordersToPlace = getOrdersToPlace(order, orders, filter);

            ordersToPlace.forEach((o) => {
                assert.equal(o.rate <= order.Rate, true);

            });
            const total = ordersToPlace.reduce((s, x) => s + x.amount, 0);
            assert.equal(total.toFixed(DIGITS - 1), order.Amount.toFixed(DIGITS - 1));
            done();
        });

        it('Should save order to DB', (done) => {
            const order = {
                Type: 'ASK',
                Amount: 0.5,
                Rate: '6500',
                PairFrom: 'BTC',
                PairTo: 'USD',
                RateOpen: '0.00012',
                AmountOpen: '0.120210',
                Status: 'Opened',
                Source: 'Winnex',
                Email: 'cock@cock.cock',
                OrderId: ~~(Math.random() * 10000),
                OrderType: 'Limit',
                AmountChange: '0.012',
                Total: '3250'
            };

            SaveOrder(order)
                .then((res) => {
                    const id = res.insertId;
                    GetOrder(id)
                        .then((orderFromDb) => {
                            assert.equal(order.Amount, orderFromDb.Amount);
                            assert.equal(order.Type, orderFromDb.Type);
                            assert.equal(order.Rate, orderFromDb.Rate);
                            assert.equal(order.PairFrom, orderFromDb.PairFrom);
                            assert.equal(order.PairTo, orderFromDb.PairTo);
                            assert.equal(order.RateOpen, orderFromDb.RateOpen);
                            assert.equal(order.AmountOpen, orderFromDb.AmountOpen);
                            assert.equal(order.Status, orderFromDb.Status);
                            assert.equal(order.Source, orderFromDb.Source);
                            assert.equal(order.Email, orderFromDb.Email);
                            assert.equal(order.OrderId, orderFromDb.OrderId);
                            assert.equal(order.OrderType, orderFromDb.OrderType);
                            assert.equal(order.Total, orderFromDb.Total);

                            const deleteOrderQuery = 'DELETE FROM orders WHERE Id=?';
                            const db = mysql.createConnection({
                                //TODO config
                                host: 'localhost',
                                user: 'root',
                                database: 'tbot_db'
                            });
                            db.query(deleteOrderQuery, [id], (err, res) => {
                                done();
                            });
                        })
                        .catch(console.error);
                })
                .catch(console.error);

        });

        it('Should retrieve pending orders', (done) => {
            getPendingOrders()
                .then((orders) => {
                    orders.forEach((order) => {
                        assert.equal(order.Progress, 'pending');
                    });
                    done();
                })
                .catch(console.error);
        });
    });
});
