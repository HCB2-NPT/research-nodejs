let ObjectId = require('mongodb').ObjectId;
let albumModel = require('./models/Album');

// Get all
exports.getAlbums = (req, res, next) => {
    albumModel.find((err, docs) => {
        if (err) return next(err);

        res.send(docs);
    });
};

// Get by ObjectId
exports.getAlbum = (req, res, next) => {
    albumModel.find({ '_id': ObjectId(req.params.album) }, (err, docs) => {
        if (err) return next(err);

        res.send(docs);
    });
};

// Create an album
exports.insertAlbum = (req, res, next) => {
    // TODO
};
