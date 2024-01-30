/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["img.clerk.com" /*...other domains if any*/],
  },
};

module.exports = withContentlayer(nextConfig);
