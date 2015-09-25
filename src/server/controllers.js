var express = require("express");

var router = express.Router();


module.exports = function (app, staticConfig, transporter) {
    app.use("/api", router);


    require("./user-controller")(router);
    require("./key-pair-controller")(router, staticConfig);
    require("./ma-hoa-controller")(router, staticConfig, transporter);
    require("./giai-ma-controller")(router);



};