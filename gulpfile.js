var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port: 8081
  });
});

gulp.task('allfiles', function () {
  gulp.src(['**/*', '!node_modules/**'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['**/*', '!node_modules/**'], ['allfiles']);
});

gulp.task('serve', ['connect', 'watch']);
