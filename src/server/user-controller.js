var Users = require('../common/dao/users-dao');
var KeyPair = require('../common/dao/key-pair-dao');
var crypto = require('crypto');

module.exports = function (router) {
    router.post("/security/login", function (req, res) {

        Users.findOne({email : req.body.email, pass: crypto.createHash('md5').update(req.body.pass).digest("hex")},"email name", function (err, user) {
            if (user != null) {
                req.session.info = user;
                req.session.save();
                res.json(user);
            } else {
                res.end();
            }
        })

    });

    router.get("/security/account", function (req, res) {
       if (req.session.info) {
           res.json(req.session.info);
       } else {
           res.end();
       }
    });

    router.post("/security/register", function (req, res) {
        req.body.pass = crypto.createHash('md5').update(req.body.pass).digest("hex");
        Users.create(req.body, function (err, user) {
            res.json(user);
        })
    });


    router.post("/security/check-email-available/:email", function (req, res) {

        Users.find({email: req.params.email}, function (err, user) {
            if(user.length > 0) {
                res.json({value: false});
            } else {
                res.json({value: true});
            }
        })

    });

    router.post("/security/logout", function (req, res) {
        req.session.destroy();
        res.end();
    });


    router.get("/user/all-user", function (req, res) {
        KeyPair.find({}, function (err, users_in_key) {
            var ids = [];
            for (var i = 0; i < users_in_key.length; i++) {
                var user = users_in_key[i];
                ids.push(user.user_id);
            }

            Users.find({_id: { $in: ids }}, "email name",function (err, users) {
                res.json(users);
            })
        });


    })
};
