const wikiModel = require("../../schems/wikiModel");
const { CREATE_WIKI, UPDATE_WIKI, POST_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    const article = req.body;
    const hasDoc = await wikiModel.findOne({
        url: article.url
    });
    if (hasDoc === null) {
        const newWikiArticle = new wikiModel(article);
        try {
            await newWikiArticle.save();
        } catch (error) {
            return network.send(`${POST_ERROR} - ${error}`);
        }
        network.send(CREATE_WIKI);

    } else {
        try {
            await wikiModel.findOneAndUpdate({ url: article.url }, article);
        } catch (error) {
            return network.send(`${POST_ERROR} - ${error}`);
        }
        network.send(UPDATE_WIKI);
    }
}