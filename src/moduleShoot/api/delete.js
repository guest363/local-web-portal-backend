const shootModel = require("../schems/shoot");
const auth = require('../../moduleAuth/socket');

module.exports = async (msg, socket, token, authErrorMsg) => {
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('RESULT', authErrorMsg);
    }
    shootModel.findOneAndDelete({ '_id': msg })
        .exec((err, result) => {
            if (err) return socket.emit('ERROR', err);
            return socket.emit('RESULT', result);
        })
};