/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["blazebuy.s3.amazonaws.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
