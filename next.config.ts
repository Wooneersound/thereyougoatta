/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 정적 배포 필수 설정
  
  // ▼ 이 부분이 빠져서 흰 화면이 뜬 겁니다! (저장소 이름 입력)
  basePath: '/thereyougoatta', 
  
  images: {
    unoptimized: true, // 깃허브 페이지에서 이미지 나오게 하려면 필수
  },
};

export default nextConfig;