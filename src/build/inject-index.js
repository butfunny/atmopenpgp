var gulp = require('gulp');
var inject = require('gulp-inject');

var src = ['./src/public/angular/**/*.js', './src/public/assets/**/*.css'];

gulp.task('inject-index', function () {
    var injectFrontend = function() {

        var target = gulp.src('./src/public/index.html');
        var sources = gulp.src(src, {read: false});

        return target.pipe(inject(sources, {ignorePath: "/src/public/"}))
            .pipe(gulp.dest('./src/public'));
    };


    injectFrontend();

    gulp.watch(src, injectFrontend);
});
