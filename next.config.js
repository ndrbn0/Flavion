/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "encrypted-tbn0.gstatic.com",
      "static.vecteezy.com",
    ],
  },
};

module.exports = nextConfig;
