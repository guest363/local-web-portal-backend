const personModel = require("../schems/personModel");
const { CREATE_PERSON, UPDATE_PERSON} = require('../messages');

module.exports = async (req, network) => {
    const person = req.body;
    const query = { '_id': person['_id'] }
    const doc = await personModel.findOne(query);
    if (doc === null) {
        new personModel(person).save();
        network.send(CREATE_PERSON);
    } else {
        await personModel.findOneAndUpdate(query, person);
        network.send(UPDATE_PERSON);
    }
};