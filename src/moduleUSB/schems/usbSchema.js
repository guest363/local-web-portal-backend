const { mongoose } = require('../../variables');
const Schema = mongoose.Schema;
/* Schema */
const usbSchema = new Schema({
    mountTime: {
        type: Date,
        default: Date.now()
    },
    hostid: String,
    hostidSave: {
        type: String,
        index: true
    },
    product: String,
    manufacture: String,
    serial: {
        type: String,
        required: true
    },
    USBnameSave: String,
    username: String,
    regNumber: {
        type: String,
        default: "Внесите регистрационный номер"
    },
    docNumber: {
        type: String,
        default: "Внесите номер предписания"
    }
});

module.exports = usbSchema;