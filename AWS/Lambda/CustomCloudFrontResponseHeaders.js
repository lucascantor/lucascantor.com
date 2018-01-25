'use strict';

exports.handler = (event, context, callback) => {
    console.log('Adding additional headers to CloudFront response.');

    const response = event.Records[0].cf.response;
    response.headers['strict-transport-security'] = [{
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubdomains; preload',
    }];
    response.headers['x-content-type-options'] = [{
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    }];
    response.headers['x-frame-options'] = [{
        key: 'X-Frame-Options',
        value: 'DENY',
    }];
    response.headers['x-xss-protection'] = [{
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    }];
    response.headers['referrer-policy'] = [{
        key: 'Referrer-Policy',
        value: 'no-referrer',
    }];

    callback(null, response);
};