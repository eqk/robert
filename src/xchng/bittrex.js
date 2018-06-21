/*
 * Author: Roman Kovjogin
 * Github: https://github.com/white-wolf-17
 * Copyright (c) 2017.
 */


import {utils} from '../utils';
import request from 'request';
import CryptoJS from 'crypto-js';
import map from 'lodash/map';

export class BittrexService {

    pairs = [   'BTC-LTC', 'BTC-DOGE', 'BTC-VTC', 'BTC-PPC', 'BTC-FTC', 'BTC-RDD',
                'BTC-NXT', 'BTC-DASH', 'BTC-POT', 'BTC-BLK', 'BTC-EMC2', 'BTC-XMY',
                'BTC-AUR', 'BTC-EFL', 'BTC-GLD', 'BTC-SLR', 'BTC-PTC', 'BTC-GRS',
                'BTC-NLG', 'BTC-RBY', 'BTC-XWC', 'BTC-MONA', 'BTC-THC', 'BTC-ENRG',
                'BTC-ERC', 'BTC-VRC', 'BTC-CURE', 'BTC-XMR', 'BTC-CLOAK', 'BTC-START',
                'BTC-KORE', 'BTC-XDN', 'BTC-TRUST', 'BTC-NAV', 'BTC-XST', 'BTC-BTCD',
                'BTC-VIA', 'BTC-PINK', 'BTC-IOC', 'BTC-CANN', 'BTC-SYS', 'BTC-NEOS',
                'BTC-DGB', 'BTC-BURST', 'BTC-EXCL', 'BTC-SWIFT', 'BTC-DOPE', 'BTC-BLOCK',
                'BTC-ABY', 'BTC-BYC', 'BTC-XMG', 'BTC-BLITZ', 'BTC-BAY', 'BTC-FAIR',
                'BTC-SPR', 'BTC-VTR', 'BTC-XRP', 'BTC-GAME', 'BTC-COVAL', 'BTC-NXS',
                'BTC-XCP', 'BTC-BITB', 'BTC-GEO', 'BTC-FLDC', 'BTC-GRC', 'BTC-FLO',
                'BTC-NBT', 'BTC-MUE', 'BTC-XEM', 'BTC-CLAM', 'BTC-DMD', 'BTC-GAM',
                'BTC-SPHR', 'BTC-OK', 'BTC-SNRG', 'BTC-PKB', 'BTC-CPC', 'BTC-AEON',
                'BTC-ETH', 'BTC-GCR', 'BTC-TX', 'BTC-BCY', 'BTC-EXP', 'BTC-INFX',
                'BTC-OMNI', 'BTC-AMP', 'BTC-AGRS', 'BTC-XLM', 'USDT-BTC', 'BTC-CLUB',
                'BTC-VOX', 'BTC-EMC', 'BTC-FCT', 'BTC-MAID', 'BTC-EGC', 'BTC-SLS',
                'BTC-RADS', 'BTC-DCR', 'BTC-SAFEX', 'BTC-BSD', 'BTC-XVG', 'BTC-PIVX',
                'BTC-XVC', 'BTC-MEME', 'BTC-STEEM', 'BTC-2GIVE', 'BTC-LSK', 'BTC-PDC',
                'BTC-BRK', 'BTC-DGD', 'ETH-DGD', 'BTC-WAVES', 'BTC-RISE', 'BTC-LBC',
                'BTC-SBD', 'BTC-BRX', 'BTC-ETC', 'ETH-ETC', 'BTC-STRAT', 'BTC-UNB',
                'BTC-SYNX', 'BTC-TRIG', 'BTC-EBST', 'BTC-VRM', 'BTC-SEQ', 'BTC-XAUR',
                'BTC-SNGLS', 'BTC-REP', 'BTC-SHIFT', 'BTC-ARDR', 'BTC-XZC', 'BTC-NEO',
                'BTC-ZEC', 'BTC-ZCL', 'BTC-IOP', 'BTC-GOLOS', 'BTC-UBQ', 'BTC-KMD',
                'BTC-GBG', 'BTC-SIB', 'BTC-ION', 'BTC-LMC', 'BTC-QWARK', 'BTC-CRW',
                'BTC-SWT', 'BTC-TIME', 'BTC-MLN', 'BTC-ARK', 'BTC-DYN', 'BTC-TKS',
                'BTC-MUSIC', 'BTC-DTB', 'BTC-INCNT', 'BTC-GBYTE', 'BTC-GNT', 'BTC-NXC',
                'BTC-EDG', 'BTC-LGD', 'BTC-TRST', 'ETH-GNT', 'ETH-REP', 'USDT-ETH',
                'ETH-WINGS', 'BTC-WINGS', 'BTC-RLC', 'BTC-GNO', 'BTC-GUP', 'BTC-LUN',
                'ETH-GUP', 'ETH-RLC', 'ETH-LUN', 'ETH-SNGLS', 'ETH-GNO', 'BTC-APX',
                'BTC-TKN', 'ETH-TKN', 'BTC-HMQ', 'ETH-HMQ', 'BTC-ANT', 'ETH-TRST',
                'ETH-ANT', 'BTC-SC', 'ETH-BAT', 'BTC-BAT', 'BTC-ZEN', 'BTC-1ST',
                'BTC-QRL', 'ETH-1ST', 'ETH-QRL', 'BTC-CRB', 'ETH-CRB', 'ETH-LGD',
                'BTC-PTOY', 'ETH-PTOY', 'BTC-MYST', 'ETH-MYST', 'BTC-CFI', 'ETH-CFI',
                'BTC-BNT', 'ETH-BNT', 'BTC-NMR', 'ETH-NMR', 'ETH-TIME', 'ETH-LTC',
                'ETH-XRP', 'BTC-SNT', 'ETH-SNT', 'BTC-DCT', 'BTC-XEL', 'BTC-MCO',
                'ETH-MCO', 'BTC-ADT', 'ETH-ADT', 'BTC-FUN', 'ETH-FUN', 'BTC-PAY',
                'ETH-PAY', 'BTC-MTL', 'ETH-MTL', 'BTC-STORJ', 'ETH-STORJ', 'BTC-ADX',
                'ETH-ADX', 'ETH-DASH', 'ETH-SC', 'ETH-ZEC', 'USDT-ZEC', 'USDT-LTC',
                'USDT-ETC', 'USDT-XRP', 'BTC-OMG', 'ETH-OMG', 'BTC-CVC', 'ETH-CVC',
                'BTC-PART', 'BTC-QTUM', 'ETH-QTUM', 'ETH-XMR', 'ETH-XEM', 'ETH-XLM',
                'ETH-NEO', 'USDT-XMR', 'USDT-DASH', 'ETH-BCC', 'USDT-BCC', 'BTC-BCC',
                'BTC-DNT', 'ETH-DNT', 'USDT-NEO', 'ETH-WAVES', 'ETH-STRAT', 'ETH-DGB',
                'ETH-FCT', 'USDT-OMG', 'BTC-ADA', 'BTC-MANA', 'ETH-MANA', 'BTC-SALT',
                'ETH-SALT', 'BTC-TIX', 'ETH-TIX', 'BTC-RCN', 'ETH-RCN', 'BTC-VIB',
                'ETH-VIB', 'BTC-MER', 'BTC-POWR', 'ETH-POWR', 'BTC-BTG', 'ETH-BTG',
                'USDT-BTG', 'ETH-ADA', 'BTC-ENG', 'ETH-ENG'
    ];

