const tagModel = require("../../schems/tagModel");
const { DELETE_TAG, DELETE_TAG_ERROR } = require('../../messages');
module.exports = (req, network) => {
    const tag = req.params[0];
    tagModel.findOneAndDelete({ tag: tag })
        .exec((err, result) => {
            if (err) {
                return network.send(`${DELETE_TAG_ERROR} - ${err}`);

            } else {
                return network.send(`${DELETE_TAG} - ${result.header}`);
            }
        });
};