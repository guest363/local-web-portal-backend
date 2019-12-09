const wikiModel = require("../../schems/wikiModel");
const { SEARCHE_ERROR, SEARCHE_NULL } = require('../../messages');
module.exports = async (req, network) => {
    let result;
    try {
        const article = req.query;
        result = await wikiModel.find().byTagAndContent(article.tag, article.content);
    } catch (error) {
        return network.send(`${SEARCHE_ERROR} - ${error}`);
    }
    return (!result) ? network.send(`${SEARCHE_NULL}`) :
        network.send(result);
}