"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function About() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-y-auto">
      
      {/* 1. 상단 네비게이션 */}
      <div className="fixed top-0 left-0 right-0 p-8 md:p-12 z-50 flex justify-between items-end bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
        <Link href="/" className="pointer-events-auto text-sm font-bold tracking-widest hover:text-purple-400 transition-colors">
          ← BACK
        </Link>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mix-blend-difference opacity-50">
          ABOUT
        </h1>
      </div>

      {/* 2. 메인 컨텐츠 영역 */}
      <div className="max-w-4xl mx-auto pt-40 pb-20 px-4 md:px-8">
        
        {/* (1) 아티스트 사진 영역 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative w-full aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden mb-16 group shadow-2xl shadow-purple-900/20"
        >
          <Image
            src="/images/atta-about.jpg" 
            alt="Atta Members"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            priority 
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* (2) 텍스트 영역 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row gap-12 md:gap-20"
        >
          {/* 왼쪽: 팀 이름 */}
          <div className="md:w-1/3">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              Atta
            </h2>
            <p className="text-purple-400 font-mono text-sm tracking-widest mb-6">
              R&B SOUL / AMBIENT POP
            </p>
            <div className="h-0.5 w-16 bg-purple-500" /> 
          </div>
          
          {/* 오른쪽: 상세 설명 & 멤버 소개 */}
          <div className="md:w-2/3 flex flex-col gap-10">
            
            {/* [KR] 한국어 소개 */}
            <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-gray-200">
              <p>
                Atta(아타)는 몽환적인 사운드와 감성적인 가사로 청춘의 이야기를 풀어내는 2인조 프로듀싱 팀입니다.
              </p>
              <p>
                R&B Soul과 인디를 기반으로, 따뜻한 기타 톤과 앰비언트 질감을 통해 편안한 몰입감을 선사합니다.
              </p>
              <p>
                반복되는 일상 속에서 마주하는 고민과 감정들을 담아, 듣는 이들에게 <span className="text-purple-300">조용한 위로와 공감</span>을 건넵니다.
              </p>
            </div>

            {/* 구분선 */}
            <div className="w-full h-px bg-gray-800" />

            {/* [EN] 영어 소개 (추가됨!) */}
            <div className="space-y-4 text-base md:text-lg font-light leading-relaxed text-gray-400 font-sans">
              <p>
                Atta is a producing duo that unfolds stories of youth through dreamlike sounds and emotional lyrics.
              </p>
              <p>
                Based on R&B Soul and Indie, we deliver comfortable immersion through warm guitar tones and ambient textures.
              </p>
              <p>
                Capturing the worries and emotions faced in repetitive daily life, we offer <span className="text-purple-400/70">quiet comfort and empathy</span> to our listeners.
              </p>
            </div>

            {/* [MEMBERS] 멤버 프로필 */}
            <div className="mt-4 pt-8 border-t border-gray-800">
              <h3 className="text-xs font-bold text-gray-500 tracking-widest mb-4">MEMBERS</h3>
              
              <div className="space-y-4 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-white text-lg font-bold">Jang Dong-il</span>
                  <span className="text-purple-400 text-sm">Vocal / Guitar</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-white text-lg font-bold">Lee Woo-jin</span>
                  <span className="text-purple-400 text-sm">Guitar / Mix Engineer</span>
                </div>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </main>
  );
}