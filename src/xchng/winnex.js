const request = require('request');

export const getWinnexApiKey = () => {
    return new Promise((resolve, reject) => {
        request({
                method: 'POST',
                url: 'https://api.winnex.com/api/v1/Auth/Guest/',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: '{}'
            },
            ((error, response) => {
                if (error)
                    reject(error);
                const headers = response.headers;
                if (!headers)
                    reject(new Error('No Winnex headers'));
                else {
                    const cookies = headers['set-cookie'];
                    if (!cookies)
                        reject(new Error('No Winnex cookies'));
                    else {
                        let apiKey;
                        cookies.map((cookie) => {
                            const re = /api_key=([^;.]+);/.exec(cookie);
                            if (re && re.length > 0) {
                                apiKey = re[1];
                            }
                        });
                        if (!apiKey)
                            reject(new Error('No Winnex key'));
                        else {
                            resolve(apiKey);
                        }
                    }
                }
            })
        );
    });
};

export const getWinnexMinorDic = (apiKey) => {
    const url = 'https://api.winnex.com/api/v1/DictOut/List';
    const cookie = `api_key=${apiKey}`;

    return new Promise((resolve, reject) => {
        let headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        };
        headers['Cookie'] = cookie;

        const options = {
            url: url,
            method: 'GET',
            headers: headers,
            json: true,
        };

        request(options, (error, response, body) => {
            if (error)
                reject(error);
            if ((response && response.statusCode === 200) && (body && !body['errorCode'])) {
                resolve(body);
            }
            else {
                reject(response);
            }
        });
    });
};