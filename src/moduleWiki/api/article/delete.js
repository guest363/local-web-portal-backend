const wikiModel = require("../../schems/wikiModel");

module.exports = async (req, network) => {
    const id = req.params[0];
    wikiModel.findOneAndDelete({ '_id': id })
        .exec((err, result) => {
            if (err) {
                return network.send(`Ошибка при удалении статьи - ${err}`);

            } else {
                return network.send(`Удалена статья - ${result.header}`);
            }
        });
}