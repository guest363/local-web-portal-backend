const wikiModel = require("../../schems/wikiModel");
const { DELETE_WIKI, DELETE_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    const id = req.params.url;
    wikiModel.findOneAndDelete({ 'url': id })
        .exec((err, result) => {
            if (err) {
                return network.send(`${DELETE_ERROR} - ${err}`);

            } else {
                return network.send(`${DELETE_WIKI} - ${result.header}`);
            }
        });
}