const path = require('path');
const {kebabCase} = require('lodash');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paidcommunities = {
    entry: {
        paidcommunitiesWp: path.resolve(__dirname, './index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (chunkData) => {
            return `${kebabCase(chunkData.chunk.name)}.js`
        },
        library: {
            name: ['paidcommunities', 'wp'],
            type: 'umd',
            export: ['default']
        },
        globalObject: 'this',
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
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new DependencyExtractionWebpackPlugin({
            injectPolyfill: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
};

module.exports = paidcommunities;