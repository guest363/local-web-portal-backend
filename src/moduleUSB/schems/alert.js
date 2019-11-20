const { mongoose } = require('../../variables');
/* Исп базовый тип USB */
const alertUSBSchema = require('./usb');

/* Важно. Чтобы при выдаче можно было обращаться к виртуальным */
alertUSBSchema.set('toObject', { virtuals: true });
alertUSBSchema.set('toJSON', { virtuals: true });

/* Model */
const alertModel = mongoose.model('alertModel', alertUSBSchema, 'alertUSB');
module.exports = alertModel;