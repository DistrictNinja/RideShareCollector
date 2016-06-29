/**
 * Created by admin on 6/9/2016.
 */
var Uber = require('./testShellUber.js');
var Lyft = require('./testShellLyft.js');


var crontab = require('node-crontab');

//var rule = new schedule.RecurrenceRule();
//rule.minute = 42;
//
//var j = schedule.scheduleJob(rule, function(){
//    console.log('The answer to life, the universe, and everything!');
//});


var j = crontab.scheduleJob('*/15 * * * *', function(){
   Uber.execute();
    Lyft.execute();
});
