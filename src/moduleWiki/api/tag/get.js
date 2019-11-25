const tagModel = require("../../schems/tagModel");

module.exports = (req, network) => {
    tagModel.find()
        .exec((err, result) => {
            if (err) {
                return network.send(`Ошибка при списка тегов - ${err}`);

            } else {
                return network.send(result);
            }
        });
};