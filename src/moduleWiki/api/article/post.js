const wikiModel = require("../../schems/wikiModel");
const { CREATE_WIKI, UPDATE_WIKI, POST_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    let hasDoc;
    try {
        const article = req.body;
        hasDoc = await wikiModel.findOne({
            url: article.url
        });
        if (hasDoc === null) {
            const newWikiArticle = new wikiModel(article);
            await newWikiArticle.save();
            network.send(CREATE_WIKI);
        } else {
            await wikiModel.findOneAndUpdate({ url: article.url }, article);
            network.send(UPDATE_WIKI);
        }
    } catch (error) {
        return network.send(`${POST_ERROR} - ${error}`);
    }
}