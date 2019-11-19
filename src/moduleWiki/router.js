const isAuth = require('../moduleAuth/api');

const WikiRouter = require('express').Router();
WikiRouter.route('/article/*')
    .get(require('./api/article/get'))
    .post(isAuth, require('./api/article/post'))
    .delete(isAuth, require('./api/article/delete'));

WikiRouter.route('/article-searche')
    .get(require('./api/article/searche'));

WikiRouter.route('/tag')
    .get(require('./api/tag/get'))
    .post(isAuth, require('./api/tag/post'))
    .delete(isAuth, require('./api/tag/delete'));

WikiRouter.route('/countByTag')
    .get(require('./api/coutn/byTag'));

/*  LOGER

    WikiRouter.use((req, res, next) => {
    console.log(req.path)
    next()
}) */
module.exports = WikiRouter;
