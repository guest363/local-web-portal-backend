const wikiModel = require("../../schems/wiki");
const sendResult = require('../sender');

module.exports = (req, network) => {
    const articleUrl = req.params[0];
    wikiModel.find()
        .byUrl(articleUrl)
        .exec((err, result) => sendResult(err, result, network))
};