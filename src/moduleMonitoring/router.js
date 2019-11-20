const isAuth = require('../moduleAuth/api');


const PingRouter = require('express').Router();
PingRouter.route('/hosts')
    .get(require('./api/get'))
    .post(isAuth, require('./api/post'))
    .delete(isAuth, require('./api/delete'));
/*  LOGER

    PingRouter.use((req, res, next) => {
    console.log(req.path)
    next()

}) */
module.exports = PingRouter;
