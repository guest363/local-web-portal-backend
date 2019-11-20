const alert = require("../schems/alert");
const mount = require("../schems/mount");
const white = require("../schems/white");


/* Действия при принятии сообщения от тонкого глиента */
/* const shutdown = require("../ssh/shutdown.js"); */

function usb(msg, res, io) {
    // Устройства без серийного номера не попадают в БД
    if (msg.serial === '') return res.send(`true`);
    let {
        product = '',
        manufacture = '',
        serial = '',
        hostid = '',
        event = '',
        username = '',
    } = msg;

    const mountMsg = `---===== Mount USB ====---- \n ${JSON.stringify(msg)}`;
    const injectMsg = `---===== Enject USB ====---- \n ${JSON.stringify(msg)}`;

    const objToDB = {
        'mountTime': new Date().toLocaleString("ru"),
        'hostid': hostid,
        'hostidSave': hostid,
        'product': product,
        'manufacture': manufacture,
        'serial': serial,
        'USBnameSave': serial,
        'username': username.substr(0, 30),
        'regNumber': 'Внесите регистрационный номер',
        'docNumber': 'Внесите номер предписания'
    };

    /* Запросы на поиск по уникальным полям */
    const query = {
        'USBnameSave': serial
    };
    /* -------------------------------------*/
    /**
     * @description Для вновь примонтированных выставляет правельные,
     * взятые из уже внесенных, значения для:
     * Регистрационного номера
     * Имени хоста
     * Названию устройства
     * Так как данные значения виртуальны и не передаются фактически при
     * монтировании
     */
    const setActualDate = () => {
        white.find(query).toArray(function (err, result) {
            if (result.length !== 0) {
                objToDB.regNumber = result[0].regNumber;
                objToDB.docNumber = result[0].docNumber;
                objToDB.serial = result[0].serial;
                objToDB.hostid = result[0].hostid;
            };
        });
    }

    const alertUSB = async () => {
        res.send(`false`);
        /*  if (whatType(product) === 'usb') {
             shutdown(ipOfHost);
         } */
        await alert.insertOne(objToDB);

    };

    const checkUsb = function () {
        try {
            white.find(query).toArray(function (err, result) {
                if (result === null || result.length !== 0) {
                    res.send(`true`)
                } else alertUSB();
            });
        } catch (error) {
            console.error(error);
        }

    };
    const mountUSB = function () {
        console.log(mountMsg);
        setActualDate();
        mount.find(query).toArray(function (err, result) {
            if (result.length === 0) {
                mount.insertOne(objToDB)
                io.emit('MOUNTING_USB', msg);
            };
            checkUsb();
        });
    };
    const enjectUSB = async () => {
        console.log(injectMsg);
        await mount.findOneAndDelete(query);
        res.send(`true`);
        io.emit('INJECTING_USB', msg);

    }

    (event === 'inject') ? enjectUSB() : mountUSB();

}

module.exports = usb;