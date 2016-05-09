var https = require('https');
var querystring = require('querystring');
var fs = require('fs');
var locations = JSON.parse(fs.readFileSync('dataCollectionLocations.geojson', 'utf8'));


var token;
var gLat = 38.87693545;
var gLon = -77.0165205;

var respJson;

var post_data = querystring.stringify({"grant_type": "client_credentials", "scope": "public"});


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
        getDataWrapper();
    });
});

function getAndSaveToken(){
    auth_req.write(post_data);
    auth_req.end();
}

getAndSaveToken();


function getDataWrapper(){
    var data =  locations.features;

    for(i=0;i<data.length;i++){
        var lat = data[i].properties.centlat;
        var lon = data[i].properties.centlon;
        var config = {token:token, lat:lat,lon:lon};
        console.log("config!",config);
        getData(config)

    }


}



function getData(config) {

    var get_cost_options= {
        hostname: 'api.lyft.com',
        port:443,
        method:'GET',
        path: '/v1/cost?start_lat='+config.lat+'&start_lng='+config.lon,
        headers:{
            'Authorization': 'Bearer '+config.token,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };


    var data_req = https.request(get_cost_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            respJson = JSON.parse(chunk);
            console.log('Response: ' + JSON.stringify(respJson));
        });
    });

    data_req.end();
    data_req.on('error', function(err){
        console.log("Error: ", err);
    });
}


