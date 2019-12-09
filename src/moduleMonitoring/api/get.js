const pingModel = require("../schems/pingModel");
const { GET_ERROR } = require('../messages');
module.exports = async (req, network) => {
    /* Если нужно будет получать не все хосты */
    /* const count = req.params[0]; */
    try {
        const result = await pingModel.find({});
        return network.send(result);
    } catch (error) {
        return network.send(`${GET_ERROR} ${error}`);
    }
};