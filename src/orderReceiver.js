import {SaveOrder} from './orderManager';
import {Log} from './loggerMongo';

const http = require('http');

const port = process.env.PORT || 3000;


const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    }).on('end', () => {
        try {
            const order = JSON.parse(body);
            SaveOrder(order);
        } catch (e) {
            Log('receive', {message: e.toString()});
        }
    });
    res.end('ok');
});

server.listen(port, () => {
    console.log('Server started:', port);
});