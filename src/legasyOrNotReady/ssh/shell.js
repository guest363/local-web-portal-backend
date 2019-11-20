
/* const SSHClient = require('ssh2').Client; */
/**
 * @description Shell по SSH
 * @param {Object} msg 
 * @param {String} msg.ip
 * @param {String} msg.password
 * @param {String} msg.cmd
 * @param {*} socket 
 */
/* const sshAPI = (msg, socket) => {
    const { ip, password, cmd } = msg;
    const conn = new SSHClient();
    conn.on('ready', function () {
        socket.emit('sshConnectStage',
            '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
        conn.shell(function (err, stream) {
            if (err)
                return socket.emit('sshOutput',
                    '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
            socket.on('sshCommand', function (data) {
                stream.write(data);
            });
            stream.on('data', function (d) {
                socket.emit('sshOutput', d.toString('binary'));
            }).on('close', function () {
                conn.end();
            });
        });
    }).on('close', function () {
        socket.emit('sshOutput', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
    }).on('error', function (err) {
        socket.emit('sshOutput', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
    }).connect({
        host: ip,
        username: 'root',
        password: password
    });
}

module.exports = sshAPI; */
