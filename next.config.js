/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // GitHub Pages는 절대 경로를 사용해야 함
  basePath: '',
  assetPrefix: '',
  // SEO 최적화를 위한 추가 설정
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // 정적 파일 최적화
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
