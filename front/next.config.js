/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s3.amazonaws.com"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
