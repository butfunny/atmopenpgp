

module.exports = function (router) {
    router.post("/security/login", function (req, res) {

        res.json({
            info: {
                name: "Cường",
                email: req.body.email
            }
        });
    })
};