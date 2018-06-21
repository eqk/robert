/*
 * Author: Roman Kovjogin
 * Github: https://github.com/white-wolf-17
 * Copyright (c) 2017.
 */


import {utils} from '../utils';
import request from 'request';
import map from 'lodash/map';

export class HitbtcService {

    pairs = ['BCNBTC', 'BTCUSD', 'DASHBTC', 'DOGEBTC', 'DOGEUSD', 'DSHBTC', 'EMCBTC', 'ETHBTC', 'FCNBTC', 'LSKBTC', 'LTCBTC', 'LTCUSD', 'NXTBTC', 'QCNBTC', 'SBDBTC', 'SCBTC', 'STEEMBTC', 'XDNBTC', 'XEMBTC', 'XMRBTC', 'ARDRBTC', 'ZECBTC', 'WAVESBTC', 'MAIDBTC', 'AMPBTC', 'BUSBTC', 'DGDBTC', 'ICNBTC', 'SNGLSBTC', '1STBTC', 'XLCBTC', 'TRSTBTC', 'TIMEBTC', 'GNOBTC', 'REPBTC', 'XMRUSD', 'DASHUSD', 'ETHUSD', 'NXTUSD', 'ZRCBTC', 'BOSBTC', 'DCTBTC', 'ANTBTC', 'AEONBTC', 'GUPBTC', 'PLUBTC', 'LUNBTC', 'TAASBTC', 'NXCBTC', 'EDGBTC', 'RLCBTC', 'SWTBTC', 'TKNBTC', 'WINGSBTC', 'XAURBTC', 'AEBTC', 'PTOYBTC', 'WTTBTC', 'ZECUSD', 'XEMUSD', 'BCNUSD', 'XDNUSD', 'MAIDUSD', 'ETCBTC', 'ETCUSD', 'CFIBTC', 'PLBTBTC', 'BNTBTC', 'XDNCOBTC', 'FYNETH', 'SNMETH', 'SNTETH', 'CVCUSD', 'PAYETH', 'OAXETH', 'OMGETH', 'BQXETH', 'XTZBTC', 'CRSUSD', 'DICEBTC', 'CFIETH', 'PTOYETH', '1STETH', 'XAURETH', 'TAASETH', 'TIMEETH', 'DICEETH', 'SWTETH', 'XMRETH', 'ETCETH', 'DASHETH', 'ZECETH', 'PLUETH', 'GNOETH', 'XRPBTC', 'NETETH', 'STRATUSD', 'STRATBTC', 'SNCETH', 'ADXETH', 'BETETH', 'EOSETH', 'DENTETH', 'SANETH', 'EOSBTC', 'EOSUSD', 'MNEBTC', 'MRVETH', 'MSPETH', 'DDFETH', 'XTZETH', 'XTZUSD', 'UETETH', 'MYBETH', 'SURETH', 'IXTETH', 'HRBETH', 'PLRETH', 'TIXETH', 'NDCETH', 'PROETH', 'AVTETH', 'COSSETH', 'PBKXETH', 'PQTUSD', '8BTUSD', 'EVXUSD', 'IMLETH', 'ROOTSETH', 'DLTBTC', 'BNTETH', 'BNTUSD', 'QAUBTC', 'QAUETH', 'MANAUSD', 'DNTBTC', 'FYPBTC', 'OPTBTC', 'GRPHBTC', 'TNTETH', 'STXBTC', 'STXETH', 'STXUSD', 'TNTUSD', 'TNTBTC', 'CATBTC', 'CATETH', 'CATUSD', 'BCHBTC', 'BCHETH', 'BCHUSD', 'ECATETH', 'XUCUSD', 'SNCBTC', 'SNCUSD', 'OAXUSD', 'OAXBTC', 'BASETH', 'ZRXBTC', 'ZRXETH', 'ZRXUSD', 'RVTBTC', 'ICOSBTC', 'ICOSETH', 'ICOSUSD', 'PPCBTC', 'PPCUSD', 'QTUMETH', 'VERIBTC', 'VERIETH', 'VERIUSD', 'IGNISETH', 'PRGBTC', 'PRGETH', 'PRGUSD', 'BMCBTC', 'BMCETH', 'BMCUSD', 'CNDBTC', 'CNDETH', 'CNDUSD', 'SKINBTC', 'EMGOBTC', 'EMGOUSD', 'CDTETH', 'CDTUSD', 'FUNBTC', 'FUNETH', 'FUNUSD', 'HVNBTC', 'HVNETH', 'FUELBTC', 'FUELETH', 'FUELUSD', 'POEBTC', 'POEETH', 'MCAPBTC', 'AIRBTC', 'AIRETH', 'AIRUSD', 'AMBUSD', 'AMBETH', 'AMBBTC', 'NTOBTC', 'ICOBTC', 'PINGBTC', 'RKCETH', 'GAMEBTC', 'TKRETH', 'HPCBTC', 'PPTETH', 'MTHBTC', 'MTHETH', 'WMGOBTC', 'WMGOUSD', 'LRCBTC', 'LRCETH', 'ICXBTC', 'ICXETH', 'NEOBTC', 'NEOETH', 'NEOUSD', 'CSNOBTC', 'ORMEBTC', 'ICXUSD', 'PIXBTC', 'PIXETH', 'INDETH', 'KICKBTC', 'YOYOWBTC', 'MIPSBTC', 'CDTBTC', 'XVGBTC', 'XVGETH', 'XVGUSD', 'DGBBTC', 'DGBETH', 'DGBUSD', 'DCNBTC', 'DCNETH', 'DCNUSD', 'LATBTC', 'CCTETH', 'EBETETH', 'VIBEBTC', 'VOISEBTC', 'ENJBTC', 'ENJETH', 'ENJUSD', 'ZSCBTC', 'ZSCETH', 'ZSCUSD', 'ETBSBTC', 'TRXBTC', 'TRXETH', 'TRXUSD', 'VENBTC', 'VENETH', 'VENUSD', 'ARTBTC', 'EVXBTC', 'EVXETH', 'QVTETH', 'EBTCOLDBTC', 'EBTCOLDETH', 'EBTCOLDUSD', 'BKBBTC', 'EXNBTC', 'TGTBTC', 'ATSETH', 'UGTBTC', 'UGTETH', 'UGTUSD', 'CTRBTC', 'CTRETH', 'CTRUSD', 'BMTBTC', 'BMTETH', 'SUBBTC', 'SUBETH', 'SUBUSD', 'WTCBTC', 'CNXBTC', 'ATBBTC', 'ATBETH', 'ATBUSD', 'ODNBTC', 'BTMBTC', 'BTMETH', 'BTMUSD', 'B2XBTC', 'B2XETH', 'B2XUSD', 'ATMBTC', 'ATMETH', 'ATMUSD', 'LIFEBTC', 'VIBBTC', 'VIBETH', 'VIBUSD', 'DRTETH', 'STUUSD', 'HDGETH', 'OMGBTC', 'PAYBTC', 'COSSBTC', 'PPTBTC', 'SNTBTC', 'BTGBTC', 'BTGETH', 'BTGUSD', 'SMARTBTC', 'SMARTETH', 'SMARTUSD', 'XUCETH', 'XUCBTC', 'CLBTC', 'CLETH', 'CLUSD', 'LAETH', 'CLDBTC', 'CLDETH', 'CLDUSD', 'ELMBTC', 'EDOBTC', 'EDOETH', 'EDOUSD', 'HGTETH', 'POLLBTC', 'IXTBTC', 'PREBTC', 'ATSBTC', 'SCLBTC', 'BCCBTC', 'BCCETH', 'BCCUSD', 'ATLBTC', 'EBTCNEWBTC', 'EBTCNEWETH', 'EBTCNEWUSD', 'ETPBTC', 'ETPETH', 'ETPUSD', 'OTXBTC', 'CDXETH', 'DRPUBTC', 'NEBLBTC', 'NEBLETH', 'HACBTC', 'CTXBTC', 'CTXETH', 'ELEBTC', 'ARNBTC', 'ARNETH', 'SISABTC', 'SISAETH', 'STUBTC', 'STUETH', 'GVTETH', 'BTXBTC', 'BTXUSDT', 'LTCETH', 'BCNETH', 'MAIDETH', 'NXTETH', 'STRATETH', 'XDNETH', 'XEMETH', 'PLRBTC', 'SURBTC', 'BQXBTC', 'DOGEETH', 'ITSBTC', 'PRSBTC', 'KBRBTC', 'TBTBTC', 'EROBTC', 'SMSBTC', 'SMSETH', 'SMSUSD', 'ZAPBTC', 'FRDBTC', 'OTNBTC', 'CAPPUSDT', 'CAPPBTC', 'CAPPETH', 'DBIXBTC', 'XRPETH', 'XRPUSDT', 'HSRBTC', 'INDIBTC'];

