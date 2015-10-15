var fs = require('fs');
var openpgp = require('openpgp');

module.exports = function (router, staticConfig, transporter) {

    router.post("/ma-hoa", function (req, res) {

        var publicKey;
        var signOfUser;

        fs.readFile('./key-user/'+req.body.user_revice_id+'_publicKey.txt','utf8', function (err, data) {
            if (err) throw err;
            publicKey =  openpgp.key.readArmored(data);
            openpgp.encryptMessage(publicKey.keys, req.body.text).then(function(pgpMessage) {

                fs.readFile('./key-user/'+req.session.info._id+'_signKey.txt','utf8', function (err, data) {
                    if (err) throw err;
                    signOfUser =  data;

                    var mailOptions = {
                        from: req.session.info.email ,
                        to : req.body.user_revice_email,
                        subject: '',
                        text: 'This message sended by '+req.session.info.name + '(' + req.session.info.email + ') ' + signOfUser + pgpMessage
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }else{
                            res.send('Message sent: ' + info.response);
                        }
                    });

                });
            }).catch(function(error) {
                // failure
            });


        });





    })
};