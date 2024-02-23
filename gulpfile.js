const { src, dest, watch, parallel} = require("gulp"); //gulp es la de dependencia instalada, requiere es para extraerla

//CSS
const sass = require("gulp-sass")(require('sass'));
const prlumber = require('gulp-plumber'); //depencencia plumber

function css (done){
    src("src/scss/**/*.scss")            //identificar el archivo de SASS
    .pipe( prlumber())
        .pipe( sass())                  //Compilarlo
            .pipe( dest("build/css"));  //Almacenarlo en el disco duro

    done(); // callback que avisa a gulp cuando llegamos al final
}


//IMAGENES
async function versionWebp(done) {
 
    const webp = await import("gulp-webp"); // Manda a traer la dependencia instalada con "npm install --save-dev gulp-webp" desde la terminal" 
    const opciones = {
        quality: 50 // Esto define que tanta calidad se le bajarán a las imágenes
    }
    src('src/img/**/*.{png,PNG,jpg,JPG}') // Busca recursivamente en todos los archivos y carpetas de la carpeta img con los formatos especificados
        .pipe(webp.default(opciones)) // Los convierte en formato WEBP y les baja la calidad especificada
        .pipe(dest('build/img')) // Los guarda en una nueva carpeta
    
    done(); // Callback que avisa a gulp cuando llegamos al final de la ejecución del script
}



//ALIGERAR IMAGENES
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,PNG,jpg,JPG}')
    .pipe( cache( imagemin(opciones) ))
        .pipe( dest('build/img'))
    done();
}

//IMAGENES AVI
const avif = require('gulp-avif');
function versionAvif( done){
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe( avif(opciones))
        .pipe( dest('/build/img'))
    done()
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe( dest('build/js'))

    done()
}


function dev(done){
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javascript)
    done();
}

exports.css = css;
exports.JS = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes,versionWebp,versionAvif, javascript, dev);