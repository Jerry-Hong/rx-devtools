var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: path.join(__dirname, './'),
    entry: {
        devpanel: './src/app/index.js',
    },
    output: {
        path: path.resolve(__dirname, './devBuild/'),
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                include: [path.resolve(__dirname, './src')],
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            camelCase: true,
                            localIdentName: '[local]_[hash:base64:3]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: { plugins: () => [require('postcss-nested')] },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/template.html',
        }),
    ],
    node: {
        fs: 'empty',
    },
    devServer: {
        publicPath: '/',
        lazy: false,
    },
};
