import Link from "next/link";
import { getAttaVideos } from "../../lib/youtube";
import YoutubePlayer from "../../components/YoutubePlayer";

export default async function Visuals() {
  // 1. 서버에서 데이터 가져오기 (API 사용)
  const videos = await getAttaVideos();

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-y-auto">
      
      {/* 상단 네비게이션 */}
      <div className="fixed top-0 left-0 right-0 p-8 md:p-12 z-50 flex justify-between items-end bg-gradient-to-b from-black to-transparent pointer-events-none">
        <Link href="/" className="pointer-events-auto text-sm font-bold tracking-widest hover:text-purple-400 transition-colors">
          ← BACK
        </Link>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mix-blend-difference opacity-50">
          VISUALS
        </h1>
      </div>

      {/* 필름 롤 컨테이너 */}
      <div className="max-w-4xl mx-auto pt-40 pb-20 px-4">
        <div className="border-l-2 border-r-2 border-dashed border-gray-800 min-h-screen p-4 md:p-8 relative">
          
          {/* 데이터가 없을 경우 에러 메시지 */}
          {videos.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Videos loading failed... (Check API Key)
            </div>
          ) : (
            /* 비디오 리스트 출력 */
            videos.map((video: any, index: number) => (
              <div key={video.id} className="mb-24 relative">
                
                {/* 텍스트 정보 */}
                <div className="flex justify-between items-end mb-4 px-2">
                  <div>
                    <span className="text-purple-500 text-xs font-mono tracking-widest block mb-1">
                      {video.category} / {video.year}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold leading-none">
                      {video.title}
                    </h2>
                  </div>
                  <div className="text-gray-600 font-mono text-sm">
                    #{String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* 플레이어 (새로 만든 컴포넌트 사용) */}
                <YoutubePlayer video={video} />

              </div>
            ))
          )}
          
        </div>
      </div>
    </main>
  );
}