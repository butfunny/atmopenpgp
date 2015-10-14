var gulp = require('gulp');
var Users = require('../common/dao/users-dao');
var KeyPair = require('../common/dao/key-pair-dao');
var crypto = require('crypto');

gulp.task('install-db', function () {
    var mongoose = require('mongoose');
    var db = mongoose.connect('mongodb://localhost/atm');

    Users.remove({}, function () {
        Users.create([
            {
                email: "butfunny63@gmail.com",
                name: "Cuong Nguyen",
                pass: crypto.createHash('md5').update("123123").digest("hex")
            },
            {
                email: "c@c",
                name: "Cuong Cuong",
                pass: crypto.createHash('md5').update("123123").digest("hex")
            }
        ], function (err, user) {
            KeyPair.remove().exec();
            console.log("Created 2 user");
        })
    });

});