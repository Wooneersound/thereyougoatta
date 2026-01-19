"use client";

import { getAttaSongs } from "@/lib/appleMusic";
import Link from "next/link";
import { useEffect, useState } from "react";

// ▶▶▶ [여기에 스포티파이 링크를 채워주세요] ◀◀◀
// 곡 제목(정확해야 함) : "스포티파이 링크"
const spotifyLinks: { [key: string]: string } = {
  "de Pluto": "https://open.spotify.com/track/3SCXlOrdWr5nEdleXKdLrx?si=3af2b7006f124d22",
  "What's on my mind": "https://open.spotify.com/track/6sYOpXBbysLipRwbHxqH0r?si=0ab277fa8d56483f", 
  "You there": "https://open.spotify.com/track/3y9y0VE0pPNZCFqEVCuX2j?si=d0188bff2d0b45bf",
  "float": "https://open.spotify.com/track/2pWF2KrGpipo8retKWllHb?si=2f57324808304bc2",
  "When You Fall in Love": "https://open.spotify.com/track/1XiLSAkShXybwVFk9sF6aL?si=2cf49dd44b0e4e49",
  "Hourglass": "https://open.spotify.com/track/4r0OgYSXREW0nENAF3ylOH?si=5e235a772384492c",
  // 여기에 없는 신곡은 자동으로 '검색 결과'로 연결됩니다.
};

export default function Discography() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttaSongs();
        setSongs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-12 overflow-y-auto">
      
      {/* 상단 네비게이션 */}
      <div className="flex justify-between items-end mb-20 relative z-10">
        <Link href="/" className="text-sm font-bold tracking-widest hover:text-green-400 transition-colors">
          ← BACK
        </Link>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mix-blend-difference">
          DISCOGRAPHY
        </h1>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="text-gray-500 text-xl font-light animate-pulse">
          Syncing with Apple Music...
        </div>
      )}

      {!loading && songs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {songs.map((song: any) => {
            // 이미지 고화질 변환
            const highResCover = song.artworkUrl100.replace("100x100bb", "1000x1000bb");
            
            // [핵심] 링크 결정 로직 (대소문자 무시 매핑)
            // 1. Apple Music에서 온 제목과 우리 목록의 제목을 모두 소문자로 바꿔서 비교
            const lowerCaseTrackName = song.trackName.toLowerCase();
            
            // 우리 목록(spotifyLinks)의 키들도 소문자로 찾기 위해 변환
            const manualLinkKey = Object.keys(spotifyLinks).find(
              key => key.toLowerCase() === lowerCaseTrackName
            );
            const manualLink = manualLinkKey ? spotifyLinks[manualLinkKey] : null;
            
            // 2. 있으면 그거 쓰고, 없으면 검색 링크
            const finalLink = manualLink 
              ? manualLink 
              : `https://open.spotify.com/search/${encodeURIComponent("Atta " + song.trackName)}`;

            return (
              <div 
                key={song.trackId} 
                className="group relative aspect-square bg-gray-900 cursor-pointer overflow-hidden border border-gray-800 hover:border-green-500 transition-colors duration-500"
              >
                {/* 앨범 커버 */}
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${highResCover})` }}
                />
                
                {/* 텍스트 정보 */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start bg-gradient-to-t from-black via-black/50 to-transparent">
                  <span className="text-xs font-mono text-green-400 mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {song.releaseDate.substring(0, 4)}
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl font-bold leading-none mb-1 group-hover:text-green-100 transition-colors line-clamp-2">
                    {song.trackName}
                  </h2>
                  
                  <p className="text-gray-400 text-sm font-light tracking-wider">
                    {song.artistName}
                  </p>

                  {/* 버튼: 클릭 시 정확한 링크로 이동 */}
                  <a 
                    href={finalLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-6 px-6 py-2 border border-white/30 rounded-full text-xs font-bold tracking-widest hover:bg-[#1DB954] hover:border-[#1DB954] hover:text-black transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 delay-100"
                  >
                    LISTEN ON SPOTIFY
                  </a>
                </div>

                {/* 노이즈 */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}