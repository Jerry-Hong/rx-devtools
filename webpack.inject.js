var path = require('path');

module.exports = {
    context: path.join(__dirname, './'),
    entry: {
        debugOperator: './src/content-script/injectWindow.js',
    },
    output: {
        path: path.resolve(__dirname, './build/tmp'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, './src')],
            },
        ],
    },
};
