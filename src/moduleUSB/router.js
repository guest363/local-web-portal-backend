const alertModel = require("./schems/alert");
const mountModel = require("./schems/mount");
const whiteModel = require("./schems/white");
const tablesLinker = {
    'whiteListUSB': whiteModel,
    'alertUSB': alertModel,
    'mountUSB': mountModel
};

function news(req, socket) {
    const { action = '', token = '', table = '' } = req;
    if (!tablesLinker.hasOwnProperty(table)) return socket.emit('ERROR', 'В какой таблице действия?');

    const authErrorMsg = `Только авторизованные пользователи могут совершать это действие`;
    const actions = {
        get: require('./api-client/get'),
        addToWhite: require('./api-client/addToWhite'),
        del: require('./api-client/delete'),
        update: require('./api-client/update'),
    };
    if (!actions.hasOwnProperty(action))
        return socket.emit('ERROR', 'Такого метогда взаимодействия с новостями не существует!');
    return actions[action](req, socket, token, authErrorMsg);
}

module.exports = news;
