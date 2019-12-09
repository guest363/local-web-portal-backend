const alertModel = require("./schems/alertModel");
const mountModel = require("./schems/mountModel");
const whiteModel = require("./schems/whiteModel");
const tablesLinker = {
    'whiteListUSB': whiteModel,
    'alertUSB': alertModel,
    'mountUSB': mountModel,
    'all': ''
};

function router(req, socket) {
    const { action = '', token = '', table = '' } = req;
    if (!tablesLinker.hasOwnProperty(table)) return socket.emit('ERROR', 'В какой таблице действия?');
    const actions = {
        get: require('./api-client/get'),
        addToWhite: require('./api-client/addToWhite'),
        del: require('./api-client/delete'),
        update: require('./api-client/update'),
    };
    if (!actions.hasOwnProperty(action))
        return socket.emit('ERROR', 'Такого метогда взаимодействия с новостями не существует!');
    return actions[action](req, socket, token);
}

module.exports = router;
