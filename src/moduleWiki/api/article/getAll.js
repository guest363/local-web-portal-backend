const wikiModel = require("../../schems/wikiModel");
const { GET_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    try {
        const result = await wikiModel.find({});
        return network.send(result);
    } catch (error) {
        return network.send(`${GET_ERROR} - ${error}`);
    }
}