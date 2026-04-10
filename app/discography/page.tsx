import { getAttaSongs } from "@/lib/appleMusic";
import Link from "next/link";

// ▶▶▶ [링크 설정] ◀◀◀
// 비워두면 자동으로 '검색 결과'로 연결됩니다.
interface SongLinkConfig {
  spotify?: string;
  melon?: string;
  apple?: string;
  youtube?: string;
}

const songLinks: { [key: string]: SongLinkConfig } = {
  "de Pluto": {
    spotify: "https://open.spotify.com/track/3SCXlOrdWr5nEdleXKdLrx?si=3af2b7006f124d22",
    youtube: "https://music.youtube.com/watch?v=xc541HBXtJM&list=OLAK5uy_ng5bYrzYyitIB8Vs17xiK7QHNRVICutxg&index=1",
    melon: "https://www.melon.com/album/detail.htm?albumId=11584804",
  },
  "What's on my mind": {
    spotify: "https://open.spotify.com/track/6sYOpXBbysLipRwbHxqH0r?si=0ab277fa8d56483f",
    youtube: "https://music.youtube.com/watch?v=bJiT_lF4WjU&list=OLAK5uy_ng5bYrzYyitIB8Vs17xiK7QHNRVICutxg&index=2",
    melon: "https://www.melon.com/album/detail.htm?albumId=11584804",
  },
  "You there": {
    spotify: "https://open.spotify.com/track/3y9y0VE0pPNZCFqEVCuX2j?si=d0188bff2d0b45bf",
    youtube: "https://music.youtube.com/watch?v=g1GY541LNDE&list=OLAK5uy_ng5bYrzYyitIB8Vs17xiK7QHNRVICutxg&index=3",
    melon: "https://www.melon.com/album/detail.htm?albumId=11584804",
  },
  "float": {
    spotify: "https://open.spotify.com/track/2pWF2KrGpipo8retKWllHb?si=2f57324808304bc2",
    youtube: "https://music.youtube.com/watch?v=d14JHFSAHgg&list=OLAK5uy_ng5bYrzYyitIB8Vs17xiK7QHNRVICutxg&index=4",
    melon: "https://www.melon.com/album/detail.htm?albumId=11584804",
  },
  "When You Fall in Love": {
    spotify: "https://open.spotify.com/track/1XiLSAkShXybwVFk9sF6aL?si=2cf49dd44b0e4e49",
    youtube: "https://music.youtube.com/watch?v=smt_XZFhI_U&list=OLAK5uy_l2tazGA6548lwno7siom5Bgw1T2uVdW04",
    melon: "https://www.melon.com/album/detail.htm?albumId=11779416",
  },
  "Hourglass": {
    spotify: "https://open.spotify.com/track/4r0OgYSXREW0nENAF3ylOH?si=5e235a772384492c",
    youtube: "https://music.youtube.com/watch?v=0yI0i58_BFk&list=OLAK5uy_nA4lAKhAmxrbakxzCrCahXyLeiNkNG1jw",
    melon: "https://www.melon.com/album/detail.htm?albumId=11881260",
  },
  "Limbo": {
    spotify: "https://open.spotify.com/track/1A4ZiQFBtHZOSbT5Ln4Bb0",
    youtube: "https://music.youtube.com/watch?v=RjY24ali-5I&list=OLAK5uy_krj6irPtUkUYKZMMDPgXrcl2zOppYIsLE",
    melon: "https://www.melon.com/album/detail.htm?albumId=12672536",
  },
  "Coast": {
    spotify: "https://open.spotify.com/track/0LkRLhrLkejLs9THMpZSB5?si=512cd09d7d9c45ea",
    youtube: "https://youtu.be/5Kh2QcuVi1Y?si=2swlCT_WchMtr-o-",
    melon: "https://www.melon.com/album/detail.htm?albumId=13318766",
  },
};

// [핵심 변경] async 함수로 변경하여 서버에서 직접 데이터를 가져옵니다.
export default async function Discography() {
  // useEffect 대신 바로 호출 (CORS 에러가 발생하지 않음)
  const songs = await getAttaSongs();

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-12 overflow-y-auto">
      
      {/* 상단 네비게이션 */}
      <div className="flex justify-between items-end mb-8 md:mb-12 relative z-10 px-2">
        <Link href="/" className="text-xs md:text-sm font-bold tracking-widest hover:text-green-400 transition-colors">
          ← BACK
        </Link>
        <h1 className="text-3xl md:text-6xl font-black tracking-tighter mix-blend-difference">
          DISCOGRAPHY
        </h1>
      </div>

      {/* 로딩 표시 제거 (서버에서 이미 데이터를 가져왔으므로 필요 없음) */}

      {/* 앨범 리스트 */}
      {songs.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-20 max-w-full mx-auto">
          {songs.map((song: any) => {
            
            // 이미지 HTTPS 강제 변환
            const highResCover = song.artworkUrl100
              .replace("100x100bb", "1000x1000bb")
              .replace("http://", "https://");

            // 링크 매칭 로직
            const lowerCaseTrackName = song.trackName.toLowerCase();
            const configKey = Object.keys(songLinks).find(
              key => key.toLowerCase() === lowerCaseTrackName
            );
            const config = configKey ? songLinks[configKey] : {};

            // 최종 링크 생성
            const spotifyUrl = config.spotify || `https://open.spotify.com/search/${encodeURIComponent("Atta " + song.trackName)}`;
            const melonUrl = config.melon || `https://www.melon.com/search/total/index.htm?q=${encodeURIComponent("Atta " + song.trackName)}`;
            const youtubeUrl = config.youtube || `https://music.youtube.com/search?q=${encodeURIComponent("Atta " + song.trackName)}`;
            const appleUrl = config.apple || song.trackViewUrl;

            return (
              <div 
                key={song.trackId} 
                className="group relative aspect-square bg-[#111] overflow-hidden border border-gray-900 hover:border-white/30 transition-all duration-500 rounded-sm"
              >
                {/* 앨범 커버 */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-30"
                  style={{ backgroundImage: `url(${highResCover})` }}
                />
                
                {/* 텍스트 & 버튼 컨테이너 */}
                <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent">
                  
                  {/* 곡 정보 */}
                  <div className="mb-2 md:mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="text-[9px] md:text-[10px] font-mono text-green-400 mb-0.5 block">
                      {song.releaseDate.substring(0, 4)}
                    </span>
                    <h2 className="text-lg md:text-xl font-bold leading-tight text-white truncate shadow-black drop-shadow-md">
                      {song.trackName}
                    </h2>
                  </div>

                  {/* 버튼 4개 (2x2 그리드) */}
                  <div className="grid grid-cols-2 gap-1.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    
                    {/* Melon */}
                    <a href={melonUrl} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center py-1.5 bg-[#00d344] hover:bg-[#00b33a] text-black text-[9px] font-bold rounded"
                    >
                      MELON
                    </a>

                    {/* YouTube Music */}
                    <a href={youtubeUrl} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center py-1.5 bg-[#FF0000] hover:bg-[#cc0000] text-white text-[9px] font-bold rounded"
                    >
                      YOUTUBE
                    </a>

                    {/* Apple Music */}
                    <a href={appleUrl} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center py-1.5 bg-white hover:bg-gray-200 text-black text-[9px] font-bold rounded"
                    >
                      APPLE
                    </a>

                    {/* Spotify */}
                    <a href={spotifyUrl} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black text-[9px] font-bold rounded"
                    >
                      SPOTIFY
                    </a>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}