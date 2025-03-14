/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "madenlatados.com.br",
      },
      {
        protocol: "https",
        hostname: "blacknine.cdn.magazord.com.br",
      },
    ],
  },
};

module.exports = nextConfig;
