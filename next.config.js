/** @type {import('next').NextConfig} */
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.plugins.push(new BundleAnalyzerPlugin());
        return config;
    },
};

module.exports = withBundleAnalyzer(nextConfig);
