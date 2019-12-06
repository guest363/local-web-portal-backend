const wikiModel = require("../../schems/wikiModel");
const { SEARCHE_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    const article = req.query;
    wikiModel.find()
        .byTagAndContent(article.tag, article.content)
        .exec((err, result) => {
            if (err) {
                return network.send(`${SEARCHE_ERROR} - ${err}`);

            } else {
                return network.send(result);
            }
        });
}