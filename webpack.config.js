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
        devtools: './src/devtools/index.js',
    },
    output: {
        path: './build/js',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.css/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: { modules: true, importLoaders: 1, camelCase: true, localIdentName: '[local]_[hash:base64:3]'  }
            }, { 
                loader: 'postcss-loader', 
                options: { plugins: () => [require('postcss-nested')] } 
            }]
        }]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin([
            { context: './src/assets', from: '**/*', to: path.join(__dirname, './build') }
        ])
    ]
}