const usbObjCreator = usb => {
    const username = (!usb.username) ? '' : usb.username.substr(0, 30);

    return {
        'mountTime': new Date().toLocaleString("ru"),
        'hostid': usb.hostid,
        'hostidSave': usb.hostid,
        'product': usb.product,
        'manufacture': usb.manufacture,
        'serial': usb.serial,
        'USBnameSave': usb.serial,
        'username': username,
        'regNumber': 'Внесите регистрационный номер',
        'docNumber': 'Внесите номер предписания'
    }
};

module.exports = usbObjCreator;