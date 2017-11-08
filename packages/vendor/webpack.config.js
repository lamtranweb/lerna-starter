var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        'util': ['lodash']
    },
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dll'),
        library: '[name]_dll',
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'dll/[name]-manifest.json',
            name: '[name]_dll'
        }),
    ],
};

