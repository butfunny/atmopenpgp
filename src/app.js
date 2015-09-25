module.exports = {
    startServer: function(staticConfig){

        var express = require('express');
        var app = express();
        var bodyParser = require('body-parser');

        var nodemailer = require('nodemailer');
        console.log(staticConfig.email.user);
        console.log(staticConfig.email.pass);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: staticConfig.email.user,
                pass: staticConfig.email.pass
            }
        });


        var open = require('open');
        var http = require('http').Server(app);
        var cookieParser = require('cookie-parser');
        var session = require('express-session');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser());
        app.use(session({secret: 'atm', resave: false, saveUninitialized: false}));


        app.use(express.static(__dirname+ "/public"));

        //var fs = require('fs');
        //fs.readFile('./test.txt','utf8', function (err, data) {
        //    var message = data;
        //    fs.readFile('./key-user/5602a8defee13d6c0de141d3_publicKey.txt','utf8', function (err, pubkey) {
        //        var publicKeys = openpgp.key.readArmored(pubkey);
        //        var pubKey = publicKeys.keys[0];
        //        openpgp.verifyClearSignedMessage([pubKey], openpgp.cleartext.readArmored(message)).then(function(verify) {
        //            console.log(verify);
        //        });
        //    })
        //});

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






        require("./server/controllers.js")(app, staticConfig, transporter);

        var port = staticConfig["port"];


        http.listen(port, function () {
            console.log("Server frontend running in port: " + port);
        });


    }
}