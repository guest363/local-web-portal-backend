const writeToAlertTable = (alertModel, normolizeUSB, res) => {
    res.send(`false`);
    const instans = new alertModel(normolizeUSB);
    instans.save(err => {
        if (err) console.error(`Ошибка записи в базу ри попытки записи в таблицу "Нарушения" \n ${err}`)
    });
};

module.exports = writeToAlertTable;