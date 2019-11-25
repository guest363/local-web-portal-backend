const personModel = require("../schems/personModel");
const sendResult = require('./sender');

module.exports = (req, network) => {
    const id = req.params[0];
    personModel.findOneAndDelete({ '_id': id })
        .exec((err, result) => sendResult(err, result, network));
};