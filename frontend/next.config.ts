import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Ensure .jsx files are recognized
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: ['example.com'], // Thêm domain ảnh ngoài bạn sử dụng
  },
};

export default nextConfig;
