const tagModel = require("../../schems/tagModel");

module.exports = (req, network) => {
    const tag = req.params[0];
    tagModel.findOneAndDelete({ tag: tag })
        .exec((err, result) => {
            if (err) {
                return network.send(`Ошибка при удалении тега - ${err}`);

            } else {
                return network.send(`Тег удален успешно - ${result.header}`);
            }
        });
};