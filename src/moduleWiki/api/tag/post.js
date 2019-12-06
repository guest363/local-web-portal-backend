const tagModel = require("../../schems/tagModel");
const { POST_TAG, POST_TAG_ERROR_HAVE, POST_TAG_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    const tag = req.body;
    const hasTag = await tagModel.findOne(tag);
    if (hasTag === null) {
        try {
            const newWikiTag = new tagModel(tag);
            newWikiTag.save();
            network.send(POST_TAG);
        } catch (error) {
            network.send(`${POST_TAG_ERROR} - ${error}`);
        }

    } else {
        network.send(POST_TAG_ERROR_HAVE);
    }
};