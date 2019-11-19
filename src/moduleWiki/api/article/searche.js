const sendResult = require('../sender');
const wikiModel = require("../../schems/wiki");

module.exports = async (req, network) => {
    const article = req.query;
    wikiModel.find()
        .byTagAndContent(article.tag, article.content)
        .exec((err, result) => sendResult(err, result, network))
};