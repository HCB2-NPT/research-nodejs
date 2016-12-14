let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let albumSchema = Schema({
    'album': String,
    'artist': String,
    'tracks': [{
        'name': String,
        'artists': [ String ]
    }]
});

module.exports = db.model('AlbumModel', albumSchema, 'Album');
