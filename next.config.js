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
      "static.vecteezy.com",
      "mainlandcheese.com",
      "www.thespruceeats.com",
      "cdn.apartmenttherapy.info",
      "omnivorescookbook.com",
      "moonandspoonandyum.com",
      "images.squarespace-cdn.com",
      "www.rainbownourishments.com",
      "www.kitchenskip.com",
      "kitchencookbook.net",
      "starranch.com",
      "media1.popsugar-assets.com",
    ],
  },
};

module.exports = nextConfig;
