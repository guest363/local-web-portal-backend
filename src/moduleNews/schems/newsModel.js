const { mongoose } = require('../../variables.js');
const Schema = mongoose.Schema;
/* Schema */
const newsSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    header: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    tag: [String]
});
/* Важно. Чтобы при выдаче можно было обращаться к виртуальным */
newsSchema.set('toObject', { virtuals: true });
newsSchema.set('toJSON', { virtuals: true });
/* Querys */
newsSchema.query.byID = function (id) {
    return this.findOne({
        ['_id']: id
    })
};
newsSchema.query.all = function () {
    return this.find();
};

/* Model */
const newsModel = mongoose.model('newsModel', newsSchema, 'news');
module.exports = newsModel;