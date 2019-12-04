const shootModel = require("../schems/shoot");
const auth = require('../../moduleAuth/socketAuth');
const { CREATE_SHOOT, POST_ERROR, AUTH_ERROR } = require('../messages');
module.exports = async (msg, socket, token) => {
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('ERROR', AUTH_ERROR);
    }
    const instans = new shootModel(msg);
    instans.save((err, result) => {
        if (err) return socket.emit('ERROR', `${POST_ERROR} - ${err}`);
        return socket.emit('RESULT', CREATE_SHOOT);
    });
};