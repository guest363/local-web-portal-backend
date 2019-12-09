const personModel = require("../schems/personModel");
const { DELETE_PERSON, DELETE_ERROR } = require('../messages');
module.exports = async (req, network) => {
    const id = req.query.id;
    try {
        await personModel.findOneAndDelete({ '_id': id });
        return network.send(DELETE_PERSON);
    } catch (error) {
        return network.send(`${DELETE_ERROR} - ${error}`);
    }
};