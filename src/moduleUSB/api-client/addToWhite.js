const whiteModel = require("../schems/whiteModel");
const socketAuth = require('../../moduleAuth/socketAuth');
const { CREATE_WHITE, CREATE_ERROR, AUTH_ERROR } = require('../messages');
module.exports = async (req, socket, token) => {
    const authResult = await socketAuth(token);
    if (!authResult) {
        return socket.emit('ERROR', AUTH_ERROR);
    }
    try {
        const { msg } = req;
        const findInWhite = await whiteModel.findOne({ USBnameSave: msg.serial });
        if (!findInWhite) {
            await new whiteModel(msg).save();
            return socket.emit(`RESULT`, `${CREATE_WHITE} - ${msg.serial}`);
        }
        return socket.emit(`ERROR`, `${CREATE_ERROR} - уже в белом списке`);
    } catch (error) {
        return socket.emit('ERROR', `${CREATE_ERROR} - ${error}`);
    }
}