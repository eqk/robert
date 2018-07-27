import {MongoClient} from 'mongodb';

let logDb;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err)
        console.error(err);
    else {
        console.log('Mongo connected');
        logDb = client.db('robert-logs');
    }
});

export const Log = (destination, data) => {
    try {
        logDb.collection(destination).insert(data);
    } catch (e) {
        console.error(e);
    }
};