const pingModel = require("../schems/pingHosts.js");

async function ping(msg, res, action) {
    const actions = {
        async GET() {
            pingModel.find({}).exec(function (err, result) {
                res.send(result);
            });
        },
        async SET() {
            const query = {
                ip: msg.ip
            };
            const doc = await pingModel.findOne(query);
            if (doc === null) {
                const newHost = new pingModel(msg);
                /*  console.log(newHost); */
                newHost.save();
                res.send(`Создана новая запись`);
            } else {
                await pingModel.findOneAndUpdate(query, msg, {
                    new: true,
                    upset: true
                });
                res.send(`Обновлена запись`);
            }
        },
        DEL() {

        }
    };
    return actions[action]();
}

module.exports = ping;
