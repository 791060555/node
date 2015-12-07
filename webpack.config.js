var path = require("path");
var webpack = require("webpack");

module.exports = {
 // context: path.join(__dirname),
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
       test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {compact: true} 
     } , 
     // {
     //    test: /\.html$/,
     //    name: "mandrillTemplates",
     //    loader: 'raw!html-minify'
     //  }
    ]
  },
  'html-minify-loader': {
     empty: true,        // KEEP empty attributes
     cdata: true,        // KEEP CDATA from scripts
     comments: true     // KEEP comments
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
