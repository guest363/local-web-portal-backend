/* Нативный PING */
const exec = require('child_process').exec;
const pingModel = require("./schems/pingHosts.js");
/** @description регулярное выражение для поиска подстроки
 */
/* const findReceived = /Received = \d/; */
const findReceived = /����祭� = \d/; // Для плохой кодировки русского

/** @description Анализирует STDOUT пинга вычленяя колличество удачных пингов
 * @param error 
 * @param stdout вывод от ping
 * @param stderr
 * @returns булевое значение включен ли компьютер
 */
const strAnalize = stdout => {
    let received, isOn = false;
    try {
        received = findReceived.exec(stdout)[0];
        isOn = (/\d/.exec(received)[0] > 0) ? true : false;
    } catch (error) {
        console.log(`Ping ERROR = ${error}`)
    }
    return isOn;
};


/** @description Обновляет статус хоста в базе
 * @param {Boolean} status  новый статус
 * @param {String} ip 
 */
const hostUpdater = (status, ip, resolve) => {
    const query = {
        ip: ip
    };
    const newStatus = {
        online: strAnalize(status)
    };

    pingModel.findOneAndUpdate(query, newStatus, {
        new: true,
        upset: true
    }).then(res => {
        resolve(res)
    });
};


/** @description Выполняет нативный пинг системы 2 раза с таймаутом в 500 мс
 * @param {String} ip 
 */
const ping = ip => {
    return new Promise((resolve, reject) => {
        /* { windowsHide: true } чтобы не плодить окна терминалов при пинге */
        exec(`ping -n 2 -w 500 ${ip}`, { windowsHide: true }, (error, stdout, stderr) => hostUpdater(stdout, ip, resolve))

    });
};

/** @description Для всех хостов в базе выполняет обновление статуса
 */
function makePing() {
    return new Promise((resolve, reject) => {
        pingModel.find({
            isControling: true
        }, function (err, pingList) {
            const promiseArray = pingList.map(host => {
                return ping(host.ip);
            });
            /* Завершить процесс когда все промисы разрешаться */
            Promise.all(promiseArray).then(res => {
                /* Если запускать как отдельный процесс ноды */
                /*  console.log(`Regular PING ${new Date(Date.now()).toLocaleDateString("ru")}`); */
                /* process.exit(`Regular PING ${new Date(Date.now()).toLocaleDateString("ru")}`); */
                resolve(`Очередной пинг ${new Date(Date.now()).toLocaleDateString("ru")}`)
            })
        });
    });
};
/* makePing(); */

module.exports = makePing;