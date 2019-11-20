const newsModel = require("../schems/news");
const auth = require('../../moduleAuth/socket');
const broadcastUpdate = require('./broadcastUpdate');
module.exports = async (msg, socket, token, authErrorMsg) => {
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('RESULT', authErrorMsg);
    };
    const query = { '_id': msg['_id'] }
    const doc = await newsModel.findOne(query);
    try {
        if (doc === null) {
            new newsModel(msg).save();
             socket.emit(`POST_NEWS_RESULT`, `Новость создана`);
        } else {
            await newsModel.findOneAndUpdate(query, msg);
            socket.emit(`POST_NEWS_RESULT`, `Новость обновлена`);
        }
        /* Обновить список новостей на клиентах. */
        return broadcastUpdate(socket);
    } catch (err) {
        return socket.emit('ERROR', err);
    }
}