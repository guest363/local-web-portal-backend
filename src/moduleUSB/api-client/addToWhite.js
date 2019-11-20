const whiteModel = require("../schems/white");
const auth = require('../../moduleAuth/socket');

module.exports = async (req, socket, token, authErrorMsg) => {
    const { msg } = req;
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('ERROR', authErrorMsg);
    };

    whiteModel.find({ 'serial': msg.serial }).exec((err, result) => {
        if (result.length === 0) {
            socket.emit(`RESULT`, `Новость создана`);
            return whiteModel.insertOne(msg);
        }
    });
};