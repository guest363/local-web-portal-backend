

/* Отдельно имя, фамилия и отчество и функции которые выдают в коротком и длинном виде */
function shoot(req, socket) {
    const { action = '', msg = '' } = req;
    const authErrorMsg = `Только авторизованные пользователи могут совершать это действие`;
    const actions = {
        'get': require('./api/get')(msg, socket),
        'set': require('./api/post')(msg, socket, authErrorMsg),
    };
    return actions[action];
}

module.exports = shoot;
