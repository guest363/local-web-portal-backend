const shootModel = require("../schems/shoot");
const auth = require('../../moduleAuth/socketAuth');

module.exports = async (msg, socket, token, authErrorMsg) => {
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('RESULT', authErrorMsg);
    }
    const instans = new shootModel(msg);
    instans.save((err, result) => {
        if (err) return socket.emit('ERROR', err);
        return socket.emit('RESULT', result);
    });
};