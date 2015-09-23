var Users = require('../common/dao/users-dao');

module.exports = function (router) {
    router.post("/security/login", function (req, res) {

        res.json({
            info: {
                name: "Cường",
                email: req.body.email
            }
        });
    });

    router.post("/security/register", function (req, res) {

        Users.create(req.body, function (err, user) {
            console.log(req.body);
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

    })
};