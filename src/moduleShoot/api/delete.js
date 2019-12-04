const shootModel = require("../schems/shoot");
const auth = require('../../moduleAuth/socketAuth');
const { DELETE_SHOOT, DELETE_ERROR, AUTH_ERROR} = require('../messages');
module.exports = async (msg, socket, token) => {
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('RESULT', AUTH_ERROR);
    }
    shootModel.findOneAndDelete({ '_id': msg })
        .exec((err, result) => {
            if (err) return socket.emit('ERROR', `${DELETE_ERROR} - ${err}`);
            return socket.emit('RESULT', DELETE_SHOOT);
        })
};