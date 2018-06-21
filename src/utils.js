/*
 * Author: Roman Kovjogin
 * Github: https://github.com/white-wolf-17
 * Copyright (c) 2017.
 */

import map from 'lodash/map';

class Utils {

    sortParams(data) {
        let result = {};
        Object.keys(data).sort().forEach(function (key) { result[key] = data[key]; });
        return result;
    }

    paramsToUrl(params) {
        return map(params, (val, key) => { return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`; }).join('&');
    }

    findCookie(string, name) {
        var matches = string.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    reverse(array) {
        return array.map((e, i, a) => a[(a.length - 1) - i]);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    randomProxy() {
        const login = 'gantzerks';
        const pass = 'T9t0SvQ';

        const ips = [
            '185.203.88.127',
            '92.63.195.171',
            '194.58.44.37',
            '62.152.59.33',
            '185.161.208.207',
        ];

        const proxy = ips.map(item => `http://${login}:${pass}@${item}:65233`);

        const i = this.randomNumber(0, ips.length - 1);
        return proxy[i];
    }

    defaultProxy() {
        return 'http://' + 'gantzerks' + ':' + 'T9t0SvQ' + '@' + '88.201.248.202' + ':' + '65233';
    }

    robotProxy() {
        const proxy = [
            'http://' + 'gantzerks' + ':' + 'T9t0SvQ' + '@' + '213.202.255.51' + ':' + '65233',
            'http://' + 'gantzerks' + ':' + 'T9t0SvQ' + '@' + '62.141.36.138' + ':' + '65233'
        ];

        const i = Math.round(Math.random());
        return proxy[i];
    }

    sum(array) {
        return array.reduce(function (a, b) { return a + b; });
    }

    avg(array) {
        return this.sum(array) / array.length;
    }

    randomNumber(min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}


export const utils = new Utils();