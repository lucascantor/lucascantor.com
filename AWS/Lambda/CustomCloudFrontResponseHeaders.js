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
    response.headers['content-security-policy'] = [{
        key: 'Content-Security-Policy',
        value: "default-src 'none'; object-src 'none'; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self'; script-src 'self' 'sha256-R67IfEAouXF37f93rvmLikOvP/7VsvCttb6uKYqzulI=' 'sha256-A1FYnT1QjW1PWpdCVyoIX2FsLqzmQevMHcpeuU5rU/w='; connect-src https://zs5c80k81f.execute-api.us-east-1.amazonaws.com/prod/ContactFormLambda; style-src 'self' https://fonts.googleapis.com 'sha256-nVXRYkfCoGFqhSXRlA/2bx5XqjOOAdp4F+lusvZgrno=' 'sha256-dsYDfz3Tdxrj6+jfSvUp+XQvhJPUWTFK4Jm9jbF+ll4=' 'sha256-tIs8OfjWm8MHgPJrHv7mM4wvA/FDFcra3Pd5icRMX+k=' 'sha256-xY3kjt1TMrF9YCbKikF0duY3dGEncCiKAQ3om+GN2N0='",
    }];

    callback(null, response);
};