const newsModel = require("../schems/news");

module.exports = (msg, socket) => {
    newsModel.find()
        .byID(msg)
        .exec(
            function (err, result) {
                if (err) return socket.emit('ERROR', err);
                return socket.emit('RETURN_NEWS', result);
            }
        )
}