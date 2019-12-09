const tagModel = require("../../schems/tagModel");
const { POST_TAG, POST_TAG_ERROR_HAVE, POST_TAG_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    let hasTag;
    try {
        const tag = req.body;
        hasTag = await tagModel.findOne(tag);
        if (hasTag === null) {
            const newWikiTag = new tagModel(tag);
            await newWikiTag.save();
            network.send(POST_TAG);
        } else {
            network.send(POST_TAG_ERROR_HAVE);
        }
    } catch (error) {
        network.send(`${POST_TAG_ERROR} - ${error}`);
    }

};