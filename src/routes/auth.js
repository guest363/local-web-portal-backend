const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../variables');
module.exports.isAuth = function (req, res, next) {
    const auth = req.headers.authorization === void 0 ? 'Bearer null' : req.headers.authorization;
    jwt.verify(
        auth.split(' ')[1],
        jwtsecret,
        (err, decoded) => {
            if (err) return res.status(401).send(`Только авторизованные пользователи могут совершить действие`)
            next()
        }
    )

};