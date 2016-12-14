let express = require('express');
let mongoose = require('mongoose');

global.db = mongoose.createConnection('mongodb://localhost/MusicStore');

let app = express();
let routes = require('./routes');

// Router
app.get('/albums', routes.getAlbums);
app.get('/albums/:album', routes.getAlbum);
app.post('/albums', routes.insertAlbum);

app.listen(3000, () => {
    console.log('Server starting at port 3000');
});
