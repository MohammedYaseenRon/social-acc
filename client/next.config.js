/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  // Other configurations
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
};
module.exports = nextConfig;