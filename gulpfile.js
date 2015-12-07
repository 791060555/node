var del = require("del");
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var path = require("path");
var gulpLoadPlugins = require("gulp-load-plugins");

const $ = gulpLoadPlugins();

// The development server (the recommended option for development)
gulp.task("default",() => {
	gulp.start('init-resouces');
});

gulp.task('init-resouces', ['html', 'images', 'fonts', 'extras',"build-dev","webpack-dev-server"], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});
// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function() {
	gulp.watch(["app/**/*"], ["webpack:build-dev"]);
	gulp.watch('app/images/**/*',['images']);
	gulp.watch('app/fonts/**/*', ['fonts']);
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('clean', del.bind(null, ['_dist']));

gulp.task('html',()=>{
	return gulp.src('app/*.html')
		.pipe(gulp.dest('_dist/'));
});

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		//publicPath: "/" + myConfig.output.publicPath,
		publicPath:  path.join(__dirname, '_dist'),
		contentBase: path.join(__dirname, '_dist'),
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});