var fs = require('fs');


module.exports = function (router, staticConfig, transporter) {

    router.post("/ma-hoa", function (req, res) {

        var publicKey;
        var signOfUser;

        fs.readFile('./key-user/'+req.body.user_revice_id+'_publicKey.txt','utf8', function (err, data) {
            if (err) throw err;
            publicKey =  data;
            fs.readFile('./key-user/'+req.session.info._id+'_signKey.txt','utf8', function (err, data) {
                if (err) throw err;
                signOfUser =  data;
                var message = signOfUser.concat(publicKey);

                var mailOptions = {
                    from: req.session.info.email ,
                    to : "shi.iluka94@gmail.com", // list of receivers
                    subject: '', // Subject line
                    html: '<b>This message sended by '+req.session.info.name + '(' + req.session.info.email + ') </b> <p>' + signOfUser + '</p> <br>' + publicKey // html body
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        res.send('Message sent: ' + info.response);
                    }
                });

            });

        });





    })
};