const newsModel = require("../schems/newsModel");
const socketAuth = require('../../moduleAuth/socketAuth');
const broadcastUpdate = require('./broadcastUpdate');
const { CREATE_NEWS, UPDATE_NEWS, POST_ERROR } = require('../messages');

module.exports = async (msg, socket, token, authErrorMsg) => {
    const authResult = await socketAuth(token);
    if (!authResult) {
        return socket.emit('ERROR', authErrorMsg);
    }
    const query = { '_id': msg['_id'] }
    const doc = await newsModel.findOne(query);
    try {
        if (doc === null) {
            await new newsModel(msg).save();
            socket.emit(`RESULT`, CREATE_NEWS);
        } else {
            await newsModel.findOneAndUpdate(query, msg);
            socket.emit(`RESULT`, UPDATE_NEWS);
        }
        /* Обновить список новостей на клиентах. */
        return broadcastUpdate(socket);
    } catch (err) {
        return socket.emit('ERROR', `${POST_ERROR} - ${err}`);
    }
}