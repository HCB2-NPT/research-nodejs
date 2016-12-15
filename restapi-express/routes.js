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
    let id = req.params.album;
    albumModel.find({ '_id': ObjectId(id) }, (err, docs) => {
        if (err) return next(err);

        res.send(docs);
    });
};

// Create an album
exports.insertAlbum = (req, res, next) => {
    let album = new albumModel(req.body);
    album.save((err) => {
        if (err) return next(err);

        res.status(201).end();
    });
};

// Update album
exports.updateAlbum = (req, res, next) => {
    let id = req.params.album;
    let album = req.body;
    albumModel.findByIdAndUpdate({ '_id': ObjectId(id) }, album, (err, docs) => {
        if (err) return next(err);

        res.status(204).end();
    });
};

// Update partial album
exports.updatePartialAlbum = (req, res, next) => {
    let id = req.params.album;
    let album = req.body;
    albumModel.findByIdAndUpdate({ '_id': ObjectId(id) }, album, (err, docs) => {
        if (err) return next(err);

        res.status(204).end();
    });
};

// Delete album
exports.deleteAlbum = (req, res, next) => {
    let id = req.params.album;
    albumModel.remove({
        '_id': ObjectId(id)
    }, (err, docs) => {
        if (err) return next(err);

        res.status(204).end();
    });
};
