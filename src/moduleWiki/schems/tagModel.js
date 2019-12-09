const { mongoose } = require('../../variables.js');
const Schema = mongoose.Schema;
/* Schema */
const wikiTagSchema = new Schema({
    tag: {
        type: String,
        required: true,
        unique: true,
        index: true,
        uppercase: true
    }
});

/* Model */
const wikiTagModel = mongoose.model('wikiTagSchema', wikiTagSchema, 'wikiTag');
module.exports = wikiTagModel;