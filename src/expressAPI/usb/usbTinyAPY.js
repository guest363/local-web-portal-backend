/* Действия при принятии сообщения от тонкого глиента */
const {
    Mongo,
    MongoUrl
} = require('../../variables.js');
const pingModel = require("../../schems/pingHosts.js");
const whatType = require('./usbDeviseTypeCheker');
/* const shutdown = require("../ssh/shutdown.js"); */

function usb(msg, res, io) {
    /* console.log(msg); */
    /* return res.send(`true`); */
    if (msg.serial === '') return res.send(`true`);
    // Устройства без серийного номера не попадают в БД
    let {
        product = '',
        manufacture = '',
        serial = '',
        hostid = '',
        event = '',
        username = ''
    } = msg;
    /* Найти IP по имени хоста из базы мониторинга
       так себе решение, лучше передавать IP вместе с USB */
    /*     let ipOfHost;
        pingModel.find({
            name: hostid,
            hostType: 'Тонкий клиент'
        }).exec(function (err, result) {
            ipOfHost = result[0].ip;
        }); */
    /* ----------------------- */
    const objToDB = {
        'mountTime': new Date().toLocaleString("ru"),
        'hostid': hostid,
        'hostidSave': msg.hostid,
        'product': product,
        'manufacture': manufacture,
        'serial': serial,
        'USBnameSave': msg.serial,
        'username': username.substr(0, 30),
        'regNumber': 'Внесите регистрационный номер'
    };

    /* Запросы на поиск по уникальным полям */
    const query = {
        'USBnameSave': msg.serial
    };
    const queryHost = {
        'hostidSave': msg.hostid
    };
    const usbnameQuery = {
        'USBnameSave': msg.serial
    };
    /* -------------------------------------*/

    Mongo.connect(MongoUrl, function (err, client) {
        const db = client.db('Tyumen');
        const white = db.collection('whiteListUSB');
        const host = db.collection('hostUSB');
        const usbname = db.collection('nameUSB');
        const alert = db.collection('alertUSB');
        const mount = db.collection('mountUSB');


        /**
         * @description Для вновь примонтированных выставляет правельные,
         * взятые из уже внесенных, значения для:
         * Регистрационного номера
         * Имени хоста
         * Названию устройства
         * Так как данные значения виртуальны и не передаются фактически при
         * монтировании
         */
        const setActualRegHostName = () => {
            white.find(query).toArray(function (err, result) {
                if (result.length !== 0) {
                    objToDB.regNumber = result[0].regNumber;
                };
            });
            host.find(queryHost).toArray(function (err, result) {
                if (result.length !== 0) {
                    objToDB.hostid = result[0].hostidNew;
                };
            });

            usbname.find(usbnameQuery).toArray(function (err, result) {
                try {
                    if (result.length !== 0) {
                        objToDB.serial = result[0].serial;
                    };
                } catch (error) {
                    console.error(error);
                }

            });
        }

        const alertUSB = async () => {
            res.send(`false`);
            /*  if (whatType(product) === 'usb') {
                 shutdown(ipOfHost);
             } */
            await alert.insertOne(objToDB);
            client.close();
        };

        const checkUsb = function () {
            try {
                white.find(query).toArray(function (err, result) {
                    if (result === null || result.length !== 0) {
                        res.send(`true`)
                        client.close();
                    } else alertUSB();
                });
            } catch (error) {
                console.error(error);
            }

        };
        const mountUSB = function () {
            console.log(`---===== Mount USB ====---- \n ${JSON.stringify(msg)}`);
            setActualRegHostName();
            mount.find(query).toArray(function (err, result) {
                if (result.length === 0) {
                    mount.insertOne(objToDB)
                    io.emit('mountingUSB', msg);
                };
                checkUsb();
            });
        };
        const enjectUSB = async () => {
            console.log(`---===== Enject USB ====---- \n ${JSON.stringify(msg)}`);
            await mount.findOneAndDelete(query);
            res.send(`true`);
            io.emit('injectUSB', msg);
            client.close();
        }

        (event === 'inject') ? enjectUSB() : mountUSB();

    });
}

module.exports = usb;