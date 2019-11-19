
const AuthRouter = require('express').Router();
AuthRouter.route('/user')
    .post(require('./api/createUser'));
AuthRouter.route('/login')
    .post(require('./api/login'));

/*  LOGER

    AuthRouter.use((req, res, next) => {
    console.log(req.path)
    next()
}) */
module.exports = AuthRouter;
