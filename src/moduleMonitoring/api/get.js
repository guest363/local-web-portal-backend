const pingModel = require("../schems/pingModel");
const sendResult = require('./sender');

module.exports = (req, network) => {
    /* Если нужно будет получать не все хосты */
    /* const count = req.params[0]; */
    pingModel.find({})
        .exec((err, result) => sendResult(err, result, network))
};