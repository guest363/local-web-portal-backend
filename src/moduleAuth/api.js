const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../variables');
/**
 * Валидирует токен пользователя который выставлен в 
 * headers.authorization и должен быть вида 'Bearer *'
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isAuth = (req, res, next) => {
    const auth = req.headers.authorization === void 0 ? 'Bearer null' : req.headers.authorization;
    jwt.verify(
        auth.split(' ')[1],
        jwtsecret,
        (err, decoded) => {
            if (err) return res.send(`Только авторизованные пользователи могут совершить действие. Причина: ${err.message}`)
            next();
        }
    )
};

module.exports = isAuth;