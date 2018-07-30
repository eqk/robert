import {BittrexService} from './xchng/bittrex';
import {HitbtcService} from './xchng/hitbtc';
import {CryptopiaService} from './xchng/cryptopia';
import {Log} from './loggerMongo';

let exchanges = [];

const logFiller = (err) => {
    Log('filler', err)
};

export let OrderProvider = {
    Orders: {},
    Start: () => {
        setInterval(() => {
            exchanges.forEach((ex) => {
                ex.getOrders(20)
                    .then(saveOrders)
                    .catch(logFiller);
            });
        }, 1000);
    }
};

const pairs = [
    ['ada', 'usd'],
    ['ada', 'btc'],
    ['ada', 'eth'],
    ['btc', 'usd'],
    ['btg', 'usd'],
    ['btg', 'btc'],
    ['btg', 'eth'],
    ['dash', 'usd'],
    ['dash', 'btc'],
    ['dash', 'eth'],
    ['dcr', 'btc'],
    ['emc2', 'btc'],
    ['etc', 'usd'],
    ['etc', 'btc'],
    ['etc', 'eth'],
    ['eth', 'usd'],
    ['eth', 'btc'],
    ['ftc', 'btc'],
    ['game', 'btc'],
    ['grs', 'btc'],
    ['lbc', 'btc'],
    ['ltc', 'usd'],
    ['ltc', 'btc'],
    ['ltc', 'eth'],
    ['mona', 'btc'],
    ['neo', 'usd'],
    ['neo', 'btc'],
    ['neo', 'eth'],
    ['omg', 'usd'],
    ['omg', 'btc'],
    ['omg', 'eth'],
    ['sc', 'eth'],
    ['trx', 'eth'],
    ['trx', 'btc'],
    ['trx', 'usd'],
    ['ubq', 'btc'],
    ['via', 'btc'],
    ['xmr', 'usd'],
    ['xmr', 'btc'],
    ['xmr', 'eth'],
    ['xrp', 'usd'],
    ['xrp', 'btc'],
    ['xrp', 'eth'],
    ['zcl', 'btc'],
    ['zec', 'usd'],
    ['zec', 'btc'],
    ['zec', 'eth'],
    ['zen', 'btc'],
];

export const Proxy = {
    _proxies: [
        'http://PQFyXM:SEMRnV@196.19.9.9:8000',
        'http://PQFyXM:SEMRnV@196.19.10.135:8000',
        undefined
    ],

    randomProxy: function() {
        const ind = Math.floor(Math.random() * (this._proxies.length));
        return this._proxies[ind];
    }
};

pairs.forEach((pair) => {
    const conf = {
        proxy: Proxy.randomProxy()
    };

    const bittrex = new BittrexService(conf);
    const hitbtc = new HitbtcService(conf);
    const cryptopia = new CryptopiaService(conf);

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

const saveOrders = (orders) => {
    const pair = orders.pairFrom + orders.pairTo;
    if (!OrderProvider.Orders[pair])
        OrderProvider.Orders[pair] = {};

    OrderProvider.Orders[pair].BID = orders.bids;
    OrderProvider.Orders[pair].ASK = orders.asks;
};
