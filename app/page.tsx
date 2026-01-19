"use client";

import Link from "next/link";
import BlobScene from "@/components/BlobScene";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-black text-white overflow-hidden relative">
      
      {/* 1. 3D 이끼 덩어리 배경 */}
      <div className="absolute inset-0 z-0">
        <BlobScene />
      </div>

      {/* 2. 오른쪽 상단 메뉴 (강제 고정, 디자인 통일) */}
      <nav className="fixed top-8 right-8 z-50 flex flex-col items-end gap-1 pointer-events-auto mix-blend-difference">
        
        <Link href="/about" className="group">
          <span className="text-xl md:text-3xl font-bold tracking-tight group-hover:italic group-hover:text-purple-400 transition-all duration-300">
            ABOUT
          </span>
        </Link>

        <Link href="/discography" className="group">
          <span className="text-xl md:text-3xl font-bold tracking-tight group-hover:italic group-hover:text-purple-400 transition-all duration-300">
            DISCOGRAPHY
          </span>
        </Link>

        <Link href="/visuals" className="group">
          <span className="text-xl md:text-3xl font-bold tracking-tight group-hover:italic group-hover:text-purple-400 transition-all duration-300">
            VISUALS
          </span>
        </Link>

        {/* Contact도 위 메뉴들과 똑같은 스타일로 변경 */}
        <Link href="/contact" className="group">
          <span className="text-xl md:text-3xl font-bold tracking-tight group-hover:italic group-hover:text-purple-400 transition-all duration-300">
            CONTACT
          </span>
        </Link>

      </nav>

      {/* 3. 중앙 타이틀 (선명하게 복구) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mix-blend-difference">
        <h1 className="text-[15vw] font-black tracking-tighter leading-none text-white select-none">
          Atta
        </h1>
        <p className="text-sm md:text-xl font-light tracking-[0.5em] mt-2 opacity-60">
          OFFICIAL
        </p>
      </div>

      {/* 4. 하단 카피라이트 */}
      <div className="absolute bottom-8 w-full text-center z-10 pointer-events-none mix-blend-difference">
        <p className="text-xs text-gray-500 tracking-[0.3em]">
          © 2025 ATTA OFFICIAL.
        </p>
      </div>

    </main>
  );
}