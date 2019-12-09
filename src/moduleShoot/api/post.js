const shootModel = require("../schems/shoot");
const auth = require('../../moduleAuth/socketAuth');
const { CREATE_SHOOT, POST_ERROR, AUTH_ERROR } = require('../messages');
module.exports = async (msg, socket, token) => {
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('ERROR', AUTH_ERROR);
    }
    try {
        const instans = new shootModel(msg);
        await instans.save();
        return socket.emit('RESULT', CREATE_SHOOT);
    } catch (error) {
        return socket.emit('ERROR', `${POST_ERROR} - ${error}`);
    }
};