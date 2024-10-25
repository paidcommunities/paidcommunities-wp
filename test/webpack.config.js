const path = require('path');
const {kebabCase} = require('lodash');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode: process.env.NODE_ENV,
    devtool: 'source-map',
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
        index2: path.resolve(__dirname, './src/index2.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (chunkData) => {
            return `${kebabCase(chunkData.chunk.name)}.js`
        }
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false,
                                    targets: {
                                        browsers: [
                                            'extends @wordpress/browserslist-config'
                                        ]
                                    }
                                }
                            ],
                            '@babel/preset-react'
                        ],
                        plugins: [
                            require.resolve('@babel/plugin-proposal-object-rest-spread'),
                            require.resolve('@babel/plugin-proposal-async-generator-functions'),
                            require.resolve('@babel/plugin-proposal-class-properties'),
                        ]
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        '@wordpress/components': 'wp.components',
        'jquery': 'jQuery'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ]
};

module.exports = config;