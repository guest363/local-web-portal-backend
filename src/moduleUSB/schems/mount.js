const { mongoose } = require('../../variables');
/* Исп базовый тип USB */
const mountUSBSchema = require('./usb');

/* Важно. Чтобы при выдаче можно было обращаться к виртуальным */
mountUSBSchema.set('toObject', { virtuals: true });
mountUSBSchema.set('toJSON', { virtuals: true });

/* Model */
const mountModel = mongoose.model('mountModel', mountUSBSchema, 'mountUSB');
module.exports = mountModel;