const tagModel = require("../../schems/tag");

module.exports = async (req, network) => {
    const tag = req.body;
    const hasTag = await tagModel.findOne(tag);
    if (hasTag === null) {
        const newWikiTag = new tagModel(tag);
        newWikiTag.save();
        network.send(`Создан новый тег`);
    } else {
        network.send(`Такой тег уже существует`);
    }
};