const path = require('path');

module.exports  = {
    entry: './js/addressfinder/src/main.js',
    output: {
        path: path.resolve(__dirname, 'js/addressfinder/dist'),
        filename: 'addressfinder.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
