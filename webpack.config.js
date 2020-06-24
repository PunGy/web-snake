const path = require('path');

module.exports = (env) => ({
    mode: env.MODE,
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
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
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
    },
    target: 'web',
    devtool: 'inline-source-map',
})