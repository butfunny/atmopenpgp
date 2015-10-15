var Users = require('../common/dao/users-dao');
var KeyPairDao = require('../common/dao/key-pair-dao');
var openpgp = require('openpgp');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var mime = require('mime');


module.exports = function (router, staticConfig) {

    router.get("/key-pair/:uid", function (req, res) {
        KeyPairDao.findOne({user_id : req.params.uid}, function (err, key) {
            if (key != null) {
                res.json(key);
            } else {
                res.end();
            }
        })
    });


    router.get("/key-pair/passphrase/:pass", function (req, res) {
        KeyPairDao.findOne({user_id: req.session.info._id, passphrase: crypto.createHash('md5').update(req.params.pass).digest("hex")}, function (err, key){
            if (key) {
                res.json({error: false});
            } else {
                res.json({error: true});
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
                    passphrase: crypto.createHash('md5').update(req.params.passpharese).digest("hex"),
                    created: true
                };
                KeyPairDao.create(key, function (err, keyCreated) {
                    fs.writeFile("./key-user/"+req.session.info._id+"_publicKey.csr", keyPair.publicKeyArmored, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    });

                    fs.writeFile("./key-user/"+req.session.info._id+"_privateKey.key", keyPair.privateKeyArmored, function(err) {
                        var file = __dirname + "../../../key-user/"+req.session.info._id+"_privateKey.key";
                        res.download(file,req.session.info._id+"_privateKey.key", function () {
                            fs.unlinkSync(file);
                        } );

                    });

                });





            })

    });


    router.get("/key-pair/publicKey/:uid", function (req, res) {
        var file = __dirname + "../../../key-user/"+req.params.uid+"_publicKey.csr";
        res.download(file,req.session.info._id+"_privateKey.csr");

    });

};