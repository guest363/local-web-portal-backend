const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../variables');

/**
 * Верифицирует переданный токен
 * @param {string} token токен для аутентификации
 * @return {Boolean} результат проверки токена
 */
const socketAuth = token => {
    return jwt.verify(
        token,
        jwtsecret,
        (err, decoded) => {
            return (err) ? false : true;
        }
    )
};

module.exports = socketAuth; 