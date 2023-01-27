const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
const webpack = require("webpack");
const withCSS = require("@zeit/next-css");

const nextConfig = {
    webpack: (config, options) => {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    comparisons: false,
                },
                output: {
                    comments: false,
                    ascii_only: true,
                },
                sourceMap: options.dev,
            }),
            new webpack.optimize.AggressiveMergingPlugin()
        );
        return config;
    },
};

module.exports = withPlugins([[withCSS], [withBundleAnalyzer]], nextConfig);
