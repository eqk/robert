import assert from 'assert';
import {HitbtcService} from '../src/xchng/hitbtc';

const a = new HitbtcService({
    apiKey: '50326421a58eb0d56e67676c448ecbe3',
    apiSecret: 'b4a4d6b823506a3e9aa0375a5ac7c8ee'
});

a.setPair();

describe('Test HitBtc api', () => {
    describe('Test balance', () => {
        it('should return balance array', (done) => {
            a.balance()
                .then((balance) => {
                    assert.equal(Array.isArray(balance), true);
                    assert.notEqual(balance.length, 0);
                    assert.notEqual(balance[0].currency, undefined);
                    assert.notEqual(balance[0].value, undefined);
                    done();
                })
                .catch(done);
        });
    });

    describe('Test isAvailable', () => {
        it('should return bool',(done) => {
            assert.equal(a.isAvailable(['eth', 'btc']), true);
            assert.equal(a.isAvailable(['btc', 'eth']), true);
            assert.equal(a.isAvailable(['btc', 'cock']), false);
            assert.equal(a.isAvailable(['cock', 'btc']), false);
            done();
        });
    });

    describe('Test maxbid_minask', () => {
        it('should return object',(done) => {
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
                    assert.equal(orders.bids[0][2], 'HitBTC');
                    assert.equal(orders.asks[0][2], 'HitBTC');
                    assert.equal(isNaN(orders.asks[0][0]), false);
                    assert.equal(isNaN(orders.asks[0][1]), false);
                    assert.equal(isNaN(orders.bids[0][0]), false);
                    assert.equal(isNaN(orders.bids[0][1]), false);
                    done();
                })
                .catch(done);
        });
    });

    describe('Test set pair', () => {
        it('should set pair', (done) => {
            a.setPair(['caas', 'asas']);
            assert.equal(a.pair, '');
            a.setPair(['btc', 'doge']);
            assert.equal(a.pair, 'DOGEBTC');
            done();
        });
    });

    describe('Test get order', () => {
        it('should return order', (done) => {
            a.getOrder(425817975)
                .then()
                .catch((res) => {
                    if (!res.success && res.errorMsg === 'Order not found') {
                        done();
                    }
                });
        });
    });

    describe('Test userOpenOrders', () => {
        it('should return user orders', (done) => {
            a.userOpenOrders()
                .then((orders) => {
                    assert.equal(Array.isArray(orders), true);
                    if (orders.length !== 0) {
                        const order = orders[0];
                        assert.notEqual(order.orderId, undefined);
                        assert.notEqual(order.orderStatus, undefined);
                        assert.notEqual(order.orderQuantity, undefined);
                        assert.notEqual(order.type, undefined);
                    }
                    done();
                })
                .catch(done);
        });
    });

    describe('Test orderCancel', () => {
        it('should cancel order', (done) => {
            a.orderCancel('5bea64be212653c1bd6a8f064ac4a26e')
                .then()
                .catch((res) => {
                    assert.equal(res.success, false);
                    assert.equal(res.errorMsg, 'Order not found');
                    done();
                });
        });
    });

    describe('Test order create and cancel', () => {
        it('should create and cancel order', (done) => {
            a.setPair(['usd', 'btc']);
            a.orderCreate(1, 1, 'buy')
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