// src/lib/appleMusic.ts

export async function getAttaSongs() {
  try {
    // 1. iTunes Public API 사용 (토큰 필요 없음!)
    // id=1764215338 (Atta)
    // entity=song (곡 정보만 가져오기)
    // country=kr (한국 스토어 기준)
    const res = await fetch(
      "https://itunes.apple.com/lookup?id=1764215338&entity=song&country=kr&limit=20&sort=recent",
      {
        next: { revalidate: 3600 }, // 1시간마다 갱신
      }
    );

    if (!res.ok) throw new Error("Failed to fetch music data");

    const data = await res.json();
    
    // 2. 데이터 정제
    // iTunes API는 첫 번째 결과가 '아티스트 정보'이고, 두 번째부터가 '곡 정보'입니다.
    // wrapperType이 'track'인 것만 걸러내서 리턴합니다.
    const songs = data.results.filter((item: any) => item.wrapperType === "track");
    
    return songs;

  } catch (error) {
    console.error("iTunes API Error:", error);
    return [];
  }
}