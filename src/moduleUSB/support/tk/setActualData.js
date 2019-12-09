/**
     * @description Для вновь примонтированных выставляет правельные,
     * взятые из уже внесенных, значения для:
     * Регистрационного номера
     * Имени хоста
     * Названию устройства
     * Так как данные значения виртуальны и не передаются фактически при
     * монтировании
     * @param {Link} whiteDb - ссылка на базу с белым списком, как хранилище истины для данных USB
     * @param {Object} usb - обьект USB для записи в базу
     * @param {Object} query - запрос для поиска по серийному номеру
     * @returns {Object} возвращает новый нормализованный обьект
     */
const setActualData = async (whiteDb, usb, query) => {
    const usbCopy = Object.assign({}, usb);
    try {
        const result = await whiteDb.find(query);
        if (result.length !== 0) {
            usbCopy.regNumber = result[0].regNumber;
            usbCopy.docNumber = result[0].docNumber;
            usbCopy.serial = result[0].serial;
            usbCopy.hostid = result[0].hostid;
        }
    } catch (error) {
        console.error(`Ошибка доступа в базу при нормализации USB \n ${err}`);
    }
    return usbCopy;
};

module.exports = setActualData;