const exec = require('child_process').exec;
const hostUpdater = require('./dbHostUpdate');
/** @description Выполняет нативный пинг Windows системы 2 раза с таймаутом в 500 мс
 * @param {String} ip 
 */
const ping = ip => {
    return new Promise((resolve, reject) => {
        /* { windowsHide: true } чтобы не плодить окна терминалов при пинге */
        exec(`ping -n 2 -w 500 ${ip}`,
            { windowsHide: true },
            (error, stdout, stderr) => hostUpdater(stdout, ip, resolve))
    });
};

module.exports = ping;