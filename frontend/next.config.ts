import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Xuất website ra dạng static HTML (cho firebase hosting tĩnh)
  output: 'export',

  // Các cấu hình khác
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: ['example.com', 'localhost'],
  },
};

export default nextConfig;
