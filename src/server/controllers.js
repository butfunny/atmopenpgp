var express = require("express");

var router = express.Router();


module.exports = function (app, staticConfig) {
    app.use("/api", router);


    require("./user-controller")(router);
    require("./key-pair-controller")(router, staticConfig);
    require("./ma-hoa-controller")(router);



};