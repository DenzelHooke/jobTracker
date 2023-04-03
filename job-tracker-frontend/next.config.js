/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['job-tracker-files.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
