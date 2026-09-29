const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',

    entry: './src/22.1.js',

    output: {
        filename: '22.1.min.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '22.1.min.css'
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin()
        ]
    }
};