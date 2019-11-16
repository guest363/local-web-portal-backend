const personModel = require("../../schems/persons");


async function person(req, network) {
    const { action = '', person = '' } = req;
    const actions = {
        GET() {
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
        },
        async POST() {
            const query = { '_id': person['_id'] }
            const doc = await personModel.findOne(query);
            if (doc === null) {
                new personModel(person).save();
                network.send(`Пользователь добавлен`);
            } else {
                await personModel.findOneAndUpdate(query, person);
                network.send(`Пользователь обновлен`);
            }
        },
        async DELETE() {
            await personModel.findOneAndDelete({ '_id': person });
            network.send(`Пользователь удален`);
        }
    }
    return actions[action]();

}

module.exports = person;