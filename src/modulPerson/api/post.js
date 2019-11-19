const personModel = require("../schems/persons");
const sendResult = require('./sender');


module.exports = async (req, network) => {
    const person = req.body;
    const query = { '_id': person['_id'] }
    const doc = await personModel.findOne(query);
    if (doc === null) {
        new personModel(person).save();
        network.send(`Пользователь добавлен`);
    } else {
        await personModel.findOneAndUpdate(query, person);
        network.send(`Пользователь обновлен`);
    }
};