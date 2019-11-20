
module.exports = function (app, io) {
    app.use('/api', require('./api'));
    app.post('/mountflash', (req, res) => {
        require('../moduleUSB/api-tk/mount')(req.body, res, io);
    });
};