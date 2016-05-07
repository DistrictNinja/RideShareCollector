var Uber = require('uber-api')({server_token:'P8YegbF53nWPZST5xX0ZlktVnufXYYQa01Dy0ocm',version:'v1'});



var x = 38.87693545;
var y = -77.0165205;
//
//Uber.getPriceEstimate({sLat:x,
//                    sLng:y,
//                    eLat:x,
//                    eLng:y}).then(function(response){
//    console.log("Price Details: %j",response);
//
//}, function(error){
//    console.error(response);
//});
//
Uber.getTimeEstimate({sLat:x,
    sLng:y,
    eLat:x,
    eLng:y}).then(function(response){
    console.log("Price Details: %j",response);

}, function(error){
    console.error(response);
});


// Retrieve
//var MongoClient = require('mongodb').MongoClient;
//
//// Connect to the db
//MongoClient.connect("mongodb://localhost:27017/UberDC", function(err, db) {
//    if(!err) {
//        console.log("We are connected");
//    }
//
//




//});



//Uber.getProducts({lat:x,
//    lng:y,
//    }).then(function(response){
//    console.log("Price Details: %j",response);
//
//}, function(error){
//    console.error(response);
//});