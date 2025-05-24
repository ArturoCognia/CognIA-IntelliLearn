/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Generará archivos estáticos para despliegue en Firebase
  images: {
    unoptimized: true, // Necesario para el modo export
  },
  trailingSlash: true, // Ayuda con el enrutamiento en Firebase Hosting
};

module.exports = nextConfig; 