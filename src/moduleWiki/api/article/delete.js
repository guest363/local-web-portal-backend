const wikiModel = require("../../schems/wikiModel");
const { DELETE_WIKI, DELETE_ERROR, DELETE_ERROR_NULL } = require('../../messages');
module.exports = async (req, network) => {
    let result;
    try {
        const id = req.params.url;
        result = await wikiModel.findOneAndDelete({ 'url': id });
    } catch (error) {
        return network.send(`${DELETE_ERROR} - ${err}`);
    }
    return (!result) ? network.send(`${DELETE_ERROR_NULL}`) :
        network.send(`${DELETE_WIKI} - ${result.header}`);
}