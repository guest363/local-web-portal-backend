const tagModel = require("../../schems/tagModel");
const { GET_TAG } = require('../../messages');
module.exports = (req, network) => {
    tagModel.find()
        .exec((err, result) => {
            if (err) {
                return network.send(`${GET_TAG} - ${err}`);

            } else {
                return network.send(result);
            }
        });
};