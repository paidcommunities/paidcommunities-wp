const path = require('path');
const glob = require('glob');
const {kebabCase} = require('lodash');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const globalConfig = {
    entry: {
        components: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: (chunkData) => {
            return `${kebabCase(chunkData.chunk.name)}.js`
        },
        library: {
            name: ['paidcommunities', 'wp', '[name]'],
            type: 'window'
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
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new DependencyExtractionWebpackPlugin({
            requestToExternal: (request) => {
                const external = {
                    '@paidcommunities-wp/api': ['paidcommunities', 'wp', 'api']
                }
                if (external[request]) {
                    return external[request];
                }
            },
            requestToHandle: request => {
                const handles = {
                    '@paidcommunities-wp/api': 'paidcommunities-wp-api'
                }
                if (handles[request]) {
                    return handles[request];
                }
            }
        })
    ]
};

const moduleConfig = {
    entry: {
        components: path.resolve(__dirname, './src/index.js')
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
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new DependencyExtractionWebpackPlugin()
    ]
};

const styles = {
    entry: {
        styles: glob.sync('./src/**/*.{css,scss}')
    },
    output: {
        path: path.resolve(__dirname, 'build-style')
    },
    module: {
        rules: [
            {
                test: /\.?scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: () => {
                return '[name].css';
            }
        })
    ],
}

module.exports = [globalConfig, moduleConfig, styles];