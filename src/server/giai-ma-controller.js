var fs = require('fs');
var openpgp = require('openpgp');
var KeyPair = require('../common/dao/key-pair-dao');
var StringDecoder = require('string_decoder').StringDecoder;

module.exports = function (router) {

    router.post("/giai-ma/sign", function (req, res) {

        fs.readFile('./key-user/'+req.body.sender_id+'_publicKey.txt','utf8', function (err, pubkey) {
            var publicKeys = openpgp.key.readArmored(pubkey);
            var pubKey = publicKeys.keys[0];
            openpgp.verifyClearSignedMessage([pubKey], openpgp.cleartext.readArmored(req.body.signMessage)).then(function(verify) {
                res.send(verify);
            });
        })

    });


    router.post("/giai-ma/message", function (req, res) {

        fs.readFile('./key-user/'+req.session.info._id+'_privateKey.txt','utf8', function (err, key) {
            var key = key;
            var privateKey = openpgp.key.readArmored(key).keys[0];
            privateKey.decrypt(req.body.passphrase);

            var pgpMessage = req.body.pgpMessage;
            pgpMessage = openpgp.message.readArmored(pgpMessage);

            openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) {
                res.json({message: plaintext});
            }).catch(function(error) {
                // failure
            });
        });



    })
};