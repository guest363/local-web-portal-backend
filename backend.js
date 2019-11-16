var forever = require('forever-monitor');

var child = new (forever.Monitor)('./src/express.js', {
    max: 3,
    silent: true,
    args: [],
    logFile: './logs/log',
    outFile: './logs/out',
    errFile: './logs/err'
});

child.on('watch:restart', function (info) {
    console.error('Restarting script because ' + info.file + ' changed');
});

child.on('restart', function () {
    console.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function (code) {
    console.log('express.js has exited after 3 restarts');
    child.stop();
});

process.on('SIGINT', function () {
    console.log('forever stop!');
    child.stop();
    process.exit(0);
});
process.on('SIGTERM', function () {
    console.log('forever stop!');
    child.stop();
    process.exit(0);
});
child.start();
