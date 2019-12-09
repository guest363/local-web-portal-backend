const alertModel = require("../schems/alertModel");
const mountModel = require("../schems/mountModel");
const whiteModel = require("../schems/whiteModel");
const chunker = require('../support/client/chunker');
const tablesLinker = {
    'whiteListUSB': whiteModel,
    'alertUSB': alertModel,
    'mountUSB': mountModel
};
const { GET_ERROR } = require('../messages');
module.exports = async (req, socket) => {
    try {
        const { table = alertUSB, chunk = 0, filter = 'none' } = req;
        /* Из-за того, что в базу пишется уйма левых записей 
                    которые нужно фильтровать. Этим занимается костыль chunker*/
        /* Динамическая ссылка на коллекции */
        const collection = tablesLinker[table];
        if (table === 'alertUSB') {
            const result = await collection.find();
            return socket.emit(table, chunker(result, chunk, filter));
        } else {
            const pages = await collection.countDocuments();
            let filterOb = (filter === 'none') ? { mountTime: -1 } : { [filter]: -1 };
            const result = await collection.find().sort(filterOb);
            return socket.emit(table, { chunk: result, pages: pages });
        }
    } catch (error) {
        socket.emit('ERROR', `${GET_ERROR} - ${error}`);
    }
}