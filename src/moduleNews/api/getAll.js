const newsModel = require("../schems/news");

module.exports = (msg, socket) => {
    newsModel.find()
        .all()
        .exec((err, result) => {
            if (err) return socket.emit('ERROR', err);
            return socket.emit('RETURN_ALL_NEWS', result);
        });
};