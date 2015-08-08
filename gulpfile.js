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
    all: {
      scss: [
        'src/scss/**/*.scss'
      ],
      js: [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-picturefill/angular-picturefill.js',
        'bower_components/picturefill/picturefill.js',
        'src/scripts/app/app.js',
        'src/scripts/app/app.routes.js',
        'src/scripts/app/app.analytics.js',
        'src/scripts/config/**/*.js',
        'src/scripts/controllers/**/*.js',
        'src/scripts/directives/**/*.js',
        'src/scripts/filters/**/*.js',
        'src/scripts/helpers/**/*.js',
        'src/scripts/services/**/*.js',
        'src/scripts/views/**/*.js'
      ], 
      img: [
        'src/img/**/*'
      ]  
    },
    angularTemplates: [
      'src/scripts/templates/**/*.html'
    ],
    views: [
      'views/**/*.html'
    ], 
    vendor: {
      js: 'src/scripts/vendor/'
    },
    custom: {
      js: [
      'src/scripts/**/*.js'
      ]
    }  
  },
  livereload: [
    'web/styles/*.css', 
    'web/scripts/*.js',
    'views/*',  
    'web/img/*', 
    '*.html'
  ],
  web: {
    images: 'web/img'
  } 
}

/* Errorhandling
   ========================================================================== */
var errorLogger = function(headerMessage,errorMessage){
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

var headerLines = function(message){
  var lines = '';
  for(var i = 0; i< (message.length + 4); i++){
    lines += '-';
  }
  return lines;
};

/* Tasks
   ========================================================================== */
// serve at localhost:8080
gulp.task('webserver', function() {
  plugins.connect.server({
    root: __dirname,
    livereload: true
  });
});


// livereload
gulp.task('livereload', function() {
  gulp.src( paths.livereload )
    .pipe(plugins.watch( paths.livereload ))
    .pipe(plugins.connect.reload());
});

// styles
gulp.task('styles', function() {
  return gulp.src( paths.src.all.scss )
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
    .pipe(gulp.dest('web/.temp/styles'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('web/styles'));
});

// scripts 
gulp.task('scripts', function() {
  return gulp.src( paths.src.all.js )
    .pipe(plugins.plumber({
        handleError: errorHandler
    }))
    .pipe(plugins.concat('script.js'))
    .pipe(gulp.dest('web/.temp/scripts'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('web/scripts'));
});

// jshint
gulp.task('jshint', function() {
  return gulp.src(paths.src.custom.js)
    .pipe(plugins.plumber({
          handleError: errorHandler
    }))
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(require('jshint-stylish')));
});

// images
gulp.task('images', function() {
  return gulp.src( paths.src.all.img )
    .pipe(plugins.changed(paths.web.images))
    .pipe(plugins.imagemin({ 
      optimizationLevel: 5, 
      progressive: true, 
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('web/img'));
});

//move templates
gulp.task('moveTemplates', function(){
  gulp.src(paths.src.angularTemplates)
  .pipe(gulp.dest('web/scripts/templates'));
});

// clean web folder
gulp.task('clean', function(cb) {
    del(['web'], cb)
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch(paths.src.all.scss, ['styles']);
  // Watch templates
  gulp.watch(paths.src.angularTemplates, ['moveTemplates']);
  // Watch .js files
  gulp.watch(paths.src.all.js, ['scripts']);
  // jsHint 
  gulp.watch(paths.src.custom.js, ['jshint']);
  // Watch image files
  gulp.watch(paths.src.all.img, ['images']);
});

/*============================================================*/

/* serves at http://localhost:8080 */
gulp.task('default', ['build'], function() {
    gulp.start('webserver','livereload','watch');
});

gulp.task('build', ['clean'], function() {
    gulp.start('moveTemplates', 'styles', 'scripts', 'images');
});