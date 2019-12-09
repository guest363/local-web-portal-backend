const tagModel = require("../../schems/tagModel");
const { GET_TAG_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    try {
        const result = await tagModel.find();
        return network.send(result);
    } catch (error) {
        return network.send(`${GET_TAG_ERROR} - ${error}`);
    }
};