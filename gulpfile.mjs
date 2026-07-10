import gulp from 'gulp';
import sharp from 'sharp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import filter from 'gulp-filter';
import path from 'path';
import { Transform } from 'stream';
import del from 'del';

const sass = gulpSass(dartSass);
const cssSourceGlob = './assets/sass/**/*.scss';
const cssOutputDir = './assets/css';
const imageSourceGlob = './images/*.{jpg,jpeg,png,gif,webp}';
const fullsOutputDir = './images/fulls';
const thumbsOutputDir = './images/thumbs';
const generatedCssFiles = [
    `${cssOutputDir}/custom.min.css`,
    `${cssOutputDir}/main.min.css`,
    `${cssOutputDir}/noscript.min.css`
];

gulp.task('delete', function () {
    return del([
        `${fullsOutputDir}/*.{jpg,jpeg,png,gif,webp}`,
        `${thumbsOutputDir}/*.{jpg,jpeg,png,gif,webp}`
    ]);
});

function resizeTransform(width) {
    return new Transform({
        objectMode: true,
        transform(file, encoding, callback) {
            if (file.isNull()) {
                callback(null, file);
                return;
            }

            if (file.isStream()) {
                callback(new Error('Streaming input is not supported for image resizing.'));
                return;
            }

            sharp(file.contents)
                .resize({
                    width,
                    withoutEnlargement: true
                })
                .toBuffer()
                .then((buffer) => {
                    file.contents = buffer;
                    callback(null, file);
                })
                .catch(callback);
        }
    });
}

gulp.task('resize-fulls', function () {
    return gulp.src(imageSourceGlob)
        .pipe(resizeTransform(1024))
        .pipe(gulp.dest(fullsOutputDir));
});

gulp.task('resize-thumbs', function () {
    return gulp.src(imageSourceGlob)
        .pipe(resizeTransform(512))
        .pipe(gulp.dest(thumbsOutputDir));
});

gulp.task('resize-images', gulp.parallel('resize-fulls', 'resize-thumbs'));

// clear previously generated css
gulp.task('clean-css', function () {
    return del(generatedCssFiles);
});

// compile scss to css
gulp.task('sass', gulp.series('clean-css', function compileSass() {
    return gulp.src(cssSourceGlob)  // Target all .scss files
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename(function (path) {
            path.basename += '.min';  // Append .min to the output filename
        }))
        .pipe(gulp.dest(cssOutputDir));  // Output to the CSS directory
}));

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('sass'));
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./assets/js/**/*.js')
        .pipe(filter(function (file) {
            const filePath = file.path;
            const basename = path.basename(filePath, '.js');
            
            // Skip files that are already minified
            return !basename.endsWith('.min');
        }))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += '.min';
            path.extname = '.js';
        }))
        .pipe(gulp.dest('./assets/js'));
});

// build task
gulp.task('build', gulp.series('sass', 'minify-js'));

// resize images
gulp.task('resize', gulp.series('delete', 'resize-images'));

// default task
gulp.task('default', gulp.series('build', 'resize'));