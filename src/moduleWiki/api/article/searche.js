const wikiModel = require("../../schems/wikiModel");

module.exports = async (req, network) => {
    const article = req.query;
    wikiModel.find()
        .byTagAndContent(article.tag, article.content)
        .exec((err, result) => {
            if (err) {
                return network.send(`Ошибка при поиске статьи статьи - ${err}`);

            } else {
                return network.send(result);
            }
        });
}