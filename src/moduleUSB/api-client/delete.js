const socketAuth = require('../../moduleAuth/socketAuth');
const alertModel = require("../schems/alertModel");
const mountModel = require("../schems/mountModel");
const whiteModel = require("../schems/whiteModel");
const tablesLinker = {
    'whiteListUSB': whiteModel,
    'alertUSB': alertModel,
    'mountUSB': mountModel
};
const ObjectId = require('mongodb').ObjectId;
const { DELETE_USB, DELETE_ERROR, AUTH_ERROR } = require('../messages');
module.exports = async (req, socket, token) => {
    const authResult = await socketAuth(token);
    if (!authResult) {
        return socket.emit('ERROR', AUTH_ERROR);
    }
    try {
        const { msg, table } = req;
        /* Динамическая ссылка на коллекции */
        const collection = tablesLinker[table];
        /* Так как накосячил и в белый список _id это просто строка */
        const id = (table === 'whiteListUSB') ? msg : ObjectId(msg);
        await collection.findOneAndDelete({ '_id': id });
        return socket.emit('RESULT', DELETE_USB);
    } catch (error) {
        return socket.emit('ERROR', `${DELETE_ERROR} - ${error}`);
    }
}