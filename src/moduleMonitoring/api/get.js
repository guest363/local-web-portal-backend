const pingModel = require("../schems/pingModel");
const { GET_ERROR } = require('../messages');
module.exports = (req, network) => {
    /* Если нужно будет получать не все хосты */
    /* const count = req.params[0]; */
    pingModel.find({})
        .exec((error, result) => {
            if (error) {
                network.send(`${GET_ERROR} ${error}`);

            } else {
                network.send(result);
            }
        })
};