const newsModel = require("../schems/news");
const auth = require('../../moduleAuth/socket');
const broadcastUpdate = require('./broadcastUpdate');

module.exports = async (msg, socket, token, authErrorMsg) => {
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('RESULT', authErrorMsg);
    };
    newsModel.findOneAndDelete({ '_id': msg })
        .exec((err, result) => {
            if (err) return socket.emit('ERROR', err);
            socket.emit('RESULT', 'Новость удалена');
            /* Обновить список новостей на клиентах. */
            return broadcastUpdate(socket);
        })
}