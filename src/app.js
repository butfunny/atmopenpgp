module.exports = {
    startServer: function(staticConfig){

        var express = require('express');
        var app = express();
        var bodyParser = require('body-parser');

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: staticConfig.email.user,
                pass: staticConfig.email.pass
            }
        });


        var open = require('open');
        var http = require('http').Server(app);
        var cookieParser = require('cookie-parser');
        var session = require('express-session');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser());
        app.use(session({secret: 'atm', resave: false, saveUninitialized: false}));


        app.use(express.static(__dirname+ "/public"));
        app.use(express.static(__dirname+ "/../key-user"));



        require("./server/controllers.js")(app, staticConfig, transporter);

        var port = staticConfig["port"];


        http.listen(port, function () {
            console.log("Server frontend running in port: " + port);
        });


    }
}