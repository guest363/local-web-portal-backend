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

module.exports = async (req, socket, token, authErrorMsg) => {
    const { msg, table } = req;
    const authResult = await socketAuth(token);
    if (!authResult) {
        return socket.emit('ERROR', authErrorMsg);
    }

    /* Динамическая ссылка на коллекции */
    const collection = tablesLinker[table];
    /* Так как накосячил и в белый список _id это просто строка */
    const id = (table === 'whiteListUSB') ? msg : ObjectId(msg);
    collection.findOneAndDelete({ '_id': id }, (err, result) => {
        if (err) return socket.emit('ERROR', err);
        socket.emit('RESULT', 'Носитель удален из базы');
    })
}