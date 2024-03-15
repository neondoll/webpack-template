const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  // тут можно указать несколько точек входа
  entry       : {index: path.join(__dirname, 'src', 'index.js')},
  output      : {
    path               : path.join(__dirname, 'dist'),
    filename           : '[name].[contenthash].js',
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]')
  },
  module      : {
    rules: [
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
      //{test: /\.html$/, loader: 'html-loader'},
      {test: /\.pug$/, loader: 'pug-loader'},
      {test: /\.(scss|css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']},
      {test: /\.(png|jpg|jpeg|gif)$/i, type: 'asset/resource'},
      {test: /\.svg$/, type: 'asset/resource', generator: {filename: path.join('icons', '[name].[contenthash][ext]')}},
      {
        test     : /\.(woff2?|eot|ttf|otf)$/i,
        type     : 'asset/resource',
        generator: {filename: path.join('fonts', '[name].[contenthash][ext]')}
      }
    ]
  },
  plugins     : [
    new HtmlWebpackPlugin({template: path.join(__dirname, 'src', 'template.pug'), filename: 'index.html'}),
    new FileManagerPlugin({
      events: {
        onStart: {delete: ['dist']},
        onEnd  : {copy: [{source: path.join('src', 'static'), destination: 'dist'}]}
      }
    }),
    new MiniCssExtractPlugin({filename: '[name].[contenthash].css'})
  ],
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options       : {
            plugins: [
              ['gifsicle', {interlaced: true}],
              ['jpegtran', {progressive: true}],
              ['optipng', {optimizationLevel: 5}],
              ['svgo', {name: 'preset-default'}]
            ]
          }
        }
      })
    ]
  }
}