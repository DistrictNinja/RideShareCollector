var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RideShareCollector');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("yayyy")
});


var CollectionPointSchema = new Schema({
    name: String,
    loc: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
    }
});


var CollectionPoint = mongoose.model('CollectionPoint', CollectionPointSchema);


CollectionPointSchema.methods.findLocation =  function(req, res, next) {
    var limit = req.query.limit || 10;

    // get the max distance or set it to 8 kilometers
    var maxDistance = req.query.distance || 8;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;

    // find a location
    Location.find({
        loc: {
            $near: coords,
            $maxDistance: maxDistance
        }
    }).limit(limit).exec(function(err, locations) {
        if (err) {
            return res.json(500, err);
        }

        res.json(200, locations);
    });
}

