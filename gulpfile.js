const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const path = require('path');
const del = require('del')
const nodemon = require('gulp-nodemon');

gulp.task('typescript', () => {
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
});

gulp.task('clean', () => {
    return del(['dist/**', '!dist'])
});

gulp.task('nodemon', (done) => { 
    nodemon({
        script: path.join('dist', 'index.js'),
        ext: 'ts',
        ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
        tasks: [
            'typescript'
        ]
    });
});

gulp.task('serve', gulp.series('clean', 'typescript', 'nodemon', (done) => {
    done();
}));

gulp.task('default', gulp.series('clean', 'typescript', (done) => {
    done();
}));

