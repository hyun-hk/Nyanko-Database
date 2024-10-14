import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  images: {
    unoptimized: true,
  },
};

// GitHub Pages에 배포할 때만 basePath를 설정합니다.
if (process.env.GITHUB_ACTIONS) {
  nextConfig.basePath = '/Nyanko-Database';
}

export default nextConfig;
