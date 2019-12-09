const personModel = require("../schems/personModel");
const { GET_ERROR } = require('../messages');
module.exports = async (req, network) => {
    const person = req.query.id;
    try {
        if (person === 'all') {
            const result = await personModel.find().all();
            return network.send(result);
        }
        const result = await personModel.find().byID(person);
        return network.send(result);
    } catch (error) {
        return network.send(`${GET_ERROR} - ${error}`);
    }
};