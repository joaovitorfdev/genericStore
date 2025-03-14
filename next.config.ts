/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "madenlatados.com.br",
      },
      {
        protocol: "https",
        hostname: "blacknine.cdn.magazord.com.br", // Adicionando o novo domínio
      },
    ],
  },
};

module.exports = nextConfig;
