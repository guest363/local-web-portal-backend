const newsModel = require("../schems/newsModel");
const socketAuth = require('../../moduleAuth/socketAuth');
const broadcastUpdate = require('./broadcastUpdate');
const { DELETE_NEWS, DELETE_ERROR } = require('../messages');
module.exports = async (msg, socket, token, authErrorMsg) => {
    const authResult = await socketAuth(token);
    if (!authResult) {
        return socket.emit('RESULT', authErrorMsg);
    }
    newsModel.findOneAndDelete({ '_id': msg })
        .exec((err, result) => {
            if (err) return socket.emit('ERROR', `${DELETE_ERROR} - ${err}`);
            socket.emit('RESULT', DELETE_NEWS);
            /* Обновить список новостей на клиентах. */
            return broadcastUpdate(socket);
        })
}