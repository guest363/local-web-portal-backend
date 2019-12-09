const shootModel = require("../schems/shoot");
const { GET_ERROR, NO_FIO } = require('../messages');
module.exports = async (msg, socket) => {
    try {
        if (msg.fio === '') return socket.emit('ERROR', NO_FIO);
        const { fio, startDate, endDate } = msg;
        const result = await shootModel.find().byFIOandDate(fio, startDate, endDate);
        return socket.emit('SHOOT_HISTORY', result);
    } catch (error) {
        return socket.emit('ERROR', `${GET_ERROR} - ${err}`);
    }
}