import {SaveOrder} from './src/orderManager';
import {BittrexService} from './src/xchng/bittrex';
import {OrderProvider} from './src/orderFiller';

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

const c1_order = {
    Type: 'ASK',
    Amount: 0.5,
    Rate: 6420,
    PairFrom: 'BTC',
    PairTo: 'USD',
    'Updated': 'KEK',
    'RateOpen': '0.00012',
    'AmountOpen': '0.120210',
    'Status': 'STATUS',
    'Source': 'SOUERCE',
    'Email': 'cock@cock.cock',
    'OrderId': 12313,
    'OrderType': 'Type',
    'AmountChange': '0.012',
    'Total': 'TOTAL'
};

// SaveOrder(c1_order, c1_Orders);
// const bit = new BittrexService({
// //     apiKey: '5fdc7db03ec640e0b7c999b2974fff71',
// //     apiSecret: '8ce9441e5e554b9e825183593ab7f8ce'
// // });
// //
// // bit.balance()
// // .then(console.log);
// //
// // bit.get('account/withdraw', {
// //     currency: 'xrp',
// //     quantity: 10,
// //     address: 'rPVMhWBsfF9iMXYj3aAzJVkPDTFNSyWdKy',
// //     paymentid: 310839659
// // })
// //     .then((res) => {
// //         console.log(res);
// //         bit.balance()
// //             .then(console.log);
// //     })
// //     .catch(console.error);

OrderProvider.Start();