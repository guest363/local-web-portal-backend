const wikiModel = require("../../schems/wikiModel");
const { COUNT_ERROR } = require('../../messages');
module.exports = (req, network) => {
    const tagsArray = [];
    for (let key in req.query) {
        tagsArray.push(req.query[key]);
    }
    wikiModel.find().byTag(tagsArray).exec(
        (err, result) => {
            if (err) {
                return network.send(`${COUNT_ERROR} - ${err}`);
            }
            const count = result.length;
            /* Если отправлять число, то это воспринимается как код HTTP */
            network.send(`${count}`);
        }
    )
};