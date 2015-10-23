var Users = require('../common/dao/users-dao');
var KeyPair = require('../common/dao/key-pair-dao');
var crypto = require('crypto');

module.exports = function (router, transporter) {
    router.post("/security/login", function (req, res) {

        Users.findOne({email : req.body.email, pass: crypto.createHash('md5').update(req.body.pass).digest("hex")},"email name active", function (err, user) {
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
        var activeCode = Math.floor(Math.random() * 400) + 100;
        var mailOptions = {
            to : req.body.email,
            subject: 'Kích hoạt tài khoản',
            html: 'Mã kích hoạt tài khoản của bạn là: <b> ' + activeCode + "</b>"
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json({error: error});
            }

            req.body.active = activeCode;

            Users.create(req.body, function (err, user) {
                req.session.info = user;
                req.session.save();
                res.json(user);
            })
        });


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

            Users.find({_id: { $in: ids }, active: "true"}, "email name",function (err, users) {
                res.json(users);
            })
        });


    });


    router.post("/user/active-user/:activecode", function (req, res) {
        Users.findOne({_id: req.session.info._id, active: req.params.activecode}, function (err, user) {
            if (user != null) {
                Users.findOneAndUpdate({_id: req.session.info._id, active: req.params.activecode}, {active: "true"}, function () {
                    req.session.info.active = "true";
                    res.json(true);
                });
            } else {
                res.json(false);
            }
        })
    });

    router.get("/user/resend-active", function (req ,res) {
        var activeCode = Math.floor(Math.random() * 400) + 100;
        var mailOptions = {
            to : req.session.info.email,
            subject: 'Kích hoạt tài khoản',
            html: 'Mã kích hoạt tài khoản của bạn là: <b> ' + activeCode + "</b>"
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json({error: error});
            }


            Users.findOneAndUpdate({_id : req.session.info._id},{active: activeCode}, function (err, user) {
                res.end();
            })
        });
    })
};
