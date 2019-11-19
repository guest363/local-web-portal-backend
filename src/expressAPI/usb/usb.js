const { Mongo, MongoUrl } = require('../../variables');
const ObjectId = require('mongodb').ObjectId;
const chunker = require('./chunker');
const auth = require('../../moduleAuth/socket');

/* 
    table [mountUSB, whiteListUSB, alertUSB]
    
 */
async function usb(req, socket) {
    const { action = '',
        table = '',
        chunk = '',
        filter = 'none',
        msg = {},
        token = '' } = req;
    Mongo.connect(MongoUrl, function (err, client) {
        const db = client.db("Tyumen");
        const { USBnameSave, regNumber, docNumber } = msg;
        /* все задействованные коллекции */
        const white = db.collection('whiteListUSB');
        const alert = db.collection('alertUSB');
        const mount = db.collection('mountUSB');
        const reg = db.collection('regUSB');
        const query = { 'USBnameSave': USBnameSave };

        const updateAll = (query, type, val) => {
            mount.updateMany(query, { $set: { [type]: val } }, { multi: true });
            alert.updateMany(query, { $set: { [type]: val } }, { multi: true });
            white.updateOne(query, { $set: { [type]: val } });
        };
        const isTableUndefind = () => {
            return (table === '') ? true : false;
        };
        const isAuth = (token) => {
            return auth({ action: 'checkToken', token: token });
        };
        const sendAuthError = () => {
            socket.emit('RESULT', authErrorMsg);
            return client.close();
        }
        const authErrorMsg = `Только авторизованные пользователи могут совершать это действие`;
        const actions = {
            async get() {
                /* Из-за того, что в базу пишется уйма левых записей 
                которые нужно фильтровать. */
                /* Динамическая ссылка на коллекции */
                if (isTableUndefind()) return socket.emit('ERROR', 'В какой таблице действия?');
                const collection = db.collection(table);
                if (table === 'alertUSB') {
                    collection.find().
                        toArray(function (err, result) {
                            if (err) return socket.emit('ERROR', err);
                            socket.emit(table, chunker(result, chunk, filter));
                            client.close();
                        });
                } else {
                    const pages = await collection.countDocuments();
                    let filterOb = (filter === 'none') ? { mountTime: -1 } : { [filter]: -1 };
                    collection.find().sort(filterOb).
                        toArray(function (err, result) {
                            if (err) return socket.emit('ERROR', err);
                            socket.emit(table, { chunk: result, pages: pages });
                            client.close();
                        });
                }
            },
            async addToWhite() {
                const auth = await isAuth(token);
                if (await !auth) {
                    return sendAuthError();

                };
                white.find({ 'serial': msg.serial }).toArray(function (err, result) {
                    if (result.length === 0) white.insertOne(msg);
                    client.close();
                });
            },
            async del() {
                const auth = await isAuth(token);
                if (await !auth) {
                    return sendAuthError();

                };
                if (isTableUndefind()) return socket.emit('ERROR', 'В какой таблице действия?');
                /* Динамическая ссылка на коллекции */
                const collection = db.collection(table);
                /* Так как накосячил и в белый список _id это просто строка */
                const id = (table === 'whiteListUSB') ? msg : ObjectId(msg);
                collection.findOneAndDelete({ '_id': id }, (err, result) => {
                    if (err) return socket.emit('ERROR', err);
                    socket.emit('RESULT', 'Носитель удален из базы');
                    client.close();
                })
            },
            async update() {
                const auth = await isAuth(token);
                if (await !auth) {
                    return sendAuthError();

                };
                await white.updateOne(query, { $set: { 'docNumber': docNumber } });
                await updateAll(query, 'serial', msg.serial);
                await updateAll(query, 'regNumber', regNumber);
                /*                 const regFind = await reg.find(query);
                                if (regFind.length === 0) {
                                    await reg.insertOne({
                                        'regNumber': regNumber,
                                        'USBnameSave': USBnameSave
                                    });
                                } else {
                                    await reg.updateMany(query, { $set: { 'regNumber': regNumber } });
                                } */
                socket.emit('RESULT', 'Данные о носителе обнвлены');
                client.close();
            },
        }
        actions[action]();
    });

}

module.exports = usb;
