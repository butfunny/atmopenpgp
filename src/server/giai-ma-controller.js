var fs = require('fs');
var openpgp = require('openpgp');
var KeyPair = require('../common/dao/key-pair-dao');
var multer = require('multer');
module.exports = function (router) {

    router.post("/giai-ma/trong-he-thong/sign", function (req, res) {

        fs.readFile('./key-user/'+req.body.user_recive_id+'_publicKey.csr','utf8', function (err, pubkey) {
            var publicKeys = openpgp.key.readArmored(pubkey);
            var pubKey = publicKeys.keys[0];
            openpgp.verifyClearSignedMessage([pubKey], openpgp.cleartext.readArmored(req.body.text)).then(function(verify) {
                res.send(verify);
            });
        })

    });

    router.post("/giai-ma/ngoai-he-thong/sign",
        multer({
            dest: "./"
        }).single("file"),

        function (req, res) {

        fs.readFile('./'+req.file.filename,'utf8', function (err, pubkey) {
            fs.unlinkSync('./'+req.file.filename);
            var publicKeys = openpgp.key.readArmored(pubkey);
            var pubKey = publicKeys.keys[0];
            openpgp.verifyClearSignedMessage([pubKey], openpgp.cleartext.readArmored(req.body.text)).then(function(verify) {
                res.send(verify);
            });
        })

    });


    router.post("/giai-ma/trong-he-thong/message",

        multer({
            dest: "./"
        }).single("file"),

        function (req, res) {

        fs.readFile('./'+req.file.filename,'utf8', function (err, key) {
            fs.unlinkSync('./'+req.file.filename);
            var key = key;
            var privateKey = openpgp.key.readArmored(key).keys[0];
            privateKey.decrypt(req.body.passphrase);

            var pgpMessage = req.body.pgpMessage;
            pgpMessage = openpgp.message.readArmored(pgpMessage);

            openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) {
                res.send(plaintext);
            }).catch(function(error) {
                res.send(error)
            });
        });



    })
};