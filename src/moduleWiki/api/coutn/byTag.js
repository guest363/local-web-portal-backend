const wikiModel = require("../../schems/wikiModel");
const { COUNT_ERROR } = require('../../messages');
module.exports = async (req, network) => {
    const tagsArray = [];
    for (let key in req.query) {
        tagsArray.push(req.query[key]);
    }
    try {
        const result = await wikiModel.find().byTag(tagsArray);
        const count = result.length;
        /* Если отправлять число, то это воспринимается как код HTTP */
        return network.send(`${count}`);
    } catch (error) {
        return network.send(`${COUNT_ERROR} - ${error}`);
    }
};