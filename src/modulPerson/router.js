const isAuth = require('../moduleAuth/api');


const PersonRouter = require('express').Router();
/*  LOGER */
/* PersonRouter.use((req, res, next) => {
    console.log(req.path)
    next()
}) */
PersonRouter.route('/person')
    .get(require('./api/get'))
    .post(isAuth, require('./api/post'))
    .delete(isAuth, require('./api/delete'));


module.exports = PersonRouter;
