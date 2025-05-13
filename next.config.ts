/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Desabilita o Turbopack e usa o Webpack
    turbo: false,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http", // Corrigido para apenas "http"
        hostname: "localhost", // Apenas o hostname
        port: "8000", // Opcional, mas útil para especificar a porta
      },
    ],
  },
};

module.exports = nextConfig;

