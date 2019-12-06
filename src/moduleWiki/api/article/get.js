const wikiModel = require("../../schems/wikiModel");
const { GET_ERROR } = require('../../messages');
module.exports = (req, network) => {
    const articleUrl = req.params.url;
    wikiModel.find()
        .byUrl(articleUrl)
        .exec((err, result) => {
            if (err) {
                return network.send(`${GET_ERROR} - ${err}`);

            } else {
                return network.send(result);
            }
        });
}