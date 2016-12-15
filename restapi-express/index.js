const URI = 'mongodb://localhost/MusicStore';
const PORT = process.env.PORT || 3000;

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');

global.db = mongoose.createConnection(URI);

let app = express();
let router = express.Router();
let routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Router
router.route('/albums')
    .get(routes.getAlbums)
    .post(routes.insertAlbum);

router.route('/albums/:album')
    .get(routes.getAlbum)
    .put(routes.updateAlbum)
    .patch(routes.updatePartialAlbum)
    .delete(routes.deleteAlbum);

app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
    console.log('Server starting at port 3000');
});
