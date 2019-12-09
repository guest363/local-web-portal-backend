const userModel = require("../schems/auth");
const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../../variables');
const { INCORRECT_DATA, NOT_OBJECT, NOT_FULL_DATA } = require('../errorMsg.js');

/* Создать без пароля можно только первого пользователя
затем только авторизованные могут добавлять */
module.exports = async (req, network) => {
    if (!typeof req.body === 'object') {
        return network.send(NOT_OBJECT);
    }
    if (!req.body.hasOwnProperty('login') || !req.body.hasOwnProperty('password')) {
        return network.send(NOT_FULL_DATA);
    }
    try {
        const login = req.body.login;
        const password = req.body.password;
        const currectLogin = await userModel.findOne({ login });
        const currectPassword = currectLogin ? currectLogin.checkPassword(password) : false;
        if (currectLogin && currectPassword) {
            const userJWT = jwt.sign({ displayName: userModel.displayName }, jwtsecret, { expiresIn: '5d' })
            network.send({ name: currectLogin.displayName, userJWT: userJWT });
        } else network.send(INCORRECT_DATA);
    } catch (error) {
        network.send(`${INCORRECT_DATA} - ${error}`);
    }
}