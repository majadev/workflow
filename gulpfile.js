var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var SRCPATHS = {
    sassSource : 'src/scss/*.scss',
    htmlSource : 'src/*.html'
}
var APPPATH = {
    root : 'app/',
    css : 'app/css',
    js : 'app/js'
}

gulp.task('sass', function(){
    return gulp.src(SRCPATHS.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css))
        //important that the pipes are in the correct order
});

gulp.task('copy', function() {
    gulp.src(SRCPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root))
})

gulp.task('serve', ['sass'], function() {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir : APPPATH.root
        }
    })
});

gulp.task('watch', ['serve', 'sass', 'copy'], function() {
    gulp.watch([SRCPATHS.sassSource], ['sass']);
    gulp.watch([SRCPATHS.htmlSource], ['copy']);
})

gulp.task('default', ['watch']);