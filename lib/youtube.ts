// src/lib/youtube.ts

// ▼▼▼ 여기에 발급받은 API 키를 넣어주세요! ▼▼▼
const YOUTUBE_API_KEY = "AIzaSyCLwg_MrWi0QdMisrw31Qsvp4sDjMwC-hI"; 

export async function getAttaVideos() {
  // Atta의 영상 ID 리스트 (순서대로: Hourglass, WYFIL, de Pluto, What's on, Playlist)
  const videoIds = [
    "w-OG_Df-_3Y", // Hourglass
    "smt_XZFhI_U", // When You Fall In Love
    "xc541HBXtJM", // de Pluto
    "bJiT_lF4WjU", // What's on my mind
    "5rUyeJGG9xM", // Playlist
  ];

  try {
    // API 호출 (한 번에 여러 영상 정보를 싹 가져옵니다)
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } } // 1시간 캐싱
    );

    if (!res.ok) throw new Error("YouTube API Error");

    const data = await res.json();
    
    // 가져온 데이터를 우리가 쓰기 편하게 정리
    // (API가 주는 순서가 뒤죽박죽일 수 있어서, 우리 ID 순서대로 재정렬합니다)
    const sortedVideos = videoIds.map((id) => {
      const item = data.items.find((v: any) => v.id === id);
      if (!item) return null;

      const snippet = item.snippet;
      return {
        id: id,
        title: snippet.title, // 제목 자동
        year: snippet.publishedAt.substring(0, 4), // 연도 자동
        // 썸네일: maxres(초고화질) -> standard -> high 순서로 있는 거 찾기
        thumbnail: 
          snippet.thumbnails.maxres?.url || 
          snippet.thumbnails.standard?.url || 
          snippet.thumbnails.high?.url,
        // 카테고리는 제목 보고 대충 자동 분류 (필요하면 수정 가능)
        category: snippet.title.includes("MV") ? "MUSIC VIDEO" : 
                 snippet.title.includes("Live") ? "LIVE CLIP" : 
                 snippet.title.includes("Visualizer") ? "VISUALIZER" : "OFFICIAL AUDIO",
      };
    }).filter(Boolean); // 없는 거 제거

    return sortedVideos;

  } catch (error) {
    console.error("Failed to fetch YouTube data:", error);
    return [];
  }
}