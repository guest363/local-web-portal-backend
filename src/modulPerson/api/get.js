const personModel = require("../schems/personModel");

module.exports = (req, network) => {
    const person = req.query.id;
    if (person === 'all') return personModel.find().all()
        .exec((err, result) => network.send(result))
    personModel.find().byID(person).exec(
        function (error, result) {
            if (error) {
                return network.send(`Данный пользователь не найден ${error}`);
            }
            network.send(result);
        }
    )
};