const { mongoose } = require('../../variables');
/* Исп базовый тип USB */
const whiteUSBSchema = require('./usb');

/* Важно. Чтобы при выдаче можно было обращаться к виртуальным */
whiteUSBSchema.set('toObject', { virtuals: true });
whiteUSBSchema.set('toJSON', { virtuals: true });

/* Model */
const whiteModel = mongoose.model('whiteModel', whiteUSBSchema, 'whiteListUSB');
module.exports = whiteModel;