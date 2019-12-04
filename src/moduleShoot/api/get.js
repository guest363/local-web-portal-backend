const shootModel = require("../schems/shoot");
const { GET_ERROR, NO_FIO } = require('../messages');
module.exports = (msg, socket) => {
    if (msg.fio === '') return socket.emit('ERROR', NO_FIO);
    shootModel.find()
        .byFIOandDate(msg.fio, msg.startDate, msg.endDate)
        .exec(
            function (err, result) {
                if (err) return socket.emit('ERROR', `${GET_ERROR} - ${err}`);
                return socket.emit('SHOOT_HISTORY', result);
            }
        )
}