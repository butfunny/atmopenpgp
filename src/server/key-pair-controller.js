var Users = require('../common/dao/users-dao');
var KeyPair = require('../common/dao/key-pair-dao');
var openpgp = require('openpgp');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var mime = require('mime');


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

                var privKeys = openpgp.key.readArmored(keyPair.privateKeyArmored);
                privKeys.keys[0].decrypt(req.params.passpharese);

                openpgp.signClearMessage(privKeys.keys[0],"Sign by: " + req.session.info.name + " <"+ req.session.info.email +">").then(function (clearSignedArmor) {

                    fs.writeFile("./key-user/"+req.session.info._id+"_signKey.txt",clearSignedArmor, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    });

                    var key = {
                        user_id: req.session.info._id,
                        passphrase: crypto.createHash('md5').update(req.params.passpharese).digest("hex"),
                        publicKey: req.session.info._id+"_publicKey.txt"
                    };
                    KeyPair.create(key, function (err, keyCreated) {
                        fs.writeFile("./key-user/"+req.session.info._id+"_publicKey.csr", keyPair.publicKeyArmored, function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        });

                        fs.writeFile("./key-user/"+req.session.info._id+"_privateKey.key", keyPair.privateKeyArmored, function(err) {
                            var file = __dirname + "../../../key-user/"+req.session.info._id+"_privateKey.key";
                            res.download(file,req.session.info._id+"_privateKey.key" );

                        });

                    })
                });


            })

    });


    router.get("/key-pair/publicKey/:uid", function (req, res) {


        fs.readFile('./key-user/'+req.params.uid+'_publicKey.txt','utf8', function (err, data) {
            if (err) throw err;
            res.json({publicKey: data});

        });

    });


    router.get("/key-pair/privateKey/:passphrase", function (req, res) {

        KeyPair.findOne({user_id : req.session.info._id, passphrase: req.params.passphrase}, function (err, key) {
            if (key != null) {
                fs.readFile('./key-user/'+req.session.info._id+'_privateKey.txt','utf8', function (err, data) {
                    if (err) throw err;
                    res.json({privateKey: data});
                });
            } else {
                res.json({error: true});
            }
        });

    })


};