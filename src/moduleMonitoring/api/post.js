const pingModel = require("../schems/pingModel");

module.exports = async (req, network) => {
    const host = req.body;
    const query = {
        ip: host.ip
    };
    const doc = await pingModel.findOne(query);
    if (doc === null) {
        const newHost = new pingModel(host);
        newHost.save();
        network.send(`Создана новая запись`);
    } else {
        await pingModel.findOneAndUpdate(host, {
            new: true,
            upset: true
        });
        network.send(`Обновлена запись`);
    }
};