const isAuth = require('../moduleAuth/api');

const router = require('express').Router();
router.route('/articles')
    .get(require('./api/article/getAll'))
    .post(isAuth, require('./api/article/post'));

router.route('/articles/:url')
    .get(require('./api/article/get'))
    .put(isAuth, require('./api/article/post'))
    .delete(isAuth, require('./api/article/delete'));

    
router.route('/article-searche')
    .get(require('./api/article/searche'));

router.route('/tag')
    .get(require('./api/tag/get'))
    .post(isAuth, require('./api/tag/post'))
    .delete(isAuth, require('./api/tag/delete'));

router.route('/countByTag')
    .get(require('./api/coutn/byTag'));

/*  LOGER

    router.use((req, res, next) => {
    console.log(req.path)
    next()
}) */
module.exports = router;
