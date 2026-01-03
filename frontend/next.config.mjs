/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Keep this! It fixes the ZK hanging issue.
  serverExternalPackages: ["snarkjs"],

  webpack: (config, { isServer }) => {
    // 1. FIX: Force WebSockets to use pure JS (Prevents "bufferUtil.mask" crash)
    // We explicitly tell Webpack to treat these as "empty", so the library skips them.
    config.resolve.alias = {
      ...config.resolve.alias,
      "utf-8-validate": false,
      "bufferutil": false,
    };

    // 2. Fixes "fs" module errors for Client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        readline: false,
      };
    }

    return config;
  },
}

export default nextConfig