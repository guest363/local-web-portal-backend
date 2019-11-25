const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../variables');

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