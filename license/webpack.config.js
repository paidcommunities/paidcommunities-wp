const path = require('path');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const config = {
    entry: {
        license: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'admin-license.js'
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
                            require.resolve('@babel/plugin-proposal-async-generator-functions')
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
            requestToHandle: request => {
                const handles = {
                    '@paidcommunities-wp/api': 'paidcommunities-wp-api'
                }
                return handles[request] ?? undefined;
            },
            requestToExternal: request => {
                const maps = {
                    '@paidcommunities-wp/api': ['paidcommunities', 'wp', 'api']
                }
                return maps[request] ?? undefined;
            }
        })
    ]
}

module.exports = config;