const tagModel = require("../../schems/tag");
const sendResult = require('../sender');

module.exports = (req, network) => {
    tagModel.find()
        .exec((err, result) => sendResult(err, result, network))
};