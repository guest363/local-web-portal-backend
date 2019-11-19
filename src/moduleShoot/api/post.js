const shootModel = require("../schems/shoot");
const auth = require('../../moduleAuth/socket');

module.exports = async (msg, socket, authErrorMsg) => {

    const authResult = await auth(token);
    if (!authResult) {
        socket.emit('RESULT', authErrorMsg);
        return client.close();
    };
    const instans = new shootModel(msg);
    instans.save(function (err) {
        if (err) return socket.emit('ERROR', err);
        socket.emit('RESULT', result);
    });
};