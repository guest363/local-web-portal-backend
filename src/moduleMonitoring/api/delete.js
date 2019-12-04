const pingModel = require("../schems/pingModel");
const { DELETE_HOST, DELETE_ERROR } = require('../messages');
module.exports = (req, network) => {
    const ip = req.body.ip;
    console.log(ip)
    pingModel.findOneAndDelete({ 'ip': ip })
        .exec((error, result) => {
            if (!result) return network.send(`${DELETE_ERROR} - ${error}`);
            else return network.send(DELETE_HOST);
        });
};