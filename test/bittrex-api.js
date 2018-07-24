import assert from 'assert';
import {BittrexService} from '../src/xchng/bittrex';

const a = new BittrexService({
    apiKey: '5fdc7db03ec640e0b7c999b2974fff71',
    apiSecret: '8ce9441e5e554b9e825183593ab7f8ce'
});

const arr_eq = (a1, a2) => {
    return a1.length === a2.length && a1.every((v, i) => v === a2[i]);
};

a.setPair();

describe('Test Bittrex api', () => {
    describe('Test isAvailable', () => {
        it('should check if pair is available', (done) => {
            assert.equal(a.isAvailable(['eth', 'qrl']), true);
            assert.equal(a.isAvailable(['qrl', 'eth']), true);
            assert.equal(a.isAvailable(['btc', 'eth']), true);
            assert.equal(a.isAvailable(['btcw', 'eth']), false);
            done();
        });
    });

    describe('Test setPair', () => {
        it('should set pair', (done) => {
            a.setPair(['eth', 'qrl']);
            assert.equal(a.pair, 'ETH-QRL');
            a.setPair(['storj', 'eth']);
            assert.equal(a.pair, 'ETH-STORJ');
            a.setPair();
            done();
        });
    });

    describe('Test maxbid_minask', () => {
        it('should return object', (done) => {
            a.maxbid_minask()
                .then((res) => {
                    assert.notEqual(res.maxBid, undefined);
                    assert.notEqual(res.minAsk, undefined);
                    done();
                })
                .catch(done);
        });
    });

    describe('Test getOrders', () => {
        it('should return orders', (done) => {
            const limit = Math.floor(Math.random() * 100);
            a.getOrders(limit)
                .then((orders) => {
                    assert.equal(Array.isArray(orders.bids), true);
                    assert.equal(Array.isArray(orders.asks), true);
                    assert.equal(orders.bids.length, limit);
                    assert.equal(orders.asks.length, limit);
                    assert.equal(orders.bids[0].length, 3);
                    assert.equal(orders.asks[0].length, 3);
                    assert.equal(orders.bids[0][2], 'Bittrex');
                    assert.equal(orders.asks[0][2], 'Bittrex');
                    assert.equal(isNaN(orders.asks[0][0]), false);
                    assert.equal(isNaN(orders.asks[0][1]), false);
                    assert.equal(isNaN(orders.bids[0][0]), false);
                    assert.equal(isNaN(orders.bids[0][1]), false);
                    done();
                })
                .catch(done);
        });
    });

    describe('Test balance', () => {
        it('should return balance array', (done) => {
            a.balance()
                .then((balance) => {
                    assert.equal(Array.isArray(balance), true);
                    assert.notEqual(balance.length, 0);
                    assert.notEqual(balance[0].currency, undefined);
                    assert.equal(isNaN(balance[0].value), false);
                    assert.notEqual(balance[0].value, undefined);
                    done();
                })
                .catch(done);
        });
    });

    describe('Test order create cancel and user list', () => {
        it('should create order, check it and cancel', (done) => {
            a.setPair(['btc', 'xrp']);
            assert.equal(a.pair, 'BTC-XRP');
            a.orderCreate(0.5, 3, 'buy')
                .then((res) => {
                    assert.notEqual(res.order_id, undefined);
                    const order_id = res.order_id;
                    const cancel_order = (err) => {
                        a.orderCancel(order_id).then().catch();
                        done(err);
                    };
                    a.isCancel(order_id)
                        .then((is_cancel) => {
                            assert.equal(is_cancel, false);
                            a.getOrder(order_id)
                                .then((order) => {
                                    console.log(order);
                                    assert.equal(order.clientOrderId, order_id);
                                    assert.equal(order.type, 'limit');
                                    assert.equal(order.side, 'buy');
                                    a.orderCancel(order_id)
                                        .then(() => {
                                            a.isCancel(order_id)
                                                .then((is) => {
                                                    assert.equal(is, true);
                                                    done();
                                                })
                                                .catch(cancel_order);
                                        })
                                        .catch(cancel_order);
                                })
                                .catch(cancel_order);
                        })
                        .catch(cancel_order);
                })
                .catch(done);
        });
    });
});

