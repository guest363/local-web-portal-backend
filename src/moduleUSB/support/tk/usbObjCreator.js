const usbObjCreator = usb => {
    return {
        'mountTime': new Date().toLocaleString("ru"),
        'hostid': usb.hostid,
        'hostidSave': usb.hostid,
        'product': usb.product,
        'manufacture': usb.manufacture,
        'serial': usb.serial,
        'USBnameSave': usb.serial,
        'username': usb.username.substr(0, 30),
        'regNumber': 'Внесите регистрационный номер',
        'docNumber': 'Внесите номер предписания'
    }
};

module.exports = usbObjCreator;