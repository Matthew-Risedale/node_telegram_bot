const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const indexHTML = new HtmlWebpackPlugin({
    template: "./src/index.html"
});

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [/src/],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, './src/js')],
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        modules: true,
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            }
        ]
    },
    devServer: {
        port: 3000,
        hot: true,
        contentBase: path.resolve(__dirname, './src'),
        historyApiFallback: true,
    },
    plugins: [
        indexHTML
    ]
};