const wikiModel = require("../../schems/wikiModel");
const { GET_ERROR } = require('../../messages');
module.exports = (req, network) => {
    wikiModel.find({})
        .exec((err, result) => {
            if (err) {
                return network.send(`${GET_ERROR} - ${err}`);

            } else {
                return network.send(result);
            }
        });
}