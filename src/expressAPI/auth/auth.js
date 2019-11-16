const userModel = require("../../schems/user.js");
const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../../variables');

async function auth(req, network) {
    const { action = '', msg = '', token = '' } = req;
    const actions = {
        checkToken() {
            return jwt.verify(
                token,
                jwtsecret,
                (err, decoded) => {
                    return (err) ? false : true;
                }
            )
        },
        /* Создать без пароля можно только первого пользователя
        затем только авторизованные могут добавлять */
        async user() {
            const isAnyUserCreate = await userModel.findOne({});
            if (isAnyUserCreate !== null && !this.checkToken(token)) {
                return network.send(`Только авторизованные пользователи могут создать нового`);
            }
            try {
                await userModel.create(msg);
                network.send(`Создан новый пользователь ${msg.login}`);
            } catch (error) {
                network.send(`Ошибка создания пользователя ${error}`);
            }
        },
        async login() {
            const login = msg.login;
            const currectLogin = await userModel.findOne({ login });
            const currectPassword = currectLogin ? currectLogin.checkPassword(msg.password) : false;
            if (currectLogin && currectPassword) {
                const userJWT = jwt.sign({ displayName: userModel.displayName }, jwtsecret, { expiresIn: '5d' })
                network.send({ name: currectLogin.displayName, userJWT: userJWT })
            } else network.send('логин или пароль не верны');
        }
    }
    return actions[action]();

}

module.exports = auth;
