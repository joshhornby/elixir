var gulp = require('gulp');
var _ = require('underscore');
var elixir = require('laravel-elixir');
var config = elixir.config;
var rev = require('gulp-rev');
var del = require('del');

/*
 |----------------------------------------------------------------
 | Versioning / Cache Busting
 |----------------------------------------------------------------
 |
 | This task will append a small hash on the end of your file
 | and generate a manifest file which contains the current
 | "version" of the filename for the application to use.
 |
 */

elixir.extend('version', function(src, buildDir) {

    src = this.prefixDirToFiles('public', src);
    buildDir = buildDir || 'public/build';

    gulp.task('version', function() {
        del(buildDir + '/*', { force: true }, function() {
            return gulp.src(src, { base: './public' })
                .pipe(gulp.dest(buildDir))
                .pipe(rev())
                .pipe(gulp.dest(buildDir))
                .pipe(rev.manifest())
                .pipe(gulp.dest(buildDir));
        });
    });

    this.registerWatcher('version', src);

    return this.queueTask('version');

});