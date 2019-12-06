const { mongoose } = require('../../variables.js');
const Schema = mongoose.Schema;
/* Schema */
const wikiTagSchema = new Schema({
    tag: {
        type: String,
        require: true
    }
});

/* Model */
const wikiTagModel = mongoose.model('wikiTagSchema', wikiTagSchema, 'wikiTag');
module.exports = wikiTagModel;