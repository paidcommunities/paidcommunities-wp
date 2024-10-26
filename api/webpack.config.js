const path = require('path');
const {kebabCase} = require('lodash');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const globalConfig = {
    entry: {
        api: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: (chunkData) => {
            return `${kebabCase(chunkData.chunk.name)}.js`
        },
        library: {
            name: ['paidcommunities', 'wp', '[name]'],
            type: 'window'
        },
        clean: true
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
                            ]
                        ],
                        plugins: [
                            require.resolve('@babel/plugin-proposal-object-rest-spread'),
                            require.resolve('@babel/plugin-proposal-async-generator-functions'),
                            require.resolve('@babel/plugin-proposal-class-properties'),
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new DependencyExtractionWebpackPlugin({
            injectPolyfill: true,
        })
    ],
};

const moduleConfig = {
    entry: {
        api: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build-module'),
        filename: (chunkData) => {
            return `${kebabCase(chunkData.chunk.name)}.js`
        },
        library: {
            name: ['paidcommunities', 'wp', '[name]'],
            type: 'umd',
            export: 'default'
        },
        globalObject: 'this',
        clean: true,
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
                            ]
                        ],
                        plugins: [
                            require.resolve('@babel/plugin-proposal-object-rest-spread'),
                            require.resolve('@babel/plugin-proposal-async-generator-functions'),
                            require.resolve('@babel/plugin-proposal-class-properties'),
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new DependencyExtractionWebpackPlugin()
    ]
}

module.exports = [globalConfig, moduleConfig];