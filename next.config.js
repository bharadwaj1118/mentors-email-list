/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["img.clerk.com", "uploadthing.com", "utfs.io"],
  },
};

module.exports = withContentlayer(nextConfig);
