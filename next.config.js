// next.config.js
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    },
    images: {
        remotePatterns: [
            new URL("https://www.bistrokavkaz.cz/**"), 
            new URL("https://www.atollo.cz/**"),
            new URL("https://www.panchos.cz/**")
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = { ...config.resolve.fallback, fs: false };
        }

        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

module.exports = withPWA(nextConfig);
