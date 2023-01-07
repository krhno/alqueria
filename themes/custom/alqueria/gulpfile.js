var gulp = require("gulp"),
    sass = require("gulp-sass"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    cleanCSS = require("gulp-clean-css"),
    minifycss = require("gulp-minify-css"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    pipeline = require("readable-stream").pipeline;
    
//Config
var config = {
  css_default: {
    main: "assets/scss/**/*.scss",
    watch: "assets/scss/**/*.scss",
    output: "assets/css/"
  },
  css_libraries: {
    main: "assets/lib/css/**/*.css",
    watch: "assets/lib/css/**/*.css",
    output: "assets/css/"
  },
  js_default: {
    main: "assets/js/*.js",
    watch: "assets/js/*.js",
    output: "assets/js/minify/"
  },
  js_libraries: {
    main: "assets/lib/js/*.js",
    watch: "assets/lib/js/*.js",
    output: "assets/js/minify/"
  }
}

//Minify CSS
gulp.task("minifyCSS_default", function(){
  return gulp.src(config.css_default.main)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(cleanCSS())
    .pipe(concat("main.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.css_default.output))
});

//Minify CSS Libraries
gulp.task("minifyCSS_libraries", function(){
  return gulp.src(config.css_libraries.main)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(cleanCSS())
    .pipe(concat("libraries.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.css_libraries.output));
});

//Minify JS
gulp.task("minifyJS_default", function(){
  return pipeline(
    gulp.src(config.js_default.main),
    concat("main.min.js"),
    uglify(),
    gulp.dest(config.js_default.output)
  );
});

//Minify JS Libraries
gulp.task("minifyJS_libraries", function(){
  return pipeline(
    gulp.src(config.js_libraries.main),
    concat("libraries.min.js"),
    uglify(),
    gulp.dest(config.js_libraries.output)
  );
});

//Tasks
gulp.task("watch", function(){
  gulp.watch(config.css_default.watch, gulp.series("minifyCSS_default"));
  gulp.watch(config.css_libraries.watch, gulp.series("minifyCSS_libraries"));
  gulp.watch(config.js_default.watch, gulp.series("minifyJS_default"));
  gulp.watch(config.js_libraries.watch, gulp.series("minifyJS_libraries"));
});

//Default
gulp.task("default", gulp.series(
  "watch"
));
