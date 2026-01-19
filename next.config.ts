/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 정적 사이트 내보내기 (필수)
  basePath: '/thereyougoatta', // 저장소 이름 (필수: 이게 없으면 404 뜸!)
  images: {
    unoptimized: true, // 이미지 최적화 끄기 (필수)
  },
};

export default nextConfig;