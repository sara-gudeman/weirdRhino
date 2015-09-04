var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
  // place code for your default task here
});

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

gulp.task('deploy', ["webpack"], function () {
  nodemon({ script: 'server/server.js',
            ext: 'html js'})
    .on('restart', function () {
      console.log('restarted!')
    })
});
