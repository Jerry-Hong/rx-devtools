var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: path.join(__dirname, './'),
    entry: {
        background: './src/background/index.js',
        contentScript: './src/content-script/index.js',
        devpanel: './src/devpanel/index.js',
        devtools: './src/devtools/index.js'
    },
    output: {
        path: './build/js',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin([
            { context: './src/assets', from: '**/*', to: path.join(__dirname, './build') }
        ])
    ]
}