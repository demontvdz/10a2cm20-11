import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface TitleScreenProps {
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-amber-50 select-none overflow-hidden font-serif-vintage">
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Golden Dawn Light Beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full blur-[100px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(217,119,6,0.2) 60%, transparent 80%)',
          }}
        />

        {/* Ambient Mist & Fog SVG */}
        <svg className="absolute bottom-20 w-[2000px] h-64 opacity-25 animate-pulse" preserveAspectRatio="none">
          <path
            d="M0,80 Q300,40 600,70 T1200,60 T1800,80 L2000,100 L2000,200 L0,200 Z"
            fill="#93C5FD"
          />
        </svg>

        {/* Water wave shimmers at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#020617] via-[#0F172A]/90 to-transparent">
          <svg className="w-full h-24 opacity-30">
            <path
              d="M0,20 Q120,10 240,20 T480,20 T720,20 T960,20 T1200,20 T1440,20 L1440,60 L0,60 Z"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
            />
            <path
              d="M0,35 Q150,25 300,35 T600,35 T900,35 T1200,35 T1500,35 L1500,70 L0,70 Z"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      {/* Top Emblem & 20/11 Badge */}
      <header className="relative z-10 flex flex-col items-center pt-4 md:pt-8 text-center animate-fadeIn">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-400/50 text-amber-200 font-sans text-xs md:text-sm font-bold tracking-wide shadow-xl mb-3">
          <img
            src="/assets/aistudio/870868051_1848974316550554_7680551077917192291_n_1cdd2ada.jfif"
            alt="Logo trường"
            className="w-6 h-6 rounded-full bg-white object-contain"
          />
          <span className="text-amber-100 font-black">THCS & THPT SƯ PHẠM</span>
          <span className="text-rose-400">• Lớp 10A2 Kính Tặng 20/11</span>
        </div>
      </header>

      {/* Center Piece: Title & Ferryman Boat Showcase */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto my-auto px-4">
        {/* Animated Ferryman Boat Centerpiece */}
        <div className="relative mb-6 animate-bounce" style={{ animationDuration: '3.5s' }}>
          {/* Subtle water ripple ellipse */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full bg-cyan-400/20 blur-sm animate-pulse" />

          {/* Boat with Ferryman Illustration SVG */}
          <svg width="200" height="110" viewBox="0 0 200 110" className="drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]">
            {/* Wooden Boat Hull */}
            <path d="M20,75 Q100,100 180,70 Q105,85 20,75 Z" fill="#451A03" stroke="#B45309" strokeWidth="1.5" />
            <path d="M15,68 Q100,95 185,64 L180,70 Q100,100 20,75 Z" fill="#78350F" />
            {/* Seat plank */}
            <rect x="75" y="70" width="30" height="5" fill="#92400E" rx="1" />
            {/* Lantern on bow */}
            <circle cx="180" cy="54" r="5" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />
            <line x1="180" y1="54" x2="180" y2="64" stroke="#451A03" strokeWidth="2" />

            {/* Ferryman */}
            <g transform="translate(85, 20)">
              {/* Torso */}
              <path d="M5,28 Q12,25 20,28 L23,48 L2,48 Z" fill="#4E342E" />
              {/* Belt */}
              <line x1="2" y1="38" x2="22" y2="38" stroke="#D97706" strokeWidth="1.5" />
              {/* Head */}
              <circle cx="12" cy="20" r="6" fill="#D7A17C" />
              {/* Conical Hat (Nón lá) */}
              <polygon points="12,4 -6,22 30,22" fill="#FDE68A" stroke="#CA8A04" strokeWidth="1" />
              {/* Oar held in hand */}
              <line x1="-15" y1="34" x2="65" y2="34" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
              <path d="M50,30 L72,28 Q80,34 72,40 L50,37 Z" fill="#92400E" />
            </g>
          </svg>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)] uppercase mb-3">
          DÒNG SÔNG THỜI GIAN
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-amber-300 font-semibold italic mb-5">
          Một hành trình qua những trang sử Việt Nam
        </p>

        {/* Lead-in narrative */}
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-lg mb-8">
          Bạn đã bao giờ muốn ngược dòng thời gian để tận mắt chứng kiến những câu chuyện lịch sử hào hùng?
          <br className="hidden sm:inline" />
          Hãy lên thuyền. Một hành trình đặc biệt đang chờ đón bạn!
        </p>

        {/* Primary Start CTA Button */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 blur-md opacity-75 group-hover:opacity-100 transition duration-300" />
          <button
            data-start="true"
            onClick={onStart}
            className="relative px-8 sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-sans font-black text-base sm:text-lg uppercase tracking-wider shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3"
          >
            <Compass className="w-6 h-6 text-slate-950" />
            <span>BẮT ĐẦU HÀNH TRÌNH</span>
          </button>
        </div>

        {/* Clean control hints */}
        <div className="mt-6 text-xs text-amber-200/60 font-sans tracking-wide">
          Nhấn [Enter] hoặc [Phím Space] để bắt đầu • Hỗ trợ cả chuột, phím và màn hình cảm ứng
        </div>
      </main>

      {/* Footer Quote */}
      <footer className="relative z-10 pb-4 text-center text-xs text-amber-200/90 font-sans">
        Dành riêng kính tặng Cô Chu Ngọc Quỳnh từ Tập thể Lớp 10A2 – Trường THCS & THPT Sư Phạm
      </footer>
    </div>
  );
};
