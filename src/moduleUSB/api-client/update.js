const socketAuth = require('../../moduleAuth/socketAuth');
const alertModel = require("../schems/alertModel");
const mountModel = require("../schems/mountModel");
const whiteModel = require("../schems/whiteModel");
const { UPDATE_ERROR, UPDATE_USB, AUTH_ERROR } = require('../messages');
const updateAll = async (searche, udpate, socket) => {
    try {
        await mountModel.updateMany(searche, udpate, { multi: true });
        await alertModel.updateMany(searche, udpate, { multi: true });
        await whiteModel.updateMany(searche, udpate);
    } catch (error) {
        return socket.emit('ERROR', `${UPDATE_ERROR} - ${error}`);
    }
    socket.emit('RESULT', `${UPDATE_USB} - ${searche.USBnameSave}`);
};

module.exports = async (req, socket, token) => {
    const { regNumber, docNumber, serial, hostid } = req.msg;
    const USBnameSave = (!req.msg.USBnameSave) ? serial : req.msg.USBnameSave;
    const authResult = await socketAuth(token);
    if (!authResult) {
        return socket.emit('ERROR', AUTH_ERROR);
    }
    const searcheFeild = { 'USBnameSave': USBnameSave };
    const updateFeilds = {
        $set: {
            'docNumber': docNumber,
            'serial': serial,
            'regNumber': regNumber,
            'hostid': hostid
        }
    };
    return await updateAll(searcheFeild, updateFeilds, socket);
}