/**
 * Created by admin on 6/3/2016.
 */

var pg = require('pg');
var conString = "postgres://ninja:n1nja@localhost/DNDB";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 10 (also configurable)


var insertUberData = function(lat,lng,locMeta,resp){
pg.connect(conString, function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }


    var pnt = 'POINT('+lat+ ' ' + lng+')';

    client.query('INSERT INTO public.uber_store(api_response, geom, location_meta) VALUES($1,  ST_GeomFromText($2,4326),$3)', [resp,pnt,locMeta], function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
            return console.error('error running query', err);
        }
        //console.log(result.rows);
        //output: 1
    });




});

};


var insertLyftData= function(lat,lng,locMeta,resp){
    pg.connect(conString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var pnt = 'POINT('+lat+ ' ' + lng+')';
        client.query('INSERT INTO public.lyft_store(api_response, geom, location_meta) VALUES($1,  ST_GeomFromText($2,4326),$3)', [resp,pnt,locMeta], function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }
         //   console.log(result.rows);
            //output: 1
        });
    });
};

module.exports.insertUberData = insertUberData;
module.exports.insertLyftData = insertLyftData;

//insertUberData("-71.060316 48.432044",{'whatup':'yea'},{'whatup':'yea'});