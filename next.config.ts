/** @type {import('next').NextConfig} */

// 배포 상태인지 확인 (개발 모드일 땐 false, 배포할 땐 true)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  

  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;