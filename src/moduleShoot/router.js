const { SOCKET_ACTION_ERROR } = require('./messages');
function router(req, socket) {
    const { action = '', msg = '', token = '' } = req;
    const actions = {
        get: require('./api/get'),
        set: require('./api/post'),
        delete: require('./api/delete'),
    };
    if (!actions.hasOwnProperty(action))
        return socket.emit('ERROR', SOCKET_ACTION_ERROR);
    return actions[action](msg, socket, token);
}

module.exports = router;
