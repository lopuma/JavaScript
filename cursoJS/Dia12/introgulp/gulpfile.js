// Primero importamos
const { src, dest, watch } = require("gulp");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');


// Ahora creamos las tareas...
function hola(cb){
    console.log("hola");
    cb();
}

function js(cb){
    src('./work/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify().on('error', function(e){console.log(e);}))
        .pipe(dest('./dist/'));
        cb();
};
function css(cb) {
    src('./work/*.css')
        .pipe(concat({ path: 'app.css', stat: { mode: 0666 }}))
        .pipe(uglifycss({ "uglyComments": true}))
        .pipe(dest('./dist/'))
        cb();
};
function vigila(cb) {
    watch('./work/*.js', js);
    watch('./work/*.css', css);
}

exports.hola = hola;
exports.js = js;
exports.css = css;
exports.vigila = vigila;

