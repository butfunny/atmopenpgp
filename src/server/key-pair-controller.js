var Users = require('../common/dao/users-dao');
var KeyPair = require('../common/dao/key-pair-dao');
var openpgp = require('openpgp');
var fs = require('fs');
var LineByLineReader = require('line-by-line');

module.exports = function (router, staticConfig) {

    router.get("/key-pair/:uid", function (req, res) {
        KeyPair.findOne({user_id : req.params.uid}, function (err, key) {
            if (key != null) {
                res.json(key);
            } else {
                res.end();
            }
        })
    });


    router.post("/key-pair/create/:passpharese", function (req, res) {


        openpgp.generateKeyPair({
                 numBits: staticConfig.numBits,
                 userId: req.session.info.name + " <"+ req.session.info.email +">",
                 passphrase: req.params.passpharese
             }
        ).then(function (keyPair) {

                var key = {
                    user_id: req.session.info._id,
                    passphrase: req.params.passpharese,
                    privateKey: req.session.info._id+"_privateKey.txt",
                    publicKey: req.session.info._id+"_publicKey.txt"
                };
                KeyPair.create(key, function (err, keyCreated) {
                    fs.writeFile("./key-user/"+req.session.info._id+"_publicKey.txt", keyPair.publicKeyArmored, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    });

                    fs.writeFile("./key-user/"+req.session.info._id+"_privateKey.txt", keyPair.privateKeyArmored, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    });
                    res.end();
                })
            })

    });


    router.get("/key-pair/publicKey/:uid", function (req, res) {


        fs.readFile('./key-user/'+req.params.uid+'_publicKey.txt','utf8', function (err, data) {
            if (err) throw err;

            res.send(data);
            //var publicKey = openpgp.key.readArmored(data);
            //openpgp.encryptMessage(publicKey.keys, 'Hello, World!').then(function(pgpMessage) {
            //        console.log(pgpMessage);
            //        res.send(pgpMessage);
            //    }).catch(function(error) {
            //        // failure
            //    });
        });

    })


};