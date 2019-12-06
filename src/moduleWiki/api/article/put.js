const wikiModel = require("../../schems/wikiModel");
const { UPDATE_WIKI, POST_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    const article = req.body;
    const articleUrl = req.params.url;
    try {
        await wikiModel.findOneAndUpdate({ url: articleUrl }, article);
        network.send(UPDATE_WIKI);
    } catch (error) {
        network.send(`${POST_ERROR} - ${error}`);
    }
}