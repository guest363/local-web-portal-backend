var forever = require('forever-monitor');

const express = new (forever.Monitor)('./src/express.js', {
    max: 3,
    silent: true,
    args: [],
    logFile: './logs/express-log',
    outFile: './logs/express-out',
    errFile: './logs/express-err'
});

const ping = new (forever.Monitor)('./src/moduleMonitoring/nativPing/ping.js', {
    max: 3,
    silent: true,
    args: [],
    logFile: './logs/ping-log',
    outFile: './logs/ping-out',
    errFile: './logs/ping-err'
});

const foreverActionsDefault = name => {
    name.on('watch:restart', function (info) {
        console.error('Restarting script because ' + info.file + ' changed');
    });

    name.on('restart', function () {
        console.error('Forever restarting script for ' + express.times + ' time');
    });

    name.on('exit:code', function (code) {
        console.log(`express.js has exited after 3 restarts the code: ${code}`);
        name.stop();
    });
};
const processStop = () => {
    console.log('forever stop!');
    express.stop();
    ping.stop();
    process.exit(0);
};
foreverActionsDefault(express);
foreverActionsDefault(ping);

process.on('SIGINT', function () {
    processStop();
});
process.on('SIGTERM', function () {
    processStop();
});
express.start();
ping.start();
