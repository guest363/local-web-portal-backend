const { mongoose } = require('../variables.js');
const Schema = mongoose.Schema;
/* Schema */
const wikiTagSchema = new Schema({
    tag: String
});

/* Model */
const wikiTagModel = mongoose.model('wikiTagSchema', wikiTagSchema, 'wikiTag');
module.exports = wikiTagModel;