    arPair = [];
    pair = '';
    isInvert = false;

    constructor(opt = {}) {

        this.name = 'Bittrex';
        this.config = {};
        this.config.apiKey = (opt.apiKey) ? opt.apiKey : '';
        this.config.apiSecret = (opt.apiSecret) ? opt.apiSecret : '';
        this.config.url = (opt.url) ? opt.url : 'https://bittrex.com/api';
        this.config.version = (opt.version) ? opt.version : 'v1.1';
        this.config.proxy = (opt.proxy) ? opt.proxy : '';
    }

    modifyPair(arPair) {
        arPair[0] = (arPair[0].toUpperCase() === 'USD') ? 'USDT' : arPair[0].toUpperCase();
        arPair[1] = (arPair[1].toUpperCase() === 'USD') ? 'USDT' : arPair[1].toUpperCase();

        arPair[0] = (arPair[0].toUpperCase() === 'BCH') ? 'BCC' : arPair[0].toUpperCase();
        arPair[1] = (arPair[1].toUpperCase() === 'BCH') ? 'BCC' : arPair[1].toUpperCase();
        return arPair;
    }

    isAvailable(arPair) {
        arPair = this.modifyPair(arPair);
        const pairs = this.pairs;
        const varOne = `${arPair[0]}-${arPair[1]}`.toUpperCase();
        const varTwo = `${arPair[1]}-${arPair[0]}`.toUpperCase();
        return (((pairs.indexOf(varOne) + 1) || (pairs.indexOf(varTwo) + 1)) > 0);
    }

    setPair(arPair = ['btc', 'usd']) {
        arPair = this.modifyPair(arPair);
        const pairs = this.pairs;
        const varOne = `${arPair[0]}-${arPair[1]}`.toUpperCase();
        const varTwo = `${arPair[1]}-${arPair[0]}`.toUpperCase();
        if (pairs.indexOf(varOne) + 1) {
            this.pair = varOne;
            this.arPair = arPair;
        } else if (pairs.indexOf(varTwo) + 1) {
            this.isInvert = true;
            this.pair = varTwo;
            this.arPair = arPair.reverse();
        } else {
            this.pair = '';
        }
    }

