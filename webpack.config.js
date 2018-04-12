const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = '/public/';

const indexHTML = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html"
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
                        sourceMap: true,
                        localIdentName: '[local]___[hash:base64:5]'
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
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use:{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            },
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