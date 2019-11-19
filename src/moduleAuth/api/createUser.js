const userModel = require("../schems/auth");
const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../../variables');

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
    const user = req.body;
    const token = req.header.token;
    const isAnyUserCreate = await userModel.findOne({});
    if (isAnyUserCreate !== null && !checkToken(token)) {
        return network.send(`Только авторизованные пользователи могут создать нового`);
    }
    try {
        await userModel.create(user);
        network.send(`Создан новый пользователь ${user.login}`);
    } catch (error) {
        network.send(`Ошибка создания пользователя ${error}`);
    }
};