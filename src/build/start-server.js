var gulp = require('gulp');
var open = require('open');

var nodemon = require('gulp-nodemon');
gulp.task('start-server', function () {
    nodemon({
        script: 'app-atm.js',
        ext: 'js',
        "ignore": [
            ".idea/",
            ".git/",
            "build/",
            "doc/",
            "node_modules/",
            "src/public",
            "src/common/public"
        ],
        env: { 'NODE_ENV': 'development' }
    });

    open("http://localhost:2000");
});