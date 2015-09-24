module.exports = {
    startServer: function(staticConfig){

        var express = require('express');
        var app = express();
        var bodyParser = require('body-parser');

        var open = require('open');
        var http = require('http').Server(app);
        var cookieParser = require('cookie-parser');
        var session = require('express-session');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser());
        app.use(session({secret: 'atm', resave: false, saveUninitialized: false}));


        app.use(express.static(__dirname+ "/public"));


       //openpgp.generateKeyPair(
       //     {
       //         numBits: 1024,
       //         userId: "Jon Smith <jon.smith@example.org>",
       //         passphrase: "123123"
       //     }
       //
       // ).then(function(keypair) {
       //        var privKeys = openpgp.key.readArmored(keypair.privateKeyArmored);
       //        var publicKeys = openpgp.key.readArmored(keypair.publicKeyArmored);
       //        var privKey = privKeys.keys[0];
       //        var pubKey = publicKeys.keys[0];
       //        privKey.decrypt("123123");
       //        var clearSignedArmor = openpgp.signClearMessage(privKey,"Day la chu ky cua anh").then(function (clearSignedArmor) {
       //            console.log(clearSignedArmor);
       //            openpgp.cleartext.readArmored(clearSignedArmor + "123123");
       //            openpgp.verifyClearSignedMessage([pubKey], openpgp.cleartext.readArmored(clearSignedArmor)).then(function(verify) {
       //                console.log(verify);
       //            });
       //        });
       //
       //    }
       //);






        require("./server/controllers.js")(app, staticConfig);

        var port = staticConfig["port"];


        http.listen(port, function () {
            console.log("Server frontend running in port: " + port);
        });


    }
}