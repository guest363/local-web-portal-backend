const sendResult = require('../sender');
const wikiModel = require("../../schems/wiki");

module.exports = async (req, network) => {
    const id = req.params[0];
    wikiModel.findOneAndDelete({ '_id': id })
        .exec((err, result) => sendResult(err, result, network));
};