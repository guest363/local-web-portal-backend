const socketAuth = require('../../moduleAuth/socketAuth');
const alertModel = require("../schems/alertModel");
const mountModel = require("../schems/mountModel");
const whiteModel = require("../schems/whiteModel");

module.exports = async (req, socket, token, authErrorMsg) => {
    const { msg } = req;
    const { USBnameSave, regNumber, docNumber } = msg;

    const authResult = await socketAuth(token);
    if (!authResult) {
        return socket.emit('ERROR', authErrorMsg);
    }
    const updateAll = async (searche, udpate) => {
        try {
            await mountModel.updateMany(searche, udpate, { multi: true });
            await alertModel.updateMany(searche, udpate, { multi: true });
            await whiteModel.updateOne(searche, udpate);
        } catch (error) {
            return socket.emit('ERROR', `Ошибка при обновлении данных о носителе - ${err}`);
        }
        socket.emit('RESULT', 'Данные о носителе обнвлены');
    };

    const searcheFeild = { 'USBnameSave': USBnameSave };
    const updateFeilds = {
        $set: {
            'docNumber': docNumber,
            'serial': msg.serial,
            'regNumber': regNumber
        }
    };
    updateAll(searcheFeild, updateFeilds);
}