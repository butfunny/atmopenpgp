var gulp = require('gulp');
var inject = require('gulp-inject');

var srcsFE = ['./src/public/angular/**/*.js', './src/public/assets/**/*.css'];

gulp.task('inject-index', function () {
    var injectFrontend = function() {

        var target = gulp.src('./src/public/index.html');
        var sources = gulp.src(srcsFE, {read: false});

        return target.pipe(inject(sources, {ignorePath: "/src/public/"}))
            .pipe(gulp.dest('./src/public'));
    };


    injectFrontend();

    gulp.watch(srcsFE, injectFrontend);
});
