const path = require('path');

module.exports = {
    entry: './content/brightness-fix.ts',
    output: {
        filename: './brightness-fix.js',
        path: path.resolve(__dirname, '.'),
    },
    devtool: false, // Webpack will otherwise use eval calls (Why anyone would think this is a good idea is beyond me)
    mode: 'development',
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                // test: /\.tsx?$/,
                use: 'ts-loader',
                // exclude: /node_modules/,
            },
        ],
    },
};