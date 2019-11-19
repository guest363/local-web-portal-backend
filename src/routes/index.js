

module.exports = function (app, io) {
    app.use('/api', require('./api'));
    app.post('/mountflash', (req, res) => {
        usb(req.body, res, io);
    });
};