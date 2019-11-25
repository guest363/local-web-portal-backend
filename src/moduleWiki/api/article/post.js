const wikiModel = require("../../schems/wikiModel");

module.exports = async (req, network) => {
    const article = req.body;
    const hasDoc = await wikiModel.findOne({
        url: article.url
    });
    if (hasDoc === null) {
        const newWikiArticle = new wikiModel(article);
        try {
            newWikiArticle.save();
            network.send(`Создана новая статья`);
        } catch (error) {
            network.send(`Ошибка создания статьи`);
        }

    } else {
        try {
            await wikiModel.findOneAndUpdate({ url: article.url }, article);
            network.send(`Статья обновлена`);
        } catch (error) {
            network.send(`Ошибка обновления статьи`);
        }
    }
}