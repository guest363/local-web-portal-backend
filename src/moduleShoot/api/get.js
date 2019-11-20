const shootModel = require("../schems/shoot");

module.exports = (msg, socket) => {
    if (msg.fio === '') return socket.emit('ERROR', 'Должна быть задана фамилия');
    shootModel.find()
        .byFIOandDate(msg.fio, msg.startDate, msg.endDate)
        .exec(
            function (err, result) {
                if (err) return socket.emit('ERROR', err);
                return socket.emit('shootsHistory', result);
            }
        )
};