    request(method = 'POST', path = '', data = {}) {
        return new Promise((resolve, reject) => {
            if (!data['apikey']) {
                data['apikey'] = this.config.apiKey;
            }
            if (!data['nonce']) {
                data['nonce'] = Date.now() * 1000;
            }

            const url_params = utils.paramsToUrl(data);
            let url = `${this.config.url}/${this.config.version}/${path}`;

            url = (method === 'GET') ? `${url}?${url_params}` : url;

            let options = {
                method: method,
                url: url,
                headers: {
                    apisign: CryptoJS.HmacSHA512(url, this.config.apiSecret).toString(CryptoJS.enc.hex)
                },
                json: true
            };

            if (this.config.proxy) {
                options['proxy'] = this.config.proxy;
            }

            request(options, (err, response, body) => {
                if (response && parseInt(response.statusCode) === 200) {
                    if (body['success']) {
                        resolve({success: true, data: body['result']});
                    }
                    if (!body['success']) {
                        reject({success: false, errorMsg: body['message'], errorCode: 500});
                    }
                }
                else {
                    const error = {
                        success: false,
                        errorMsg: (response) ? response.statusMessage : err.message,
                        errorCode: (response) ? response.statusCode : ''
                    };

                    reject(error);
                }
            });
        });
    }

    get(path = '', data = {}) {
        return this.request('GET', path, data);
    }

    maxbid_minask() {
        const pair = this.pair;
        const url = `public/getticker`;
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(null), 30000);
            this.get(url, {market: pair}).then(res => {

                const data = {
                    maxBid: res['data']['Bid'],
                    minAsk: res['data']['Ask'],
                    stok: this
                };

                resolve(data);
            }, err => {
                console.error(err);
                resolve(null);
            });
        });
    }

    getOrders(limit = 50, opt = {}) {
        return new Promise((resolve, reject) => {
            if (opt.timeout) {
                setTimeout(() => resolve(null), opt.timeout);
            }
            const pair = this.pair;
            this.get('public/getorderbook', {market: pair, type: 'both', limit: limit}).then(res => {
                const response = res['data'];

                response['buy'] = response['buy'].splice(0, limit);
                response['sell'] = response['sell'].splice(0, limit);

                const bids = response['buy'].map(i => [i['Rate'], i['Quantity'], this.name]);
                const asks = response['sell'].map(i => [i['Rate'], i['Quantity'], this.name]);
                resolve({bids: bids, asks: asks});
            }, err => {
                reject(err);
            });
        });
    }

    balance() {
        return new Promise((resolve, reject) => {

            this.get('account/getbalances')
                .then(res => {
                const array = map(res['data'], (item) => {
                    return {currency: item['Currency'].toLowerCase(), value: item['Available']};
                });

                resolve(array);
            })
                .catch(reject);

        });
    }

    orderCreate(amount, price, type) {
        return new Promise((resolve, reject) => {
            const pair = this.pair;
            const type_url = (type === 'sell') ? 'selllimit' : 'buylimit';

            this.get(`market/${type_url}`, {market: pair, quantity: amount, rate: price}).then(
                res => {
                    resolve({order_id: res['data']['uuid']});
                }, err => reject(err));
        });
    }

    isCancel(order_id) {
        return new Promise(resolve => {
            this.userOpenOrders().then(res => {
                const result = (!res['data'].find(order => order['OrderUuid'] === order_id));
                resolve(result);
            }, err => resolve(false));
        });
    }

    orderCancel(order_id) {
        return this.get('market/cancel', {uuid: order_id});
    }

    userOpenOrders() {

        return new Promise((resolve, reject) => {
            this.get('market/getopenorders', {market: this.pair}).then(res => {
                res['data'] = res['data'].map(item => {
                    item['order_id'] = item['OrderUuid'];
                    item['created_at'] = new Date(item['Opened']).getTime();
                    item['created_human'] = new Date(item['Opened']);
                    return item;
                });
                resolve(res);

            }, err => reject(err));
        });
    }

    getOrder(id) {
        return this.get('account/getorder', {uuid: id});
    }

    tradeHistory(limit = 50, opt = {}) {
        return new Promise((resolve) => {
            if (opt.timeout) {
                setTimeout(() => resolve(null), opt.timeout);
            }
            const pair = this.pair;
            this.get('public/getmarkethistory', {market: pair}).then(res => {
                let response = res.data;
                response = response.map(item => {
                    const date = new Date(item['TimeStamp']);
                    return {
                        price: item['Price'],
                        amount: item['Quantity'],
                        type: item['OrderType'].toLowerCase(),
                        date: new Date(date.getTime() + (3 * 60 * 60 * 1000)),
                        exchange: this.name
                    };
                });

                let sell = response.filter(item => item.type === 'sell').splice(0, limit);
                let buy = response.filter(item => item.type === 'buy').splice(0, limit);

                resolve({sell: sell, buy: buy});

            }, () => {
                resolve(null);
            });
        });
    }

}