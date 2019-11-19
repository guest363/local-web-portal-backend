const wikiModel = require("../../schems/wiki");

module.exports = async (req, network) => {
    const article = req.body;
    const hasDoc = await wikiModel.findOne({
        url: article.url
    });
    if (hasDoc === null) {
        const newWikiArticle = new wikiModel(article);
        newWikiArticle.save();
        network.send(`Создана новая запись`);
    } else {
        await wikiModel.findOneAndUpdate({ url: article.url }, article);
        network.send(`Обновлена запись`);
    }
};