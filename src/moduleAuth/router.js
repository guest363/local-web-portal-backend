
const router = require('express').Router();
router.route('/user')
    .post(require('./api/createUser'));
router.route('/login')
    .post(require('./api/login'));

/*  LOGER

    router.use((req, res, next) => {
    console.log(req.path)
    next()
}) */
module.exports = router;
