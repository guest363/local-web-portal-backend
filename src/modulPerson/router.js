const isAuth = require('../moduleAuth/api');

const router = require('express').Router();
/*  LOGER */
/* router.use((req, res, next) => {
    console.log(req.path)
    next()
}) */
router.route('/person')
    .get(require('./api/get'))
    .post(isAuth, require('./api/post'))
    .delete(isAuth, require('./api/delete'));


module.exports = router;
