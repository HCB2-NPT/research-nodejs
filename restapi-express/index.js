let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');

let config = require('./config');
mongoose.Promise = global.Promise;
global.db = mongoose.createConnection(config.DATABASE);

let app = express();
let router = express.Router();
let routes = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.listen(config.PORT, () => {
    console.log('Server starting at port 3000');
});
