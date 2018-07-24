import {BittrexService} from './xchng/bittrex';
import {HitbtcService} from './xchng/hitbtc';
import {CryptopiaService} from './xchng/cryptopia';

let exchanges = [];

export let OrderProvider = {
    Orders: {},
    Start: () => {
        setInterval(() => {
            const promises = exchanges.map((ex) => {
                return ex.getOrders(20); // TODO config
            });
            Promise.all(promises)
                .then(saveOrders)
                .catch(console.error);
        }, 1000);
    }
};

const pairs = [
    ['eth', 'btc']
];

pairs.forEach((pair) => {

    const bittrex = new BittrexService();
    const hitbtc = new HitbtcService();
    const cryptopia = new CryptopiaService();

    if (bittrex.isAvailable(pair)) {
        bittrex.setPair(pair);
        exchanges.push(bittrex);
    }

    if (hitbtc.isAvailable(pair)) {
        hitbtc.setPair(pair);
        exchanges.push(hitbtc);
    }

    if (cryptopia.isAvailable(pair)) {
        cryptopia.setPair(pair);
        exchanges.push(cryptopia);
    }
});

const mapOrders = (orders) => {
    if (!orders.length)
        return [];

    const pair = orders[0].pairFrom + orders[0].pairTo;
    let bids = [];
    let asks = [];

    orders.forEach((order) => {
        bids = bids.concat(order.bids);
        asks = asks.concat(order.asks);
    });

    return {
        pair: pair,
        bids: bids,
        asks: asks
    }
};

const saveOrders = (orders) => {
    const mappedOrders = mapOrders(orders);
    if (!OrderProvider.Orders[mappedOrders.pair])
        OrderProvider.Orders[mappedOrders.pair] = {};

    OrderProvider.Orders[mappedOrders.pair].BID = mappedOrders.bids;
    OrderProvider.Orders[mappedOrders.pair].ASK = mappedOrders.asks;
};
