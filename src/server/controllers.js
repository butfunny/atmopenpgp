var express = require("express");

var router = express.Router();
var mongoose = require('mongoose');


module.exports = function (app, staticConfig) {
    app.use("/api", router);


    require("./user-controller")(router);



};