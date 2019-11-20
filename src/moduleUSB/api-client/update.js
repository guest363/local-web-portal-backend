const auth = require('../../moduleAuth/socket');
const alertModel = require("../schems/alert");
const mountModel = require("../schems/mount");
const whiteModel = require("../schems/white");

module.exports = async (req, socket, token, authErrorMsg) => {
    const { msg } = req;
    const { USBnameSave, regNumber, docNumber } = msg;
    const query = { 'USBnameSave': USBnameSave };
    const authResult = await auth(token);
    if (!authResult) {
        return socket.emit('ERROR', authErrorMsg);
    }
    const updateAll = (dbRequest, type, val) => {
        mountModel.updateMany(dbRequest, { $set: { [type]: val } }, { multi: true });
        alertModel.updateMany(dbRequest, { $set: { [type]: val } }, { multi: true });
        whiteModel.updateOne(dbRequest, { $set: { [type]: val } });
    };

    await whiteModel.updateOne(query, { $set: { 'docNumber': docNumber } });
    updateAll(query, 'serial', msg.serial);
    updateAll(query, 'regNumber', regNumber);
    socket.emit('RESULT', 'Данные о носителе обнвлены');
}