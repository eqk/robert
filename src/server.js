import {HitbtcService} from './xchng/hitbtc';

const a = new HitbtcService({
    apiKey: '50326421a58eb0d56e67676c448ecbe3',
    apiSecret: 'b4a4d6b823506a3e9aa0375a5ac7c8ee'
});


a.maxbid_minask()
    .then();