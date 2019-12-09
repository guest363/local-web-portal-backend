const newsModel = require("../schems/newsModel");

module.exports = async (msg, socket) => {
    try {
        const result = await newsModel.find().all();
        return socket.emit('RETURN_ALL_NEWS', result);
    } catch (error) {
        return socket.emit('ERROR', error);
    }
}