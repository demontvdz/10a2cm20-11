import React from 'react';
import { GameState, StageData, calculateProgressPercentage } from '../game/riverLogic';
import { Volume2, VolumeX, Pause, Play, Sparkles, Compass } from 'lucide-react';

interface HUDProps {
  gameState: GameState;
  stages: StageData[];
  isMuted: boolean;
  isPaused: boolean;
  onRowClick: () => void;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onOpenStageModal: (stageId: number) => void;
  onOpenLetterModal?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  gameState,
  stages,
  isMuted,
  isPaused,
  onRowClick,
  onTogglePause,
  onToggleMute,
  onOpenStageModal,
  onOpenLetterModal,
}) => {
  const { distance, completedStages, activeStageId, isModalOpen, isFinished, isRowing } = gameState;
  const progressPercent = calculateProgressPercentage(distance);

  // Find current era
  const currentStage = stages.find((s) => s.id === activeStageId) ||
    stages.slice().reverse().find((s) => distance >= s.distance - 400) ||
    stages[0];

  const isStopActive = activeStageId !== null && !completedStages.includes(activeStageId);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 flex flex-col justify-between p-3 md:p-6">
      {/* ======================================================== */}
      {/* 1. TOP HEADER DOCK: PROGRESS & VOYAGE STATUS */}
      {/* ======================================================== */}
      <header className="flex flex-col gap-2 max-w-4xl mx-auto w-full">
        <div className="pointer-events-auto bg-slate-950/85 backdrop-blur-md rounded-2xl border border-amber-500/30 p-3 md:px-5 md:py-3.5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 text-amber-50">
          {/* Left: Journey Title & Current Era */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center border border-amber-400 shadow-md shrink-0">
              <Compass className="w-6 h-6 text-amber-200 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-amber-400">
                  Dòng Sông Thời Gian
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  Đã mở: {completedStages.length}/5 chặng
                </span>
              </div>
              <h2 className="text-sm md:text-base font-bold text-amber-100 flex items-center gap-1.5">
                <span>{currentStage.title}</span>
                <span className="text-xs font-normal text-amber-300/80 hidden sm:inline">
                  • {currentStage.period}
                </span>
              </h2>
            </div>
          </div>

          {/* Right: Controls & Badges */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            {/* Badges preview */}
            <div className="hidden sm:flex items-center gap-1 mr-2 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-amber-500/20">
              {stages.map((stg) => {
                const unlocked = completedStages.includes(stg.id);
                return (
                  <button
                    key={stg.id}
                    onClick={() => onOpenStageModal(stg.id)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                      unlocked
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-400 shadow-sm cursor-pointer hover:scale-110'
                        : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-default'
                    }`}
                    title={unlocked ? `${stg.title} (Nhấp để đọc lại)` : `Chặng ${stg.id} (Chưa mở khóa)`}
                  >
                    {unlocked ? '✓' : stg.id}
                  </button>
                );
              })}
            </div>

            {/* 20/11 Gratitude Letter Button */}
            {onOpenLetterModal && (
              <button
                onClick={onOpenLetterModal}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-red-700 hover:from-red-600 hover:to-amber-500 text-amber-100 text-xs font-bold shadow-lg border border-amber-300/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Đọc bức thư tri ân cô giáo Lịch sử nhân ngày 20/11"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span className="hidden xs:inline">Thư Tri Ân</span> 20/11
              </button>
            )}

            {/* Mute Audio Toggle */}
            <button
              onClick={onToggleMute}
              className="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
              title={isMuted ? 'Bật âm thanh [M]' : 'Tắt âm thanh [M]'}
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Pause Toggle */}
            <button
              onClick={onTogglePause}
              className="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
              title={isPaused ? 'Tiếp tục [P]' : 'Tạm dừng [P]'}
              aria-label={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Journey Progress Bar */}
        <div className="pointer-events-auto bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-amber-500/20 shadow-md">
          <div className="flex items-center justify-between text-[11px] font-semibold text-amber-300 mb-1.5">
            <span>Khởi hành (0m)</span>
            <span className="text-amber-400 font-bold">{progressPercent}% lộ trình ({Math.round(distance)}m / 5000m)</span>
            <button
              onClick={() => onOpenStageModal(999)}
              className="text-amber-300 hover:text-amber-100 font-bold hover:underline cursor-pointer flex items-center gap-1"
              title="Nhấp để mở Thiệp chúc mừng 20/11"
            >
              <span>Bến Đỗ 20/11</span>
              <span>💌</span>
            </button>
          </div>

          <div className="relative w-full h-3 bg-slate-800/90 rounded-full overflow-visible border border-slate-700">
            {/* Fill bar */}
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />

            {/* Stage Milestone dots on the bar */}
            {stages.map((stg) => {
              const dotPercent = (stg.distance / 5000) * 100;
              const isDone = completedStages.includes(stg.id);
              const isCurrent = activeStageId === stg.id;

              return (
                <div
                  key={stg.id}
                  onClick={() => onOpenStageModal(stg.id)}
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-400 border-white shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                      : isCurrent
                      ? 'bg-amber-400 border-amber-200 ring-2 ring-amber-400 scale-125 animate-ping'
                      : 'bg-slate-700 border-slate-500'
                  }`}
                  style={{ left: `${dotPercent}%` }}
                  title={`Cột mốc ${stg.id}: ${stg.title}`}
                />
              );
            })}

            {/* Final Dock Marker at 100% */}
            <div
              onClick={() => onOpenStageModal(999)}
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                isFinished
                  ? 'bg-rose-500 border-amber-200 ring-4 ring-rose-400/50 scale-125 animate-bounce'
                  : 'bg-amber-600 border-amber-300'
              }`}
              style={{ left: '100%' }}
              title="Bến Tri Ân 20/11 - Mở thiệp chúc mừng"
            />
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MID SCREEN NOTIFICATION: REACHED HISTORICAL MILESTONE */}
      {/* ======================================================== */}
      {isStopActive && !isModalOpen && (
        <div className="pointer-events-auto self-center bg-gradient-to-r from-amber-950/95 via-slate-900/95 to-amber-950/95 border-2 border-amber-400 rounded-2xl p-4 md:p-5 shadow-[0_0_35px_rgba(245,158,11,0.5)] text-center max-w-md animate-bounce">
          <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Đã đến cột mốc lịch sử</span>
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <h3 className="text-lg md:text-xl font-black text-amber-100 mb-2">
            {currentStage.title}
          </h3>
          <p className="text-xs text-amber-200/80 mb-3">
            Thuyền đã dừng lại bên bờ sông lịch sử. Hãy mở trang sách để khám phá câu chuyện và câu hỏi thử thách!
          </p>
          <button
            onClick={() => onOpenStageModal(currentStage.id)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            Khám Phá Lịch Sử Ngay 📖
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. BOTTOM CONTROL DOCK: THE ROW BUTTON & INSTRUCTIONS */}
      {/* ======================================================== */}
      <footer className="pointer-events-auto flex flex-col items-center gap-2 pb-2">
        {/* Instruction pill */}
        <div className="px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/20 text-xs text-amber-300 font-medium shadow-lg flex items-center gap-2 text-center">
          {isStopActive ? (
            <span className="text-amber-400 font-bold">
              ⚓ Thuyền đã dừng tại cột mốc. Vui lòng khám phá lịch sử để tiếp tục!
            </span>
          ) : isFinished ? (
            <span className="text-rose-300 font-bold flex items-center gap-1.5">
              <span>🎉 Thuyền đã cập bến tri ân! Nhấn nút bên dưới để mở</span>
              <strong className="text-amber-300 underline">Thiệp chúc mừng 20/11</strong>
            </span>
          ) : (
            <span>
              💡 Nhấn nút <strong>CHÈO THUYỀN</strong> (hoặc nhấn <strong>phím Space / phím →</strong>) để tiến lên
            </span>
          )}
        </div>

        {/* MAIN ROWING / FINALE BUTTON */}
        <div className="relative group">
          {/* Ripple / pulse animation when ready */}
          {!isStopActive && !isModalOpen && (
            <div className={`absolute -inset-2 rounded-3xl blur-md group-hover:blur-lg transition-all ${
              isFinished ? 'bg-gradient-to-r from-rose-500/50 to-amber-500/50' : 'bg-gradient-to-r from-amber-500/30 to-yellow-500/30'
            }`} />
          )}

          <button
            onClick={isFinished ? onOpenLetterModal : onRowClick}
            disabled={isStopActive || isModalOpen || isPaused}
            className={`relative px-8 md:px-14 py-4 md:py-5 rounded-2xl md:rounded-3xl font-black text-base md:text-xl uppercase tracking-wider shadow-2xl transition-all duration-150 flex items-center gap-3 select-none ${
              isStopActive || isModalOpen || isPaused
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
                : isFinished
                ? 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white border-2 border-amber-300 animate-pulse shadow-[0_0_35px_rgba(244,63,94,0.7)] cursor-pointer hover:scale-105 active:scale-95'
                : isRowing
                ? 'bg-amber-400 text-slate-950 scale-95 shadow-[0_0_20px_rgba(251,191,36,0.8)] border-2 border-yellow-200'
                : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 active:scale-95 text-slate-950 border-2 border-amber-200 shadow-[0_8px_25px_rgba(245,158,11,0.5)] cursor-pointer'
            }`}
            title={isFinished ? 'Nhấp để mở Thiệp chúc mừng 20/11' : 'Nhấn để người lái đò chèo thuyền về phía trước'}
            aria-label={isFinished ? 'Mở Thiệp chúc mừng 20/11' : 'Chèo thuyền tiến lên'}
          >
            {/* Icon */}
            {isFinished ? (
              <span className="text-2xl">💌</span>
            ) : (
              <svg
                className={`w-6 h-6 md:w-7 md:h-7 transition-transform ${isRowing ? 'rotate-45' : 'group-hover:-rotate-12'}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="2" y1="22" x2="20" y2="4" strokeLinecap="round" />
                <ellipse cx="20" cy="4" rx="3" ry="5" transform="rotate(-45 20 4)" fill="currentColor" />
              </svg>
            )}

            <span>
              {isStopActive
                ? 'ĐÃ DỪNG TẠI CỘT MỐC'
                : isFinished
                ? 'MỞ THIỆP CHÚC MỪNG 20/11'
                : isRowing
                ? 'ĐANG RẼ SÓNG...'
                : 'CHÈO THUYỀN'}
            </span>

            {/* Keyboard shortcut hint */}
            {!isFinished && (
              <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded-md bg-black/20 text-slate-900 font-bold border border-black/10">
                Space / →
              </span>
            )}
          </button>
        </div>

        {/* Small speed indicator */}
        <div className="text-[11px] text-amber-200/70 font-mono">
          Vận tốc dòng nước: {Math.round(gameState.velocity)} km/h • Số lần vung chèo: {gameState.totalStrokes}
        </div>
      </footer>
    </div>
  );
};
