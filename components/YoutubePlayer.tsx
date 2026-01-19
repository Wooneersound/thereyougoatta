"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function YoutubePlayer({ video }: { video: any }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="aspect-video bg-gray-900 border border-gray-800 relative group overflow-hidden shadow-2xl">
      {!isPlaying ? (
        // 1. 재생 전: 고화질 썸네일 보여주기
        <div 
          className="absolute inset-0 bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${video.thumbnail})` }}
          onClick={() => setIsPlaying(true)}
        >
          {/* 어두운 오버레이 */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          
          {/* 재생 버튼 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-purple-600 group-hover:border-transparent transition-all duration-300">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // 2. 재생 클릭 후: 실제 유튜브 iframe 로드 (무조건 재생됨)
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      
      {/* 노이즈 효과 (재생 전만) */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
      )}
    </div>
  );
}