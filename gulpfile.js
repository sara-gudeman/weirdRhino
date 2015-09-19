var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var env = require('gulp-env');
var exec = require('child_process').exec;
var eslint = require('gulp-eslint');


var isWatching = false;

gulp.task("webpack-watch", ["webpack"], function() {
  isWatching = true;
  gulp.watch(["client/**/*", "!client/build/**/*"], ["webpack"]);
})

gulp.task("webpack", function(callback) {
    // run webpack
    webpack({
      context: __dirname,
      entry: [
        './client/src/components/AppContainer'
        ],
      output: {
          path: __dirname + '/client/build',
          filename: 'bundle.js'
      },
      module: {
          loaders: [
              { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'] },
          ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
      }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('nodemon', function() {
  isWatching = true;
  nodemon({
    script: "./server/server.js",
    env: {
      NODE_ENV: 'development',
      PORT: '8080'
    }
  });
});

gulp.task('watch', function(){
  gulp.watch(
    ["./server/**/*.js", './server/tests/*.js'],
    ['mocha']
  );
});

gulp.task('mocha', ['webpack'], function() {
  return gulp.src('./server/tests/*.spec.js')
    .pipe(mocha({
      bail: false,
      reporter: "nyan"
    }).on('error', function(){})
      //do nothing
    );
});

gulp.task('default', ['nodemon', 'webpack-watch', 'mocha', 'watch']);

gulp.task('travis', ['webpack', 'mocha']);

gulp.task('lint', function () {
  return gulp.src(['client/src/**/*'])
    // eslint() attaches the lint output to the eslint property 
    // of the file object so it can be used by other modules. 
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console. 
    // Alternatively use eslint.formatEach() (see Docs). 
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on 
    // lint error, return the stream and pipe to failOnError last. 
    .pipe(eslint.failOnError());
});

gulp.task('deploy', ["webpack"], function () {
  isWatching = true;
  nodemon({ script: 'server/server.js', ext: 'html js'})
    .on('restart', function () {
      console.log('restarted!')
    });
});

gulp.on('stop', function() {
    if (!isWatching) {
        process.nextTick(function() {
            process.exit(0);
        });
    }
});
