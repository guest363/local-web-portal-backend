const userModel = require("../schems/auth");
const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../../variables');


/* Создать без пароля можно только первого пользователя
затем только авторизованные могут добавлять */
module.exports = async (req, network) => {
    const user = req.body;
    const login = user.login;

    const currectLogin = await userModel.findOne({ login });
    const currectPassword = currectLogin ? currectLogin.checkPassword(user.password) : false;
    if (currectLogin && currectPassword) {
        const userJWT = jwt.sign({ displayName: userModel.displayName }, jwtsecret, { expiresIn: '5d' })
        network.send({ name: currectLogin.displayName, userJWT: userJWT })
    } else network.send('логин или пароль не верны');
}