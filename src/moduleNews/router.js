const { SOCKET_ACTION_ERROR, AUTH_ERROR} = require('./messages');
function router(req, socket) {
    const { action = '', msg = '', token = '' } = req;
    const actions = {
        get: require('./api/get'),
        post: require('./api/post'),
        delete: require('./api/delete'),
        getAll: require('./api/getAll'),
    };
    if (!actions.hasOwnProperty(action))
        return socket.emit('ERROR', SOCKET_ACTION_ERROR);
    return actions[action](msg, socket, token, AUTH_ERROR);
}

module.exports = router;
