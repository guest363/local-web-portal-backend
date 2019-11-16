//-------------- Аутентификация ----------------------------
const auth = require('../expressAPI/auth/auth');
//-------------- API проверки usb ---------------------------
const usb = require('../expressAPI/usb/usbTinyAPY');
//-------------- API wiki  --------------
const wiki = require('../expressAPI/wiki/wiki.js');
//-------------- API ping --------------
const ping = require('../expressAPI/ping');
//-------------- Аунтентификация для маршрута --------------
const authReq = require('./auth');

const person = require('../expressAPI/person/person');

module.exports = function (app, authData, io) {

    app.post('/user', (req, res) => {
        auth({ action: 'user', msg: req.body, token: req.header.token }, res);
    });
    app.post('/login', (req, res) => {
        auth({ action: 'login', msg: req.body }, res);
    });
    /* ------- Person ----------*/
    app.get('/person', (req, res) => {
        person({ action: 'GET', person: req.query.id }, res);
    });
    app.post('/person', authReq.isAuth, (req, res) => {
        person({ action: 'POST', person: req.body }, res);
    });
    app.delete('/person/:id', authReq.isAuth, (req, res) => {
        person({ action: 'DELETE', person: req.params.id }, res);
    });
    /* ------------------------- */
    app.post('/mountflash', (req, res) => {
        usb(req.body, res, io);
    });

    app.post('/ping', authReq.isAuth, (req, res) => {
        ping(req.body, res, 'POST');
    });

    app.get('/ping', (req, res) => {
        ping(req.body, res, 'GET');
    });


    app.get('/wikiLast', (req, res) => {
        wiki({ action: 'last' }, res);
    });
    app.get('/wikiTags', (req, res) => {
        wiki({ action: 'getTags' }, res);
    });
    app.get('/wiki/:url', (req, res) => {
        wiki({ action: 'get', msg: `/wiki/${req.params.url}` }, res);
    });
    app.get('/wiki', (req, res) => {
        wiki({ action: 'search', msg: req.query }, res);
    });
    app.post('/wiki', authReq.isAuth, (req, res) => {
        wiki({ action: 'post', msg: req.body }, res);
    });
    app.post('/wikiTag', authReq.isAuth, (req, res) => {
        wiki({ action: 'postTag', msg: req.body }, res);
    });
    app.delete('/wikiTag', authReq.isAuth,(req, res) => {
        wiki({ action: 'deleteTag', msg: req.params.tag }, res);
    });
    app.delete('/wiki/:id', authReq.isAuth, authReq.isAuth, (req, res) => {
        wiki({ action: 'DELETE', msg: req.params.id }, res);
    });
    app.get('/countByTagWiki', (req, res) => {
        const tagsArray = [];
        for (key in req.query) {
            tagsArray.push(req.query[key]);
        }
        wiki({ action: 'countByTagWiki', msg: tagsArray }, res);
    });

    /* ------------------------------------ */

    /*     auth(app, authData); */
};