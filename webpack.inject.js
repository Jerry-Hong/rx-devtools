var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, './'),
    entry: {
        debugOperator: './src/content-script/debugOperator.js',
    },
    output: {
        path: './build/tmp',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}