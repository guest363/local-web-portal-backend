const newsModel = require("../schems/newsModel");

module.exports = async (msg, socket) => {
    try {
        const result = await newsModel.find().byID(msg);
        return socket.emit('RETURN_NEWS', result);
    } catch (error) {
        return socket.emit('ERROR', error);
    }
}