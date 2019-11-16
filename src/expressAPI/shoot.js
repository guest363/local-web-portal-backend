const shootModel = require("../schems/shoot.js");
const auth = require('./auth/auth');
/* Отдельно имя, фамилия и отчество и функции которые выдают в коротком и длинном виде */
function shoot(req, socket) {
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
            if (msg.fio === '') return socket.emit('ERROR', 'Должна быть задана фамилия');
            shootModel.find()
                .byFIOandDate(msg.fio, msg.startDate, msg.endDate)
                .exec(
                    function (err, result) {
                        if (err) return socket.emit('ERROR', err);
                        socket.emit('shootsHistory', result);
                    }
                )
        },
        async set() {
            const auth = await isAuth(token);
            if (await !auth) {
                return sendAuthError();
            };
            const instans = new shootModel(msg);
            instans.save(function (err) {
                if (err) return socket.emit('ERROR', err);
                socket.emit('RESULT', result);
            });
        }
    };
    return actions[action]();
}

module.exports = shoot;
