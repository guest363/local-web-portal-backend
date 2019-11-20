const newsModel = require("../schems/news");

module.exports = (socket) => {
    newsModel.find()
        .all()
        .exec((err, result) => {
            if (err) return socket.emit('ERROR', err);
            return socket.broadcast.emit('RETURN_ALL_NEWS', result);
        });
};