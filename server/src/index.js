const mb = require('mountebank');
const settings = require('./settings');
const helloService = require('./service/hello-service');
const userSerVice = require('./service/user/user-service');

const mbServerInstance = mb.create({
    port: settings.port,
    pidfile: '../mb.pid',
    logfile: '../mb.log',
    protofile: '../protofile.json',
    ipWhitelist: ['*'],
    "allowInjection": false,
    "mock": true,
    "debug": true,
    "log": {
        "level": "info",
        "transports": {
            "console": {
                "colorize": true,
                "format": "%level: %message"
            },
            "file": {
                "path": "mb.log",
                "format": "json"
            }
        }
    }

});

mbServerInstance.then(function() {
    helloService.addService();
});

mbServerInstance.then(function() {
    userSerVice.login();
});