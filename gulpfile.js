var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var env = require('gulp-env');
var exec = require('child_process').exec;

// gulp.task('default', function() {
  // place code for your default task here
// });

gulp.task("webpack-watch", ["webpack"], function() {
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

gulp.task('server', function() {
  exec('node ./server/server.js', function (err, stdout, stderr) {
    if (err) {
      console.log('error', err);
    }
  });
})

gulp.task('nodemon', function() {
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

gulp.task('mocha', function() {
  env({
    vars: {
      NODE_ENV: 'testing',
      PORT: 3000
    }
  });
  return gulp.src('./server/tests/*.spec.js')
    .pipe(mocha({
      bail: false,
      reporter: "nyan"
    }).on('error', function(){})
      //do nothing
    );
});

gulp.task('default', ['nodemon', 'webpack-watch', 'mocha', 'watch']);

gulp.task('travis', [webpack', 'mocha']);

gulp.task('deploy', ["webpack"], function () {
  nodemon({ script: 'server/server.js',
            ext: 'html js'})
    .on('restart', function () {
      console.log('restarted!')
    })
});
