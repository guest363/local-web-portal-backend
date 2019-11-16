const { mongoose } = require('../variables.js');
const Schema = mongoose.Schema;
/* Schema */
const wikiSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    header: String,
    url: {
        type: String,
        index: true
    },
    content: String,
    tag: [String]
});
/* Важно. Чтобы при выдаче можно было обращаться к виртуальным */
wikiSchema.set('toObject', { virtuals: true });
wikiSchema.set('toJSON', { virtuals: true });
/* Querys */
wikiSchema.query.byUrl = function (url) {
    return this.findOne({
        url: url
    })
};
wikiSchema.query.byTagAndContent = function (tag, content) {
    try {
        content = new RegExp(content, 'i');
    } catch (error) {
        return { exec: fn => fn('', 'Ошибка в регулярном выражении!') };
    }
    /* Если тег не передан то поиск по любому */
    if (tag === void 0 || tag[0] === void 0) {
        tag = new RegExp('', 'i');
    }
    const result = this.where({
        tag: { '$in': tag },
        content: content
    })
    return result;
};

wikiSchema.query.byTag = function (tag) {
    if (tag === '') {
        tag = new RegExp(tag, 'i');
    }
    const result = this.where({
        tag: { '$in': tag }
    });

    return result;
};

wikiSchema.query.lastAdd = function () {
    return this.findOne().sort({ created_at: -1 });
}
/* Model */
let wikiModel = mongoose.model('wikiModel', wikiSchema, 'wiki');
module.exports = wikiModel;