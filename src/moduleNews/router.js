/* Отдельно имя, фамилия и отчество и функции которые выдают в коротком и длинном виде */
function router(req, socket) {
    const { action = '', msg = '', token = '' } = req;
    const authErrorMsg = `Только авторизованные пользователи могут совершать это действие`;
    const actions = {
        get: require('./api/get'),
        post: require('./api/post'),
        delete: require('./api/delete'),
        getAll: require('./api/getAll'),
    };
    if (!actions.hasOwnProperty(action))
        return socket.emit('ERROR', 'Такого метогда взаимодействия с новостями не существует!');
    return actions[action](msg, socket, token, authErrorMsg);
}

module.exports = router;
