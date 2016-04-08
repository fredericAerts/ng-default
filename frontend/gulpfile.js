/* Setup Gulp
   ========================================================================== */
var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});
var del = require('del');

var errorHandler = function(err) {
    console.log(err);
    this.emit('end');
};

/* Config
   ========================================================================== */
var paths = {
    src: {
        scss: [
            'scss/**/*.scss'
        ],
        js: [
              'bower_components/lodash/lodash.js',
              'bower_components/angular/angular.js',
              'bower_components/angular-ui-router/release/angular-ui-router.js',
              'bower_components/angular-animate/angular-animate.js',
              'js/**/*.module.js',
              'js/**/*.js',
              '!js/**/*.spec.js' // exclude test files
        ],
        img: [
            'img/**/*'
        ],
        templates: [
            'js/app/**/*.html'
        ],
        data: [
            'js/app/**/*.json'
        ]
    },
    customJs: [
        'js/app/**/*.js'
    ],
    livereload: [
        '../web/css/*.css',
        '../web/js/*.js',
        '../web/img/*',
        '../web/**/*.html',
        '../index.html'
    ],
    temp: {
        css: '../web/.temp/css',
        js: '../web/.temp/js',
        img: '../web/.temp/img'
    },
    dest: {
        root: '../web',
        css: '../web/css',
        js: '../web/js',
        img: '../web/img',
        templates: '../web/templates',
        data: '../web/data'
    }
}

/* Errorhandling
   ========================================================================== */
var errorLogger = function(headerMessage,errorMessage) {
    var header = headerLines(headerMessage);
    header += '\n             '+ headerMessage +'\n           ';
    header += headerLines(headerMessage);
    header += '\r\n \r\n';
    plugins.util.log(plugins.util.colors.red(header) + '             ' + errorMessage + '\r\n')

    if(showErrorNotifications){
    var notifier = new Notifier();
    notifier.notify({
        'title': headerMessage,
        'message': errorMessage,
        'contentImage':  __dirname + "/gulp_error.jpg"
    });
    }
};

var headerLines = function(message) {
    var lines = '';
    for(var i = 0; i< (message.length + 4); i++) {
        lines += '-';
    }
    return lines;
};

/* Tasks
   ========================================================================== */
// clean web folder
gulp.task('clean', function() {
    return del([paths.dest.root], {force: true});
});

// move templates
gulp.task('moveTemplates', function() {
    return gulp.src(paths.src.templates)
        .pipe(gulp.dest(paths.dest.templates));
});

gulp.task('moveData', function() {
    return gulp.src(paths.src.data)
        .pipe(gulp.dest(paths.dest.data));
});

// styles
gulp.task('styles', function() {
    return gulp.src( paths.src.scss )
        .pipe(plugins.plumber({
            handleError: errorHandler
        }))
        .pipe(plugins.sass({
          debugInfo   : true,
          lineNumbers : true,
          style: 'expanded',
          sourceComments: 'normal',
          onError: function(err) {
             return plugins.notify().write(err);
          }
        }))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.concat('style.css'))
        .pipe(gulp.dest(paths.temp.css))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest(paths.dest.css));
});

// scripts
gulp.task('scripts', function() {
    return gulp.src(paths.src.js)
        .pipe(plugins.plumber({
            handleError: errorHandler
        }))
        .pipe(plugins.concat('script.js'))
        .pipe(gulp.dest(paths.temp.js))
        .pipe(plugins.rename({suffix: '.min'}))
        // .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.dest.js));
});

// jshint
gulp.task('jshint', function() {
    return gulp.src(paths.customJs)
        .pipe(plugins.plumber({
              handleError: errorHandler
        }))
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(require('jshint-stylish')));
});

gulp.task('jscs', function() {
    return gulp.src(paths.customJs)
        .pipe(plugins.jscs())
        .pipe(plugins.jscs.reporter());
});

// images
gulp.task('images', function() {
    return gulp.src(paths.src.img)
        .pipe(plugins.changed(paths.dest.img))
        .pipe(plugins.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(paths.dest.img));
});

// serve at localhost:8080
gulp.task('webserver', function() {
    plugins.connect.server({
        root: '../',
        livereload: true
    });
});

// livereload
gulp.task('livereload', function() {
    gulp.src( paths.livereload )
        .pipe(plugins.watch( paths.livereload ))
        .pipe(plugins.connect.reload());
});

// watch
gulp.task('watch', function() {
    // watch templates
    gulp.watch(paths.src.templates, ['moveTemplates']);
    // watch data
    gulp.watch(paths.src.data, ['moveData']);
    // watch .scss files
    gulp.watch(paths.src.scss, ['styles']);
    // watch .js files
    gulp.watch(paths.src.js, ['scripts']);
    // jsHint
    gulp.watch(paths.customJs, ['jshint', 'jscs']);
    // watch image files
    gulp.watch(paths.src.img, ['images']);
});

/* ============================================================ */
// serves at http://localhost:8080
gulp.task('default', ['build'], function() {
    gulp.start('webserver','livereload','watch');
});

gulp.task('build', ['clean'], function() {
    gulp.start('moveTemplates', 'moveData', 'styles', 'scripts', 'images');
});
