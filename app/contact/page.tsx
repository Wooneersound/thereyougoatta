"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Contact() {
  // 입력된 내용을 저장하는 상태
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  // 입력할 때마다 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 보내기 버튼 클릭 시 실행 (메일 앱 연동)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:luj0815@naver.com?subject=[Contact] ${formData.subject}&body=From: ${formData.name}%0D%0A%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
  };

  // 이메일 주소 복사 기능
  const copyEmail = () => {
    navigator.clipboard.writeText("luj0815@naver.com");
    alert("이메일 주소가 복사되었습니다!");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-y-auto">
      
      {/* 1. 상단 네비게이션 */}
      <div className="fixed top-0 left-0 right-0 p-8 md:p-12 z-50 flex justify-between items-end bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
        <Link href="/" className="pointer-events-auto text-sm font-bold tracking-widest hover:text-purple-400 transition-colors">
          ← BACK
        </Link>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mix-blend-difference opacity-50">
          CONTACT
        </h1>
      </div>

      {/* 2. 메인 컨텐츠 영역 */}
      <div className="max-w-5xl mx-auto pt-40 pb-20 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* (1) 왼쪽: 연락처 정보 */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/3 space-y-12"
          >
            <div>
              <h2 className="text-sm text-purple-400 font-mono tracking-widest mb-4">GET IN TOUCH</h2>
              <p className="text-3xl font-bold leading-tight mb-6">
                Let's create something<br />
                <span className="text-gray-500">unreal together.</span>
              </p>
              <p className="text-gray-400 font-light leading-relaxed">
                협업 문의, 공연 제안, 혹은 단순한 피드백도 환영합니다.
                Atta의 음악과 함께하고 싶다면 언제든 연락주세요.
              </p>
            </div>

            {/* 이메일 정보 */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 tracking-widest mb-2">EMAIL</h3>
              <div className="flex items-center gap-4 group cursor-pointer" onClick={copyEmail}>
                <span className="text-xl md:text-2xl font-light border-b border-transparent group-hover:border-purple-500 group-hover:text-purple-300 transition-all">
                  luj0815@naver.com
                </span>
                {/* 복사 아이콘 */}
                <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* 소셜 미디어 (수정됨) */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 tracking-widest mb-2">SOCIAL</h3>
              <div className="flex gap-6 text-sm font-mono text-gray-400">
                <a 
                  href="https://www.instagram.com/thereyougoatta" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-purple-400 transition-colors"
                >
                  Instagram
                </a>
                <a 
                  href="https://www.youtube.com/@thereyougoatta" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-purple-400 transition-colors"
                >
                  YouTube
                </a>
                <a 
                  href="https://open.spotify.com/artist/3O5IyNbp87EQNoGuRLDQKn?si=ZJcMzur3Tr-lka-AD2wjIw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-purple-400 transition-colors"
                >
                  Spotify
                </a>
              </div>
            </div>
          </motion.div>

          {/* (2) 오른쪽: 이메일 작성 폼 */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-2/3 bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden"
          >
             {/* 배경 노이즈 */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              {/* 이름 입력 */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 mb-2 group-focus-within:text-purple-400 transition-colors">NAME</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-lg focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700"
                />
              </div>

              {/* 제목 입력 */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 mb-2 group-focus-within:text-purple-400 transition-colors">SUBJECT</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Cooperation Proposal"
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-lg focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700"
                />
              </div>

              {/* 메시지 입력 */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 mb-2 group-focus-within:text-purple-400 transition-colors">MESSAGE</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-transparent border-b border-gray-700 py-3 text-lg focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700 resize-none"
                />
              </div>

              {/* 전송 버튼 */}
              <button 
                type="submit"
                className="w-full py-4 bg-white text-black font-bold tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 mt-4"
              >
                SEND MESSAGE
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}