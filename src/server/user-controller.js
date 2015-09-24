var Users = require('../common/dao/users-dao');

module.exports = function (router) {
    router.post("/security/login", function (req, res) {

        Users.findOne({email : req.body.email, pass: req.body.pass},"email name", function (err, user) {
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
        Users.find({}, "email name",function (err, users) {
            res.json(users);
        })
    })
};