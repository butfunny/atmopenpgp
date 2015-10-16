var fs = require('fs');
var openpgp = require('openpgp');
var multer = require('multer');

module.exports = function (router, staticConfig, transporter) {

    router.post("/ma-hoa",
        multer({
            dest: "./"
        }).single("file")

        , function (req, res) {

        var publicKey;

        fs.readFile('./key-user/'+req.body.user_revice_id+'_publicKey.csr','utf8', function (err, data) {
            if (err) throw err;
            publicKey =  openpgp.key.readArmored(data);
            openpgp.encryptMessage(publicKey.keys, req.body.text).then(function(pgpMessage) {

                fs.readFile("./" + req.file.filename, 'utf8', function (err, privateKey) {
                    var privKeys = openpgp.key.readArmored(privateKey);
                    privKeys.keys[0].decrypt(req.body.passpharese);
                    fs.unlinkSync("./" + req.file.filename);

                    openpgp.signClearMessage(privKeys.keys[0],"Chữ ký được tạo bởi: " + req.session.info.email).then(function (clearSignedArmor) {
                        var mailOptions = {
                            to : req.body.user_revice_email,
                            subject: '',
                            text: 'This message sended by '+req.session.info.name + '(' + req.session.info.email + ')\n ' + pgpMessage + clearSignedArmor
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                res.json({error: error});
                            }else{
                                res.send({sucess: true});
                            }
                        });
                    });
                });

            }).catch(function(error) {
                if (error) {
                    res.json({error: error});
                }
            });

        });

    });

    router.post("/ma-hoa/save-public-key-recived",
        multer({
            dest: "./"

        }).single("file"),

        function (req, res) {
            if (req.file) {
                res.send(req.file.filename);
            }
        });


    router.post("/ma-hoa/ngoai-he-thong",
        multer({
            dest: "./"
        }).single("file"),

        function (req, res) {
            var publicKey;

            fs.readFile('./' + req.body.filename, 'utf8', function (err, data) {
                    fs.unlinkSync('./' + req.body.filename);
                    if (err) throw err;
                    publicKey = openpgp.key.readArmored(data);
                    openpgp.encryptMessage(publicKey.keys, req.body.text).then(function (pgpMessage) {

                        fs.readFile("./" + req.file.filename, 'utf8', function (err, privateKey) {
                            var privKeys = openpgp.key.readArmored(privateKey);
                            privKeys.keys[0].decrypt(req.body.passpharese);
                            fs.unlinkSync("./" + req.file.filename);

                            openpgp.signClearMessage(privKeys.keys[0], "Chữ ký được tạo bởi: " + req.session.info.email).then(function (clearSignedArmor) {
                                var mailOptions = {
                                    to: req.body.user_revice_email,
                                    subject: '',
                                    text: 'This message sended by ' + req.session.info.name + '(' + req.session.info.email + ') \n ' + pgpMessage + clearSignedArmor
                                };

                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        res.json({error: error});
                                    } else {
                                        res.send({sucess: true});
                                    }
                                });
                            });
                        });

                    }).catch(function (error) {
                        if (error) {
                            res.json({error: error});
                        }
                    });
                }
            )
        });
};