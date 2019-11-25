const pingModel = require("../schems/pingModel");
const strAnalize = require('./stdoutAnalize.js');
/** @description Обновляет статус хоста в базе
 *  @param {Boolean} status  новый статус
 *  @param {String} ip 
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

module.exports = hostUpdater;