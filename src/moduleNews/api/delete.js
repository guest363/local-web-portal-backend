const newsModel = require("../schems/newsModel");
const socketAuth = require('../../moduleAuth/socketAuth');
const broadcastUpdate = require('./broadcastUpdate');
const { DELETE_NEWS, DELETE_ERROR } = require('../messages');
module.exports = async (msg, socket, token, authErrorMsg) => {
    const authResult = await socketAuth(token);
    if (!authResult) {
        return socket.emit('RESULT', authErrorMsg);
    }
    try {
        await newsModel.findOneAndDelete({ '_id': msg });
        socket.emit('RESULT', DELETE_NEWS);
        return broadcastUpdate(socket);
    } catch (error) {
        socket.emit('ERROR', `${DELETE_ERROR} - ${error}`);
    }
}