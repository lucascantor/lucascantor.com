'use strict';
console.log('Loading function');
const AWS = require('aws-sdk');
const sesClient = new AWS.SES();
const sesToAddress = "Lucas Cantor <lucascantor@gmail.com>";
const sesFromAddress = "lucascantor.com contact <no-reply@lucascantor.com>";

/**
 * Lambda to process HTTP POST for contact form with the following body
 * {
      "email": <contact-email>,
      "subject": <contact-subject>,
      "message": <contact-message>
    }
 *
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var emailObj = JSON.parse(event.body);
    var params = getEmailMessage(emailObj);
    var sendEmailPromise = sesClient.sendEmail(params).promise();
    
    var response = {
        statusCode: 200,
        headers: { 
            "Access-Control-Allow-Origin": "https://lucascantor.com" 
        }
    };
    
    sendEmailPromise.then(function(result) {
        console.log(result);
        callback(null, response);
    }).catch(function(err) {
        console.log(err);
        response.statusCode = 500;
        callback(null, response);
    });
};

function getEmailMessage (emailObj) {
    var emailRequestParams = {
        Destination: {
          ToAddresses: [ sesToAddress ]  
        },
        Message: {
            Body: {
                Text: {
                    Data: emailObj.message
                }
            },
            Subject: {
                Data: emailObj.subject
            }
        },
        Source: sesFromAddress,
        ReplyToAddresses: [ emailObj.email ]
    };
    
    return emailRequestParams;
}