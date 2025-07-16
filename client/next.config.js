/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Other configurations
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
};
module.exports = nextConfig;