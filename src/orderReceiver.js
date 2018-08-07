import {ProcessOrder, SaveOrder} from './orderManager';
import {Log} from './loggerMongo';

const http = require('http');

const port = process.env.PORT || 3000;


const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    }).on('end', () => {
        Log('requests', {received_at: new Date(), body: body});
        try {
            const order = JSON.parse(body);
            ProcessOrder(order)
                .then((ord) => {
                    res.end(JSON.stringify(ord));
                })
                .catch((err) => {
                    res.statusCode = 500;
                    res.end();
                    Log('receive', {message: err.toString(), obj: JSON.stringify(err)});
                });
        } catch (e) {
            res.statusCode = 500;
            res.end();
            Log('receive', {message: e.toString(), obj: JSON.stringify(err)});
        }
    });
});

server.listen(port, () => {
    console.log('Server started:', port);
});