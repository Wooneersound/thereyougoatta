"use client";

// 3D 관련 기능(Canvas, Three.js 등)을 아예 불러오지 않습니다.
// 에러가 날 여지를 0%로 만들기 위함입니다.

export default function BlobScene() {
  return (
    // 3D 화면 대신 투명한 빈 박스만 렌더링합니다.
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* 현재 3D 기능이 꺼져 있습니다 */}
    </div>
  );
}