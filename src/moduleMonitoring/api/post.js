const pingModel = require("../schems/pingModel");
const { CREATE_HOST, UPDATE_HOST, POST_ERROR } = require('../messages');
module.exports = async (req, network) => {
    const host = req.body;
    const query = {
        ip: host.ip
    };
    const doc = await pingModel.findOne(query);
    try {
        if (doc === null) {
            const newHost = new pingModel(host);
            newHost.save();
            network.send(CREATE_HOST);
        } else {
            await pingModel.findOneAndUpdate(host, {
                new: true,
                upset: true
            });
            network.send(UPDATE_HOST);
        }
    } catch (error) {
        network.send(`${POST_ERROR} - ${error}`);
    }

};