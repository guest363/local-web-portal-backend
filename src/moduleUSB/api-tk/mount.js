const alertModel = require("../schems/alertModel");
const mountModel = require("../schems/mountModel");
const whiteModel = require("../schems/whiteModel");
const usbObjCreator = require('../support/tk/usbObjCreator');
const setActualData = require('../support/tk/setActualData');
const enjectUSB = require('../support/tk/enjectAction');
const writeToAlertTable = require('../support/tk/writeToAlertTable');
const writeToMountTable = require('../support/tk/writeToMountTable');
/* Действия при принятии сообщения от тонкого глиента */
/* const shutdown = require("../ssh/shutdown.js"); */

async function usbTkActions(msg, res, io) {
    // Устройства без серийного номера не попадают в БД
    if (!msg.serial) return res.send(`true`);
    // Если действия отмонтировать USB то короткий путь
    if (msg.event === 'inject') return await enjectUSB(mountModel, msg, io, res);


    const USB = usbObjCreator(msg);
    const normolizeUSB = await setActualData(whiteModel, USB, { 'USBnameSave': msg.serial });

    const mountUSB = async () => {
        console.log(`---===== Mount USB ====---- \n ${JSON.stringify(msg)}`);
        await writeToMountTable(mountModel, normolizeUSB, io);
        try {
            const result = await whiteModel.find({ 'USBnameSave': msg.serial });
            (result === null || result.length !== 0) ?
                res.send(`true`) : writeToAlertTable(alertModel, normolizeUSB, res);
        } catch (err) {
            console.error(`Ошибка доступа таблице с Белым списком USB \n ${err}`)
        }
    };

    /* Примонтировать устройство */
    mountUSB();

}

module.exports = usbTkActions;