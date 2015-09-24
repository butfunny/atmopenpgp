"use strict";

var staticConfig = require('./atm-config.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/atm');



require('./src/app.js').startServer(staticConfig);


var addresses = [];
eachLocalAddress(function(addr) {
    addresses.push(addr);
});
console.log("Server ip addresses: " + addresses);

function eachLocalAddress(func) {

    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            func(iface.address);
        });
    });
}


