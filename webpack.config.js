const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        game: './src/game.js',
        objects: './src/objectControl.js',
        map: './src/mapControl.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    }
                }
            }
        ]
    }
}