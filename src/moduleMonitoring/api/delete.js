const pingModel = require("../schems/pingModel");
const { DELETE_HOST, DELETE_ERROR } = require('../messages');
module.exports = async (req, network) => {
    try {
        const ip = req.body.ip;
        const result = await pingModel.findOneAndDelete({ 'ip': ip });
        if(!result) throw new Error('нет такого хоста');
        return network.send(`${DELETE_HOST} - ${result}`);
    } catch (error) {
        return network.send(`${DELETE_ERROR} - ${error}`);
    }
};