const tagModel = require("../../schems/tagModel");
const { DELETE_TAG, DELETE_TAG_ERROR, DELETE_TAG_ERROR_NULL } = require('../../messages');
module.exports = async (req, network) => {
    let result;
    try {
        const tag = req.params.tag;
        result = await tagModel.findOneAndDelete({ tag: tag });
    } catch (error) {
        return network.send(`${DELETE_TAG_ERROR} - ${err}`);
    }
    return (!result) ? network.send(`${DELETE_TAG_ERROR_NULL}`) :
        network.send(`${DELETE_TAG} - ${result.header}`);
};