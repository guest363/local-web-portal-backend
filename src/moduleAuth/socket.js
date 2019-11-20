const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../variables');

const auth = token => {
    return jwt.verify(
        token,
        jwtsecret,
        (err, decoded) => {
            return (err) ? false : true;
        }
    )
};

module.exports = auth; 