const ping = require('./nativePing');
const pingModel = require("../schems/pingHosts");

/** @description Для всех хостов в базе выполняет обновление статуса
 */
const makePing = () => {
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

makePing().then(res => console.log(res));
setInterval(() => {
    makePing().then(res => console.log(res));
}, 180000);