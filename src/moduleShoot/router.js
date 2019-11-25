/* Отдельно имя, фамилия и отчество и функции которые выдают в коротком и длинном виде */
function router(req, socket) {
    const { action = '', msg = '', token = '' } = req;
    const authErrorMsg = `Только авторизованные пользователи могут совершать это действие`;
    const actions = {
        get: require('./api/get'),
        set: require('./api/post'),
        delete: require('./api/delete'),
    };
    if (!actions.hasOwnProperty(action))
        return socket.emit('ERROR', 'Такого метогда взаимодействия с модулем стрельб не существует!');
    return actions[action](msg, socket, token, authErrorMsg);
}

module.exports = router;