    arPair = [];
    pair = '';
    isInvert = false;

    constructor(opt = {}) {

        this.name = 'HitBTC';
        this.config = {};
        this.config.apiKey = (opt.apiKey) ? opt.apiKey : '';
        this.config.apiSecret = (opt.apiSecret) ? opt.apiSecret : '';
        this.config.url = (opt.url) ? opt.url : 'https://api.hitbtc.com/api';
        this.config.version = (opt.version) ? opt.version : '2';
        this.config.proxy = (opt.proxy) ? opt.proxy : '';
    }

    isAvailable(arPair) {
        const pairs = this.pairs;
        const varOne = `${arPair[0]}${arPair[1]}`.toUpperCase();
        const varTwo = `${arPair[1]}${arPair[0]}`.toUpperCase();
        return (((pairs.indexOf(varOne) + 1) || (pairs.indexOf(varTwo) + 1)) > 0);
    }

    setPair(arPair = ['btc', 'usd']) {
        const pairs = this.pairs;
        const varOne = `${arPair[0]}${arPair[1]}`.toUpperCase();
        const varTwo = `${arPair[1]}${arPair[0]}`.toUpperCase();
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

            data['apikey'] = this.config.apiKey;
            data['nonce'] = Date.now();

            const url_params = utils.paramsToUrl(data);
            let url = `${this.config.url}/${this.config.version}/${path}`;

            url = (method === 'GET') ? `${url}?${url_params}` : url;

            let options = {
                method: method,
                url: url,
                body: data,
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${this.config.apiKey}:${this.config.apiSecret}`).toString('base64')
                },
                json: true
            };

            if (this.config.proxy) {
                options['proxy'] = this.config.proxy;
            }

            request(options, (err, response, body) => {
                if (response && parseInt(response.statusCode) === 200) {
                    resolve({
                        success: true,
                        data: body,
                        exchange: this.name
                    });
                }
                else if (!response) {
                    const error = {
                        success: false,
                        errorMsg: err.message,
                        errorCode: err.code,
                        exchange: this.name
                    };

                    console.error(error);
                    reject(error);
                }
                else {
                    const error = {
                        success: false,
                        errorMsg: (body['error']) ? body['error']['message'] : response.statusMessage,
                        errorCode: (body['error']) ? body['error']['code'] : response.statusCode,
                        exchange: this.name
                    };

                    console.error(error);
                    reject(error);
                }
            });
        });
    }

    get(path = '', data = {}) {
        return this.request('GET', path, data);
    }

    post(path = '', data = {}) {
        return this.request('POST', path, data);
    }

    maxbid_minask() {
        const pair = this.pair;
        if (!pair) throw Error('Pair not set!');
        const url = `public/ticker/${pair}`;
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(null), 30000);
            this.get(url).then(res => {
                const data = {
                    maxBid: res['data']['bid'],
                    minAsk: res['data']['ask'],
                    stok: this
                };

                resolve(data);
            }, err => {
                console.error(err);
                resolve(null);
            })
                .catch(reject);
        });
    }

    getOrders(limit = 50) {
        return new Promise((resolve, reject) => {
            const pair = this.pair;
            if (!pair) throw Error('Pair not set!');
            this.get(`public/orderbook/${pair}`, {limit: limit}).then(res => {
                const response = res['data'];
                const bids = response['ask'].map(i => [i['price'], i['size'], this.name]);
                const asks = response['bid'].map(i => [i['price'], i['size'], this.name]);
                resolve({bids: bids, asks: asks});
            }, err => {
                reject(err);
            })
                .catch(reject);
        });
    }

    getOrder(clientOrderId) {
        return this.get(`order/${clientOrderId}`)
            .then((res) => {
                if (res.success === true) {
                    return res.data;
                } else {
                    return false;
                }
            });
    }

    isCancel(id) {
        return new Promise((resolve) => {
            this.getOrder(id).then(
                () => resolve(false),
                () => resolve(true));
        });
    }

    userOpenOrders() {
        const pair = this.pair;
        if (!pair) throw Error('Pair not set!');
        return new Promise((resolve, reject) => {
            this.get(`order`, {symbol: pair}).then(res => {
                resolve(res['data']);
            }, err => {
                reject(err);
            });
        });

    }

    balance() {
        return new Promise((resolve, reject) => {
            this.get('trading/balance')
                .then(res => {
                    const array = map(res['data'], (item) => {
                        return {currency: item['currency'].toLowerCase(), value: item['available']};
                    });

                    resolve(array);
                })
                .catch(reject);
        });
    }

    orderCreate(quantity, price, type) {
        const pair = this.pair;
        if (!pair) throw Error('Pair not set!');
        return new Promise((resolve, reject) => {
            this.post('order', {symbol: pair, quantity: quantity, price: price, side: type, type: 'limit'})
                .then(
                    res => {
                        resolve({order_id: res['data']['clientOrderId']});
                    },
                    err => {
                        reject(err);
                    })
                .catch(reject);
        });
    }

    orderCancel(order_id) {
        return this.request('DELETE', `order/${order_id}`);
    }

    tradeHistory(limit = 50, opt = {}) {
        return new Promise((resolve) => {
            if (opt.timeout) {
                setTimeout(() => resolve(null), opt.timeout);
            }
            this.get(`public/trades/${this.pair}`, {limit: 500}).then(res => {
                let response = res.data;
                response = response.map(item => {
                    const date = new Date(item['timestamp']);
                    return {
                        price: item.price,
                        amount: item.quantity,
                        type: item.side,
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