//-------------- Аунтентификация для маршрута --------------

const api = require('express').Router();
/*  LOGER */
/* api.use((req, res, next) => {
    console.log(req.path)
    next()
}) */
api.use('/wiki', require('../moduleWiki/router'));
api.use('/auth', require('../moduleAuth/router'));
api.use('/monitoring', require('../moduleMonitoring/router'));
api.use('/persons', require('../modulPerson/router'));


module.exports = api;