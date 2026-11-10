import React from 'react';

export const SchoolBadge: React.FC = () => {
  return (
    <aside 
      aria-label="Thông tin trường và lớp"
      className="fixed top-2.5 left-2.5 md:top-4 md:left-4 z-50 pointer-events-auto select-none"
    >
      <div className="flex items-center gap-2 md:gap-3 px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all hover:scale-105 group">
        {/* School Logo */}
        <div className="relative shrink-0">
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-amber-300 shadow-md bg-white p-0.5">
            <img
              src="/assets/aistudio/870868051_1848974316550554_7680551077917192291_n_1cdd2ada.jfif"
              alt="Logo Trường THCS và THPT Sư Phạm"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute -inset-0.5 rounded-full border border-amber-400/50 animate-ping opacity-40 pointer-events-none" />
        </div>

        {/* School & Class Text */}
        <div className="flex flex-col text-left font-sans">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-amber-200 line-clamp-1">
            THCS & THPT SƯ PHẠM
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] md:text-[11px] font-extrabold text-white px-1.5 py-0.2 rounded-md bg-gradient-to-r from-red-600 to-rose-600 shadow-xs">
              Lớp 10A2
            </span>
            <span className="text-[9px] md:text-[10px] text-amber-300/80 hidden sm:inline font-medium">
              • Tri ân 20/11
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
