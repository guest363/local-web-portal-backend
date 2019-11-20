const auth = require('../../moduleAuth/socket');
const alertModel = require("../schems/alert");
const mountModel = require("../schems/mount");
const whiteModel = require("../schems/white");
const tablesLinker = {
    'whiteListUSB': whiteModel,
    'alertUSB': alertModel,
    'mountUSB': mountModel
};
const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, socket, token, authErrorMsg) => {
    const { msg, table } = req;
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('ERROR', authErrorMsg);
    };

    /* Динамическая ссылка на коллекции */
    const collection = tablesLinker[table];
    console.log(collection)
    /* Так как накосячил и в белый список _id это просто строка */
    const id = (table === 'whiteListUSB') ? msg : ObjectId(msg);
    collection.findOneAndDelete({ '_id': id }, (err, result) => {
        if (err) return socket.emit('ERROR', err);
        socket.emit('RESULT', 'Носитель удален из базы');
    })
};