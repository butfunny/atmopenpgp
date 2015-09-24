var fs = require('fs');


module.exports = function (router) {

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
                fs.writeFile("./test.txt", message, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    res.end();
                });

            });

        });





    })
};