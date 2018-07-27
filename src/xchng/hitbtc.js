/*
 * Author: Roman Kovjogin
 * Github: https://github.com/white-wolf-17
 * Copyright (c) 2017.
 */


import {utils} from '../utils';
import request from 'request';
import map from 'lodash/map';

export class HitbtcService {

    pairs = [
        'BCNBTC','BTCUSD','DASHBTC','DOGEBTC','DOGEUSD','DSHBTC','EMCBTC','ETHBTC'
        ,'FCNBTC','LSKBTC','LTCBTC','LTCUSD','NXTBTC','SBDBTC','SCBTC','STEEMBTC'
        ,'XDNBTC','XEMBTC','XMRBTC','ARDRBTC','ZECBTC','WAVESBTC','MAIDBTC','AMPBTC'
        ,'BUSBTC','DGDBTC','ICNBTC','SNGLSBTC','1STBTC','TRSTBTC','TIMEBTC','GNOBTC'
        ,'REPBTC','XMRUSD','DASHUSD','ETHUSD','NXTUSD','ZRCBTC','BOSBTC','DCTBTC'
        ,'ANTBTC','AEONBTC','GUPBTC','PLUBTC','LUNBTC','TAASBTC','NXCBTC','EDGBTC'
        ,'RLCBTC','SWTBTC','TKNBTC','WINGSBTC','XAURBTC','AEBTC','PTOYBTC','ZECUSD'
        ,'XEMUSD','BCNUSD','XDNUSD','MAIDUSD','ETCBTC','ETCUSD','CFIBTC','PLBTBTC'
        ,'BNTBTC','XDNCOBTC','FYNETH','SNMBTC','SNMETH','SNTETH','CVCUSD','PAYETH'
        ,'OAXETH','OMGETH','BQXETH','XTZBTC','DICEBTC','CFIETH','PTOYETH','1STETH'
        ,'XAURETH','TAASETH','TIMEETH','DICEETH','SWTETH','XMRETH','ETCETH','DASHETH'
        ,'ZECETH','PLUETH','GNOETH','XRPBTC','NETETH','STRATUSD','STRATBTC','SNCETH'
        ,'ADXETH','BETETH','EOSETH','DENTETH','SANETH','EOSBTC','EOSUSD','MNEBTC'
        ,'MSPETH','DDFETH','XTZETH','XTZUSD','UETETH','MYBETH','SURETH','IXTETH'
        ,'PLRETH','TIXETH','NDCETH','PROETH','AVTETH','COSSETH','EVXUSD','DLTBTC'
        ,'BNTETH','BNTUSD','QAUBTC','QAUETH','MANAUSD','DNTBTC','FYPBTC','OPTBTC'
        ,'TNTETH','IFTBTC','STXBTC','STXETH','STXUSD','TNTUSD','TNTBTC','CATBTC'
        ,'CATETH','CATUSD','BCHBTC','BCHETH','BCHUSD','ENGETH','XUCUSD','SNCBTC'
        ,'SNCUSD','OAXUSD','OAXBTC','BASETH','ZRXBTC','ZRXETH','ZRXUSD','RVTBTC'
        ,'ICOSBTC','ICOSETH','ICOSUSD','PPCBTC','PPCUSD','QTUMETH','VERIBTC','VERIETH'
        ,'VERIUSD','IGNISETH','PRGBTC','PRGETH','PRGUSD','BMCBTC','BMCETH','BMCUSD'
        ,'CNDBTC','CNDETH','CNDUSD','SKINBTC','EMGOBTC','EMGOUSD','CDTETH','CDTUSD'
        ,'FUNBTC','FUNETH','FUNUSD','HVNBTC','HVNETH','FUELBTC','FUELETH','FUELUSD'
        ,'POEBTC','POEETH','MCAPBTC','AIRBTC','AIRETH','AIRUSD','AMBUSD','AMBETH'
        ,'AMBBTC','NTOBTC','ICOBTC','PINGBTC','GAMEBTC','TKRETH','HPCBTC','PPTETH'
        ,'MTHBTC','MTHETH','WMGOBTC','WMGOUSD','LRCBTC','LRCETH','ICXBTC','ICXETH'
        ,'NEOBTC','NEOETH','NEOUSD','CSNOBTC','ORMEBTC','ICXUSD','PIXBTC','PIXETH'
        ,'INDETH','KICKBTC','YOYOWBTC','MIPSBTC','CDTBTC','XVGBTC','XVGETH','XVGUSD'
        ,'DGBBTC','DGBETH','DGBUSD','DCNBTC','DCNETH','DCNUSD','CCTETH','EBETETH'
        ,'VIBEBTC','VOISEBTC','ENJBTC','ENJETH','ENJUSD','ZSCBTC','ZSCETH','ZSCUSD'
        ,'ETBSBTC','TRXBTC','TRXETH','TRXUSD','VENBTC','VENETH','VENUSD','ARTBTC'
        ,'EVXBTC','EVXETH','QVTETH','EBTCOLDBTC','EBTCOLDETH','EBTCOLDUSD','BKBBTC','EXNBTC'
        ,'TGTBTC','ATSETH','BMTBTC','BMTETH','SUBBTC','SUBETH','SUBUSD','WTCBTC'
        ,'CNXBTC','ATBBTC','ATBETH','ATBUSD','ODNBTC','BTMBTC','BTMETH','BTMUSD'
        ,'B2XBTC','B2XETH','B2XUSD','ATMBTC','ATMETH','ATMUSD','LIFEBTC','VIBBTC'
        ,'VIBETH','VIBUSD','DRTETH','STUUSD','OMGBTC','PAYBTC','COSSBTC','PPTBTC'
        ,'SNTBTC','BTGBTC','BTGETH','BTGUSD','SMARTBTC','SMARTETH','SMARTUSD','XUCETH'
        ,'XUCBTC','CLBTC','CLETH','CLUSD','LAETH','CLDBTC','CLDETH','CLDUSD'
        ,'EDOBTC','EDOETH','EDOUSD','HGTETH','POLLBTC','IXTBTC','ATSBTC','SCLBTC'
        ,'ATLBTC','EBTCNEWBTC','EBTCNEWETH','EBTCNEWUSD','ETPBTC','ETPETH','ETPUSD','OTXBTC'
        ,'CDXETH','DRPUBTC','NEBLBTC','NEBLETH','HACBTC','CTXBTC','CTXETH','ELEBTC'
        ,'ARNBTC','ARNETH','SISABTC','SISAETH','STUBTC','STUETH','GVTETH','INDIBTC'
        ,'BTXBTC','LTCETH','BCNETH','MAIDETH','NXTETH','STRATETH','XDNETH','XEMETH'
        ,'PLRBTC','SURBTC','BQXBTC','DOGEETH','ITSBTC','AMMBTC','AMMETH','AMMUSD'
        ,'DBIXBTC','PREBTC','KBRBTC','TBTBTC','EROBTC','SMSBTC','SMSETH','SMSUSD'
        ,'ZAPBTC','DOVBTC','DOVETH','FRDBTC','DRPUETH','OTNBTC','XRPETH','XRPUSDT'
        ,'HSRBTC','LENDBTC','LENDETH','SPFBTC','SPFETH','SBTCBTC','SBTCETH','BTCABTC'
        ,'BTCAETH','BTCAUSD','WRCBTC','WRCETH','WRCUSD','LOCBTC','LOCETH','LOCUSD'
        ,'SWFTCBTC','SWFTCETH','SWFTCUSD','STARETH','SBTCUSDT','STORMBTC','DIMETH','DIMUSD'
        ,'DIMBTC','NGCBTC','NGCETH','NGCUSD','EMCETH','EMCUSDT','MCOBTC','MCOETH'
        ,'MCOUSD','MANAETH','MANABTC','ECHBTC','CPAYETH','DATABTC','DATAETH','DATAUSD'
        ,'UTTBTC','UTTETH','UTTUSD','KMDBTC','KMDETH','KMDUSD','QTUMUSD','QTUMBTC'
        ,'SNTUSD','OMGUSD','EKOBTC','EKOETH','ADXBTC','ADXUSD','LSKETH','LSKUSD'
        ,'PLRUSD','SURUSD','BQXUSD','DRTUSDT','REPETH','REPUSDT','TIOBTC','TIOETH'
        ,'TIOUSD','WAXBTC','WAXETH','WAXUSD','EETBTC','EETETH','EETUSD','C20BTC'
        ,'C20ETH','IDHBTC','IDHETH','IPLBTC','COVBTC','COVETH','SENTBTC','SENTETH'
        ,'SENTUSD','SMTBTC','SMTETH','SMTUSD','CVHETH','CVHUSD','CASBTC','CASETH'
        ,'CASUSD','CHATBTC','CHATETH','CHATUSD','GRMDBTC','AVHBTC','TRACETH','JNTETH'
        ,'PCLBTC','PCLETH','CLOUTBTC','UTKBTC','UTKETH','UTKUSD','GNXETH','CHSBBTC'
        ,'CHSBETH','AVHETH','DAYBTC','DAYETH','DAYUSD','NEUBTC','NEUETH','NEUUSD'
        ,'AVHUSDT','CLOUTETH','CLOUTUSDT','TAUBTC','MEKBTC','FLPBTC','FLPETH','FLPUSD'
        ,'RBTC','RETH','EKOUSDT','BCPTETH','BCPTUSDT','PKTBTC','PKTETH','WLKBTC'
        ,'WLKETH','WLKUSD','EVNBTC','CPGBTC','CPGETH','BPTNBTC','BPTNETH','BPTNUSD'
        ,'BETRBTC','BETRETH','ARCTBTC','ARCTUSD','DBETBTC','DBETETH','DBETUSD','RNTBETH'
        ,'HANDETH','HANDUSD','BEZBTC','BEZETH','BEZUSD','ACOETH','CTEBTC','CTEETH'
        ,'CTEUSD','UTNPBTC','UTNPETH','UTNPUSD','CPYBTC','CPYETH','CHPETH','BCPTBTC'
        ,'ACTBTC','ACTETH','ACTUSD','HIREETH','ADABTC','ADAETH','ADAUSD','SIGBTC'
        ,'RPMBTC','RPMETH','MTXBTC','MTXETH','MTXUSD','BGGBTC','BGGETH','BGGUSD'
        ,'SETHETH','WIZBTC','WIZETH','WIZUSD','DADIBTC','DADIETH','BDGETH','DATXBTC'
        ,'DATXETH','TRUEBTC','DRGBTC','DRGETH','BANCABTC','BANCAETH','ZAPETH','ZAPUSD'
        ,'AUTOBTC','NOAHBTC','SOCBTC','WILDBTC','INSURBTC','INSURETH','OCNBTC','OCNETH'
        ,'STQBTC','STQETH','XLMBTC','XLMETH','XLMUSD','IOTABTC','IOTAETH','IOTAUSD'
        ,'DRTBTC','MLDBTC','MLDETH','MLDUSD','BETRUSD','CGCETH','ERTBTC','CRPTBTC'
        ,'CRPTUSD','MESHBTC','MESHETH','MESHUSD','HLWETH','IHTBTC','IHTETH','IHTUSD'
        ,'SCCBTC','YCCBTC','DANBTC','TELBTC','TELETH','BUBOBTC','BUBOETH','BUBOUSD'
        ,'VITBTC','VITETH','VITUSD','NCTBTC','NCTETH','NCTUSD','AXPBTC','AXPETH'
        ,'BMHBTC','BANCAUSD','NOAHETH','NOAHUSD','HQXBTC','LDCBTC','XMOBTC','XMOUSD'
        ,'XMOETH','BERRYBTC','BERRYETH','BERRYUSD','BSTNBTC','BSTNETH','BSTNUSD','GBXBTC'
        ,'GBXETH','GBXUSD','SHIPBTC','SHIPETH','NANOBTC','NANOETH','NANOUSD','LNCBTC'
        ,'UNCBTC','UNCETH','RPXBTC','RPXETH','RPXUSD','KINETH','ARDRUSD','DAXTBTC'
        ,'DAXTETH','FOTAETH','FOTABTC','SETHBTC','CVTBTC','CVTETH','CVTUSD','STQUSD'
        ,'GNTBTC','GNTETH','GNTUSD','ADHBTC','ADHETH','BBCBTC','BBCETH','GETBTC'
        ,'MITHBTC','MITHETH','MITHUSD','SUNCETH','DADIUSD','TKYBTC','ACATBTC','ACATETH'
        ,'ACATUSD','BTXUSD','TCNBTC','VIOETH','WIKIBTC','WIKIETH','WIKIUSD','ONTBTC'
        ,'ONTETH','ONTUSD','FTXBTC','FTXETH','FRECBTC','NAVIBTC','FRECETH','FRECUSDT'
        ,'VMEETH','NAVIETH','BTCPBTC','LNDETH','CSMBTC','NANJBTC','MTCBTC','MTCETH'
        ,'MTCUSD','NTKBTC','NTKETH','NTKUSD','AUCBTC','AUCETH','CMCTBTC','CMCTETH'
        ,'CMCTUSD','MANBTC','MANETH','MANUSD','HIREBTC','TKABTC','TKAETH','TKAUSD'
        ,'PNTBTC','PNTETH','FXTBTC','NEXOBTC','CHXBTC','CHXETH','CHXUSD','PATBTC'
        ,'PATETH','XMCBTC','EJOYBTC','EJOYETH','EJOYUSD','FXTETH','HEROBTC','HEROETH'
        ,'XMCETH','XMCUSDT','STAKBTC','STAKETH','FDZBTC','FDZETH','FDZUSD','SPDBTC'
        ,'SPDETH','LUCBTC','MITXBTC','TIVBTC','B2GBTC','B2GUSD','ZPTBTC','ZPTETH'
        ,'HBZBTC','FACEBTC','FACEETH','HBZETH','HBZUSD','ZPTUSD','MORPHBTC','MORPHETH'
        ,'MORPHUSD','EBKCBTC','CPTBTC','PATUSD','HTMLBTC','HTMLETH','MITXETH','JOTBTC'
        ,'JBCBTC','JBCETH','BTSBTC','BNKBTC','KBCBTC','KBCETH','BNKETH','BNKUSD'
        ,'TIVETH','TIVUSD','LUCETH','LUCUSD','CSMETH','CSMUSD','INKBTC','IOSTBTC'
        ,'INKETH','INKUSD','CBCBTC','IOSTUSD','COINBTC','ZILBTC','COINUSD','COINETH'
        ,'PMNTBTC','ABYSSBTC','ABYSSETH','ZILUSD','BCIBTC','CBCETH','CBCUSD','PITCHBTC'
        ,'PITCHETH','HTMLUSD','TDSBTC','TDSETH','TDSUSD','SBDETH','SBDUSD','DPNBTC'
        ,'UUUBTC','UUUETH','XBPBTC','CLNBTC','IVYBTC','IVYETH','TTUBTC','TTUETH'
        ,'TTUUSD','CLNETH','DORBTC','DORETH','DORUSD','ELECBTC','ELECETH','ELECUSD'
        ,'QNTUBTC','QNTUETH','QNTUUSD','IPLETH','IPLUSD','CENNZBTC','BTCPETH','BTCPUSD'
        ,'CENNZETH','SWMBTC','MXMBTC','MXMETH','SPFUSD','KRMUSD','LCCBTC','HGTBTC'
    ];
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
            this.arPair = arPair.slice();
        } else if (pairs.indexOf(varTwo) + 1) {
            this.isInvert = true;
            this.pair = varTwo;
            this.arPair = arPair.reverse().slice();
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
                    'Authorization': 'Basic ' + Buffer.from(`${this.config.apiKey}:${this.config.apiSecret}`).toString('base64'),
                    'Connection': 'Keep-Alive'
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
                    reject(error);
                }
                else {
                    const error = {
                        success: false,
                        errorMsg: (body['error']) ? body['error']['message'] : response.statusMessage,
                        errorCode: (body['error']) ? body['error']['code'] : response.statusCode,
                        exchange: this.name
                    };

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
                const lens = (x) => {return {rate: parseFloat(x['price']), amount: parseFloat(x['size']), name: this.name}};
                const bids = response['bid'].map(lens);
                const asks = response['ask'].map(lens);
                resolve({
                    name: this.name,
                    bids: bids, asks: asks,
                    pairFrom: this.arPair[0].toUpperCase(), pairTo: this.arPair[1].toUpperCase()
                });
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

    orderCreate(order) {
        if (order.arPair)
            this.setPair(order.arPair);
        const pair = this.pair;
        if (!pair) throw Error('Pair not set!');
        const type = (order.type.toUpperCase() === 'SELL' || order.type.toUpperCase() === 'BID') ? 'sell' : 'buy';
        return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             console.log(`HitBTC order:
    // type: ${type} : ${typeof type}
    // pair: ${pair} : ${typeof pair}
    // amount: ${order.amount} : ${typeof order.amount}
    // rate: ${order.rate} : ${typeof order.rate}`);
    //             resolve(Object.assign(order, {order_id: ~~(Math.random() * 1000000)}));
    //         }, Math.random() * 2000);
            //TODO UNCOMMENT
            //TODO ERROR RESOLVING
            this.post('order', {symbol: pair, quantity: order.amount.toString(), price: order.rate.toString(), side: type, type: 'limit'})
                .then(
                    res => {
                        resolve(Object.assign(order, {order_id: res['data']['clientOrderId']}));
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