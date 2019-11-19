const tagModel = require("../../schems/tag");
const sendResult = require('../sender');

module.exports = (req, network) => {
    const tag = req.params[0];
    tagModel.findOneAndDelete({ tag: tag })
        .exec((err, result) => sendResult(err, result, network));
};