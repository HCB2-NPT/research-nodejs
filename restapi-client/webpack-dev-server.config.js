const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'build');
const NODE_MODULE_DIR = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
    entry: [
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/app/app.jsx')
    ],

    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },

    module : {
        loaders : [
            {
                test : /\.jsx?/,
                loaders: ['babel', 'react-hot', 'babel-loader'],
                exclude: [NODE_MODULE_DIR],
            }
        ]
    },

    devtool: 'eval',

    devServer: {
        contentBase: './src/www',
        devtool: 'eval',
        hot: true,
        inline: true,
        port: 4000
    },

    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        // Allows error warnings but does not stop compiling.
        new webpack.NoErrorsPlugin(),
        // Moves files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
    ]
};

module.exports = config;
