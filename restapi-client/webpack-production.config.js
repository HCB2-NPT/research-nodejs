const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'build');
const NODE_MODULE_DIR = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
    entry: [
        entry: [path.join(__dirname, '/src/app/app.js')],
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/app/app.js')
    ],

    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },

    module : {
        loaders : [
            {
                test : /\.js?/,
                loaders: ['react-hot', 'babel-loader'],
                exclude: [NODE_MODULE_DIR],
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        // Define production build to allow React to strip out unnecessary checks
        new webpack.DefinePlugin({
            'process.env':{
            'NODE_ENV': JSON.stringify('production')
            }
        }),
        // Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // suppresses warnings, usually from module minification
                warnings: false,
            },
        }),
        // Allows error warnings but does not stop compiling.
        new webpack.NoErrorsPlugin(),
        // Transfer Files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
    ]
};

module.exports = config;