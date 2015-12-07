var path = require("path");
var webpack = require("webpack");

module.exports = {
 // context: __dirname,
  entry: {
    index: './app/scripts/index.js',
  },
  output: {
    path: path.join(__dirname, '_dist', 'scripts'),
    filename: '[name]-bundle.js',
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.woff$/,
      loader: 'url-loader?prefix=font/&limit=5000'
    }, 
     {
       test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
     } , 
    ]
  },
  resolve: {
    root: [path.join(__dirname, "bower_components")],
    alias: {
      ap: path.join(__dirname, 'fe', 'ap'),
      shared: path.join(__dirname, 'fe', 'ap', 'shared'),

    }
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]
};
