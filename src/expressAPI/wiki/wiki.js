const wikiModel = require("../../schems/wiki.js");
const tagModel = require("../../schems/wiki-tag.js");

async function wiki(req, network) {
    const { action = '', msg = '' } = req;
    const sendResult = (error, result) => {
        if (error) {
            network.send(error);

        } else {
            network.send(result);
        }
    };
    const actions = {
        async post(article) {
            const hasDoc = await wikiModel.findOne({
                url: article.url
            });
            if (hasDoc === null) {
                const newWikiArticle = new wikiModel(article);
                newWikiArticle.save();
                network.send(`Создана новая запись`);
            } else {
                await wikiModel.findOneAndUpdate(query, article);
                network.send(`Обновлена запись`);
            }
        },
        async postTag(tag) {
            const hasTag = await tagModel.findOne(tag);
            if (hasTag === null) {
                const newWikiTag = new tagModel(tag);
                newWikiTag.save();
                network.send(`Создан новый тег`);
            } else {
                network.send(`Такой тег уже существует`);
            }
        },
        countByTagWiki(tag) {
            /* Exec фактически равно then */
            wikiModel.find().byTag(tag).exec(
                function (err, result) {
                    if (err) {
                        network.send(err);
                        return
                    }
                    const count = result.length;
                    /* Если отправлять число, то это воспринимается как код HTTP */
                    network.send(`${count}`);
                }
            )
        },
        get(articleUrl) {
            wikiModel.find()
                .byUrl(articleUrl)
                .exec(sendResult)
        },
        search(article) {
            wikiModel.find()
                .byTagAndContent(article.tag, article.content)
                .exec(sendResult)
        },
        async DELETE() {
            await wikiModel.findOneAndDelete({ '_id': msg });
            network.send(`Статья удалена`);
        },
        last() {
            wikiModel.findOne()
                .sort({ _id: -1 })
                .exec(sendResult)
        },
        getTags() {
            tagModel.find()
                .exec(sendResult)
        },
        async deleteTag() {
            await tagModel.findOneAndDelete({ tag: msg });
            network.send(`Тег удален`);
        },
    };

    return actions[action](msg);
}

module.exports = wiki;
