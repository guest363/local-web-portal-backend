const writeToMountTable = async (mountModel, normolizeUSB, io) => {
    try {
        
        const result = await mountModel.find({ 'USBnameSave': normolizeUSB.USBnameSave });
        if (result.length === 0) {
            const mountInstans = new mountModel(normolizeUSB);
            mountInstans.save(err => {
                if (err) console.error(`Ошибка записи в таблицу "Примонтированные USB" \n ${err}`)
            });
            io.emit('MOUNTING_USB', normolizeUSB);
        }
    } catch (err) {
        console.error(`Ошибка доступа к базе при попытки записи в таблицу "Примонтированные USB" \n ${err}`)
    }
};

module.exports = writeToMountTable;