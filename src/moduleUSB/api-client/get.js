const alertModel = require("../schems/alert");
const mountModel = require("../schems/mount");
const whiteModel = require("../schems/white");
const chunker = require('../support/chunker');
const tablesLinker = {
    'whiteListUSB': whiteModel,
    'alertUSB': alertModel,
    'mountUSB': mountModel
};

module.exports = async (req, socket) => {
    const { table = '', chunk = '', filter = 'none' } = req;
    /* Из-за того, что в базу пишется уйма левых записей 
                которые нужно фильтровать. Этим занимается костыль chunker*/
    /* Динамическая ссылка на коллекции */
    const collection = tablesLinker[table];
    if (table === 'alertUSB') {
        collection.find()
            .exec(function (err, result) {
                if (err) return socket.emit('ERROR', err);
                socket.emit(table, chunker(result, chunk, filter));
            });
    } else {
        const pages = await collection.countDocuments();
        let filterOb = (filter === 'none') ? { mountTime: -1 } : { [filter]: -1 };
        collection.find().sort(filterOb)
            .exec(function (err, result) {
                if (err) return socket.emit('ERROR', err);
                socket.emit(table, { chunk: result, pages: pages });
            });
    };
};