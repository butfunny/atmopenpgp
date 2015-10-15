var gulp = require('gulp');
var Users = require('../common/dao/users-dao');
var KeyPair = require('../common/dao/key-pair-dao');
var crypto = require('crypto');

gulp.task('install-db', function () {
    var mongoose = require('mongoose');
    var db = mongoose.connect('mongodb://localhost/atm');

    var data = [
        {
            email: "butfunny63@gmail.com",
            name: "Cuong Nguyen",
            pass: crypto.createHash('md5').update("123123").digest("hex")
        },
        {
            email: "c@c",
            name: "Cuong Cuong",
            pass: crypto.createHash('md5').update("123123").digest("hex")
        },
        {
            email: "shi.iluka94@gmail.com",
            name: "Nguyễn Mạnh Cường",
            pass: crypto.createHash('md5').update("123123").digest("hex")
        }

    ];

    Users.remove({}, function () {
        Users.create(data, function (err, user) {
            KeyPair.remove().exec();
            console.log("Created" +data.length + " user");
            db.connection.close();
        })
    });

});