const enjectUSB = async (mountModel, msg, io, res) => {
    console.log(`---===== Enject USB ====---- \n ${JSON.stringify(msg)}`);
    await mountModel.findOneAndDelete({ 'USBnameSave': msg.serial });
    res.send(`true`);
    io.emit('INJECTING_USB', msg);
};

module.exports = enjectUSB;