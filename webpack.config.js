var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
 // context: path.join(__dirname),
  entry: {
    index: './app/scripts/index',
    page1: './app/scripts/page1',
    page2: './app/scripts/page2',
    page3: './app/scripts/page3'
  },
  output: {
    path: path.join(__dirname, '_dist'),
    filename: './scripts/[name]-bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
    {
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
    new webpack.optimize.CommonsChunkPlugin({
        name: "commons",
        filename: "./scripts/commons.js",
        chunks: ["page1","page2","page3"]
      }),
    new ExtractTextPlugin("./styles/[name].css"),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]
};
