import {SaveOrder} from './orderManager';

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
        } catch (e) {}
    });
    res.end('ok');
});

server.listen(port, () => {
    console.log('Server started:', port);
});