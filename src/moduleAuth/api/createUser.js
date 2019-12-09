const userModel = require("../schems/auth");
const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../../variables');
const { ONLY_FOR_AUTH_USER } = require('../errorMsg.js');
const checkToken = token => {
    return jwt.verify(
        token,
        jwtsecret,
        (err, decoded) => {
            return (err) ? false : true;
        }
    )
};
/* Создать без пароля можно только первого пользователя
затем только авторизованные могут добавлять */
module.exports = async (req, network) => {
    try {
        const user = req.body;
        const token = req.header('token');
        const isAnyUserCreate = await userModel.findOne({});
        if (isAnyUserCreate !== null && !checkToken(token)) {
            return network.send(ONLY_FOR_AUTH_USER);
        }
        const result = await userModel.create(user);
        network.send(`Создан новый пользователь ${result.login}`);
    } catch (error) {
        network.send(`Ошибка создания пользователя ${error}`);
    }
};