const { src, dest, watch} = require("gulp"); //gulp es la de dependencia instalada, requiere es para extraerla
const sass = require("gulp-sass")(require('sass'));
const prlumber = require('gulp-plumber'); //depencencia plumber

function css (done){
    src("src/scss/**/*.scss")            //identificar el archivo de SASS
    .pipe( prlumber())
        .pipe( sass())                  //Compilarlo
            .pipe( dest("build/css"));  //Almacenarlo en el disco duro

    done(); // callback que avisa a gulp cuando llegamos al final
}

function dev(done){
    watch("src/scss/**/*.scss", css)
    done();
}

exports.css = css;
exports.dev = dev;