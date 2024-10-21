import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@styles": path.resolve("./styles"), // Define the alias for styles
        };
        return config;
    },
};

export default nextConfig;
