const wikiModel = require("../../schems/wikiModel");

module.exports = (req, network) => {
    const articleUrl = req.params[0];
    wikiModel.find()
        .byUrl(articleUrl)
        .exec((err, result) => {
            if (err) {
                return network.send(`Ошибка при получении статьи статьи - ${err}`);

            } else {
                return network.send(result);
            }
        });
}