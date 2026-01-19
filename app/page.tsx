"use client";

import Link from "next/link";
// import BlobScene from "@/components/BlobScene"; // 범인 1호 (3D) 격리
// import { motion } from "framer-motion"; // 범인 2호 (애니메이션) 격리

export default function Home() {
  return (
    // motion.main 대신 그냥 main 사용 (투명화 해제)
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* 1. 배경 (3D 대신 그냥 어두운 배경) */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-black via-[#111] to-black opacity-80" />
      </div>

      {/* 2. 메인 컨텐츠 (z-index로 위에 띄움) */}
      <div className="relative z-10 text-center space-y-12">
        
        {/* 타이틀 */}
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mix-blend-difference">
          Atta
        </h1>

        {/* 메뉴 링크들 */}
        <nav className="flex flex-col md:flex-row gap-8 md:gap-16 text-lg md:text-xl font-light tracking-[0.2em] text-gray-400">
          <Link href="/visuals" className="hover:text-white transition-colors hover:scale-110 duration-300">
            VISUALS
          </Link>
          <Link href="/about" className="hover:text-purple-400 transition-colors hover:scale-110 duration-300">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors hover:scale-110 duration-300">
            CONTACT
          </Link>
        </nav>

      </div>

      {/* 3. 하단 저작권 표시 */}
      <footer className="absolute bottom-8 text-xs text-gray-600 font-mono tracking-widest">
        © 2026 Atta. All Rights Reserved.
      </footer>

    </main>
  );
}