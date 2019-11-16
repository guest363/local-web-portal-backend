
const SSHClient = require('ssh2').Client;

/**
 * @description Выводит сообщение и выключает тонкий клиент
 * @param {String} ip адрес хоста который нужно отключить
 */
const font = `-misc-fixed-medium-r-normal--70-0-75-75-c-0-koi8-r`;
const msg = `'Narushenie politiki \n   bezopasnosti!'`;
const xMconfig = `-fg white -bg red -geometry 800x800 -display :0`;
const xmessage = `xmessage ${xMconfig} -font ${font} ${msg}`;
/* const cmd = `${xmessage} || sleep 10 | shutdown -P now`; */
const cmd = xmessage;


const shutdown = ip => {
    const conn = new SSHClient();
    conn.on('ready', function () {
        console.log('SSH Connect!')
        conn.exec(cmd, function (err, stream) {
            if (err) throw err;
            conn.end();
        });
    }).on('close', function () {
        console.log('sshOutput', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
    }).on('error', function (err) {
        console.log('sshOutput', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
    }).connect({
        /* host: ip, */
        host: '192.168.0.106',
        username: 'root',
        password: 'Qp0Hp2'
    });
}
shutdown()
module.exports = shutdown;
