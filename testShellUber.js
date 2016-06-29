var Uber = require('uber-api')({server_token:'KWf1thoH-FkuIijTJSLgr4pLblrYjuzhmmp5rO8P',version:'v1'});
var fs = require('fs');
var DBManager = require('./DBManager.js');
var locations = JSON.parse(fs.readFileSync('dataCollectionLocations.geojson', 'utf8'));


function getData(config) {

    Uber.getPriceEstimate({
        sLat: config.sLat,
        sLng: config.sLon,
        eLat: config.eLat,
        eLng: config.eLon
    },function(someKindofNull,response) {
        //   console.log("Price Details: %j", response);
     DBManager.insertUberData(config.sLat, config.sLon, config.meta, response);
    });

}

getDataWrapper();

function getDataWrapper() {
    var data = locations.features;
//console.log("length",data.length);
    console.log("Uber Execute");
    for (i = 0; i < data.length; i++) {
        var sLat = data[i].properties.centlat;
        var sLon = data[i].properties.centlon;
        var eLat = data[i].properties.centlat;
        var eLon = data[i].properties.centlon;
        var metaData = data[i].properties;
        var config = {sLat:sLat, sLon:sLon, eLat:eLat, eLon:eLon, meta: metaData};
        //console.log("config!",config);
        getData(config);
    }

}

module.exports.execute = getDataWrapper;


//Uber.getProducts({lat:x,
//    lng:y,
//    }).then(function(response){
//    console.log("Price Details: %j",response);
//
//}, function(error){
//    console.error(response);
//});