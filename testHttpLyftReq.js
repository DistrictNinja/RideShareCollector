/**
 * Created by admin on 5/1/2016.
 */
var request = require('request');
var querystring = require('querystring');

var options = {
    auth: {
        'user':'PvLZrZ6V2A2I',
        'password':'MFu9zJOhFa79gZvHzPw36-VrcoNULmwJ',
        'sendImmediately': false
        },
    url: 'https://api.lyft.com/oauth/token/',
    headers: {
        'Content-Type': 'application/json',
    }
};

var post_data = querystring.stringify({"grant_type": "client_credentials", "scope": "public"});


function callback(error, response, body) {
    console.log("called back",response.statusCode );
    if (!error) {
        var info = JSON.parse(body);
        console.log(info);
    }
}




request.post(options, post_data, callback);