//-------------- Аунтентификация для маршрута --------------

const ApiRouter = require('express').Router();
/*  LOGER */
/* ApiRouter.use((req, res, next) => {
    console.log(req.path)
    next()
}) */
ApiRouter.use('/wiki', require('../moduleWiki/router'));
ApiRouter.use('/auth', require('../moduleAuth/router'));
ApiRouter.use('/monitoring', require('../moduleMonitoring/router'));
ApiRouter.use('/persons', require('../modulPerson/router'));


module.exports = ApiRouter;