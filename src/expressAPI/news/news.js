const newsModel = require("../../schems/news.js");
const auth = require('../../moduleAuth/socket');

async function news(req, socket) {
    const { action = '', msg = '' } = req;
    const isAuth = (token) => {
        return auth({ action: 'checkToken', token: token });
    };
    const sendAuthError = () => {
        socket.emit('RESULT', authErrorMsg);
        return client.close();
    }
    const authErrorMsg = `Только авторизованные пользователи могут совершать это действие`;
    const actions = {
        get() {
            newsModel.find().byID(msg).exec(
                function (err, news) {
                    if (err) {
                        socket.emit('RETURN_NEWS', err);
                        return
                    }
                    socket.emit('RETURN_NEWS', news);
                }
            )
        },
        getAll() {
            newsModel.find().all()
                .exec((err, result) => socket.emit('RETURN_ALL_NEWS', result))
        },
        async post() {
            const auth = await isAuth(token);
            if (await !auth) {
                return sendAuthError();
            };
            const query = { '_id': msg['_id'] }
            const doc = await newsModel.findOne(query);
            if (doc === null) {
                new newsModel(msg).save();
                socket.emit(`POST_NEWS_RESULT`, `Новость создана`);
            } else {
                await newsModel.findOneAndUpdate(query, msg);
                socket.emit(`POST_NEWS_RESULT`, `Новость обновлена`);
            }
        },
        async delete() {
            const auth = await isAuth(token);
            if (await !auth) {
                return sendAuthError();
            };
            await newsModel.findOneAndDelete({ '_id': msg['_id'] });
        }
    }
    return actions[action]();

}

module.exports = news;
