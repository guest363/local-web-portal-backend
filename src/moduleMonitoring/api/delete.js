const pingModel = require("../schems/pingModel");
const sendResult = require('./sender');

module.exports = (req, network) => {
    const ip = req.params[0];
    pingModel.findOneAndDelete({ 'ip': ip })
        .exec((err, result) => sendResult(err, result, network));
};