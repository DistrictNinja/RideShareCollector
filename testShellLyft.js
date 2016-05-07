var https = require('https');
var querystring = require('querystring');

var post_data = querystring.stringify({"grant_type": "client_credentials", "scope": "public"});


var post_options = {
    hostname: 'api.lyft.com',
    port:443,
    method:'POST',
    path: '/oauth/token/',
    auth:'PvLZrZ6V2A2I:MFu9zJOhFa79gZvHzPw36-VrcoNULmwJ',
    headers:{
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(post_data)
    }
};

var post_req = https.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('statusCode: ', res.statusCode);
       // console.log('headers: ', res.headers);
        console.log('Response: ' + chunk);
    });
});




post_req.write(post_data);
post_req.end();