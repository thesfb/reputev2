/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Disable TypeScript checks during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // REMOVED: eslint block is no longer supported in next.config.mjs
  
  images: {
    unoptimized: true,
  },
  // 3. Keep snarkjs external to prevent server bundling issues
  serverExternalPackages: ["snarkjs"],

  webpack: (config, { isServer }) => {
    // 4. Fix: Force WebSockets to use pure JS (Prevents "bufferUtil.mask" crash)
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "utf-8-validate": false,
      "bufferutil": false,
    };

    // 5. Fixes "fs" module errors for Client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        readline: false,
        os: false,
        path: false,
        crypto: false, // Sometimes needed for snarkjs/browser
      };
    }

    return config;
  },
}

export default nextConfig;