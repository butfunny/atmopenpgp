var fs = require('fs');
var openpgp = require('openpgp');
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

    })
};