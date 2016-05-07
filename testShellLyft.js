var https = require('https');
var querystring = require('querystring');

var post_data = querystring.stringify({"grant_type": "client_credentials", "scope": "public"});
var token;
var respJson;



var req_token_options= {
    hostname: 'api.lyft.com',
    port:443,
    method:'POST',
    path: '/oauth/token/',
    auth:'PvLZrZ6V2A2I:MFu9zJOhFa79gZvHzPw36-VrcoNULmwJ',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    }
};

var auth_req = https.request(req_token_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("PREP: GET TOKEN RESPOSNE");
        console.log('statusCode: ', res.statusCode);
       // console.log('headers: ', res.headers);
        respJson = JSON.parse(chunk);
        console.log('Response: ' + JSON.stringify(respJson));
        token = respJson.access_token;
        console.log('Token: ' + token);
        getData();
    });
});
auth_req.write(post_data);
auth_req.end();


function getData() {

    var get_cost_options= {
        hostname: 'api.lyft.com',
        port:443,
        method:'GET',
        path: '/v1/cost?start_lat=38.87693545&start_lng=-77.0165205',
        auth:'bearer :'+token,
        headers:{
            'Content-Type': 'application/json'
        }
    };


    var data_req = https.request(get_cost_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("PREP: GET COST RESPOSNE");
            console.log('statusCode: ', res.statusCode);
            // console.log('headers: ', res.headers);
            respJson = JSON.parse(chunk);
            console.log('Response: ' + JSON.stringify(respJson));
        });
    });

    data_req.end();
    data_req.on('error', function(err){
        console.log("Error: ", err);
    });
}


