const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',

        hostname: 'res.cloudinary.com',
        // optional: pathname: '/your-path/*'
      },
    ],


  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;