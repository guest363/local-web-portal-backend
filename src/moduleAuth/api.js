const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../variables');
const isAuth = (req, res, next) => {
    const auth = req.headers.authorization === void 0 ? 'Bearer null' : req.headers.authorization;
    jwt.verify(
        auth.split(' ')[1],
        jwtsecret,
        (err, decoded) => {
            if (err) return res.send(`Только авторизованные пользователи могут совершить действие.
            Причина: ${err.message}`)
            next();
        }
    )
};

module.exports = isAuth;