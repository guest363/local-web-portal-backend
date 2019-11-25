const isAuth = require('../moduleAuth/api');


const router = require('express').Router();
router.route('/hosts')
    .get(require('./api/get'))
    .post(isAuth, require('./api/post'))
    .delete(isAuth, require('./api/delete'));
/*  LOGER

    router.use((req, res, next) => {
    console.log(req.path)
    next()

}) */
module.exports = router;
