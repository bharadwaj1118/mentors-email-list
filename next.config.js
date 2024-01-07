/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['img.clerk.com', /*...other domains if any*/],
  },
};

module.exports = nextConfig;
