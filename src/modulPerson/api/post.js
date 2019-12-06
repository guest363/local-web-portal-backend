const personModel = require("../schems/personModel");
const { CREATE_PERSON, UPDATE_PERSON, POST_ERROR } = require('../messages');

module.exports = async (req, network) => {
    const person = req.body;
    const query = { '_id': person['_id'] };
    const doc = await personModel.findOne(query);
    try {
        if (doc === null) {
            await new personModel(person).save();
            network.send(CREATE_PERSON);
        } else {
            await personModel.findOneAndUpdate(query, person);
            network.send(UPDATE_PERSON);
        }
    } catch (error) {
        network.send(`${POST_ERROR} - ${error}`);
    }

};