const { mongoose } = require('../../variables.js');
const Schema = mongoose.Schema;
/* Schema */
const personSchema = new Schema({
    fio: {
        type: String,
        uppercase: true,
        trim: true,
        index: true
    },
    squad: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    birthDay: Date
});
/* Важно. Чтобы при выдаче можно было обращаться к виртуальным функциям */
personSchema.set('toObject', { virtuals: true });
personSchema.set('toJSON', { virtuals: true });
/* Querys */
personSchema.query.byID = function (id) {
    return this.findOne({
        ['_id']: id
    })
};
personSchema.query.all = function () {
    return this.find();
};

/* Model */
const personModel = mongoose.model('personModel', personSchema, 'persone');
module.exports = personModel;