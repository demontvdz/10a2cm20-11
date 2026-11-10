import React, { useMemo } from 'react';
import { GameState, StageData, TOTAL_DISTANCE } from '../game/riverLogic';

interface RiverSceneProps {
  gameState: GameState;
  stages: StageData[];
  onOpenStageModal: (stageId: number) => void;
}

export const RiverScene: React.FC<RiverSceneProps> = ({
  gameState,
  stages,
  onOpenStageModal,
}) => {
  const { distance, rowCycle, isRowing, activeStageId } = gameState;

  // Determine current ambient color theme interpolated or based on distance
  const currentStage = useMemo(() => {
    for (let i = stages.length - 1; i >= 0; i--) {
      if (distance >= stages[i].distance - 400) {
        return stages[i];
      }
    }
    return stages[0];
  }, [distance, stages]);

  // Compute camera parallax offsets based on distance
  // River scrolls infinitely from right to left as boat rows forward
  const farParallax = (distance * 0.15) % 1200;
  const midParallax = (distance * 0.4) % 1200;
  const bankParallax = (distance * 0.8) % 800;
  const waterParallax = (distance * 1.2) % 600;

  // Boat bobbing physics calculation
  const boatBobY = Math.sin(Date.now() / 400) * 4 + (isRowing ? Math.sin(rowCycle * Math.PI) * 6 : 0);
  const boatPitch = (isRowing ? Math.sin(rowCycle * Math.PI) * 4 : Math.sin(Date.now() / 600) * 1.5);

  // Oar rotation angle based on rowCycle (0 to 1)
  // At rowCycle 0: raised back ready to strike
  // At rowCycle 0.3: dipped into water, pushing hard
  // At rowCycle 0.7: finishing stroke, lifting up
  // At rowCycle 1: returning to ready
  const oarAngle = isRowing
    ? -25 + Math.sin(rowCycle * Math.PI) * 45
    : -10 + Math.sin(Date.now() / 500) * 3;

  const oarDipDepth = isRowing ? Math.sin(rowCycle * Math.PI) * 14 : 0;

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none transition-colors duration-1000"
      style={{
        background: `linear-gradient(to bottom, ${currentStage.theme.skyTop} 0%, ${currentStage.theme.skyBottom} 50%, ${currentStage.theme.riverColor} 75%, #0B192C 100%)`,
      }}
    >
      {/* 1. SKY & SUN / MOON / ATMOSPHERE */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Celestial body (Sun/Moon/Dawn orb) */}
        <div
          className="absolute rounded-full blur-sm transition-all duration-1000"
          style={{
            top: '12%',
            left: '68%',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(254,240,138,0.95) 0%, rgba(251,191,36,0.6) 50%, rgba(245,158,11,0) 80%)',
            boxShadow: '0 0 60px rgba(251,191,36,0.5)',
          }}
        />

        {/* Soft Organic Floating Clouds */}
        <svg
          className="absolute top-4 w-full opacity-35"
          height="90"
          style={{ transform: `translateX(-${(distance * 0.05) % 400}px)` }}
        >
          <g fill="white" filter="blur(1px)">
            {/* Cloud Cluster 1 */}
            <ellipse cx="140" cy="40" rx="60" ry="18" />
            <circle cx="125" cy="32" r="24" />
            <circle cx="160" cy="34" r="20" />
            {/* Cloud Cluster 2 */}
            <ellipse cx="580" cy="48" rx="80" ry="20" />
            <circle cx="560" cy="38" r="28" />
            <circle cx="610" cy="42" r="22" />
            {/* Cloud Cluster 3 */}
            <ellipse cx="1100" cy="38" rx="75" ry="19" />
            <circle cx="1080" cy="30" r="26" />
            <circle cx="1130" cy="33" r="22" />
          </g>
        </svg>

        {/* Birds & Flying Creatures across the sky matching historical eras */}
        <div
          className="absolute top-14 left-1/4 flex gap-8 transition-opacity duration-700"
          style={{ transform: `translateX(-${(distance * 0.12) % 700}px)` }}
        >
          {currentStage.id === 1 ? (
            /* Chim Lạc Đông Sơn huyền thoại */
            <div className="flex items-center gap-6 opacity-75 drop-shadow-md">
              <svg width="48" height="24" viewBox="0 0 60 30" fill="none">
                <path d="M2,15 Q20,2 45,5 Q55,6 58,10 Q45,14 30,22 Q18,28 2,15 Z" fill="#FDE047" opacity="0.9" />
                <path d="M20,10 Q35,-5 52,0" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg width="36" height="18" viewBox="0 0 60 30" fill="none" className="mt-3">
                <path d="M2,15 Q20,2 45,5 Q55,6 58,10 Q45,14 30,22 Q18,28 2,15 Z" fill="#FEF08A" opacity="0.8" />
              </svg>
            </div>
          ) : currentStage.id === 5 ? (
            /* Đàn chim bồ câu trắng hòa bình */
            <div className="flex items-center gap-6 opacity-85 drop-shadow-sm">
              <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                <path d="M4,16 Q10,4 20,8 Q28,2 32,8 Q24,14 16,18 Z" fill="#FFFFFF" />
                <circle cx="28" cy="8" r="1.5" fill="#000000" />
              </svg>
              <svg width="28" height="16" viewBox="0 0 34 20" fill="none" className="-mt-2">
                <path d="M4,16 Q10,4 20,8 Q28,2 32,8 Q24,14 16,18 Z" fill="#F8FAFC" />
              </svg>
            </div>
          ) : (
            /* Chim én / chim bói cá ven sông */
            <div className="flex gap-6 opacity-45">
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M2 12 Q7 2 14 8 Q21 2 26 12" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg width="22" height="14" viewBox="0 0 28 16" fill="none" className="mt-2">
                <path d="M2 12 Q7 2 14 8 Q21 2 26 12" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* 2. DISTANT MAJESTIC MOUNTAINS (Parallax Far) */}
      <div
        className="absolute w-[2400px] h-64 pointer-events-none transition-colors duration-1000"
        style={{
          top: '26%',
          left: `-${farParallax}px`,
        }}
      >
        <svg viewBox="0 0 2400 240" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          {/* Far mountain silhouette */}
          <path
            d="M0,180 L140,90 L260,150 L420,60 L580,160 L720,80 L880,170 L1020,70 L1180,150 L1320,60 L1480,160 L1620,80 L1780,150 L1940,65 L2100,165 L2260,75 L2400,180 L2400,240 L0,240 Z"
            fill={currentStage.theme.mountainFar}
            opacity="0.65"
          />
        </svg>
      </div>

      {/* 3. MID-GROUND MOUNTAINS & WOODLAND (Parallax Mid) */}
      <div
        className="absolute w-[2400px] h-60 pointer-events-none transition-colors duration-1000"
        style={{
          top: '32%',
          left: `-${midParallax}px`,
        }}
      >
        <svg viewBox="0 0 2400 240" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,160 Q160,80 320,150 Q480,70 640,140 Q800,60 960,150 Q1120,70 1280,140 Q1440,60 1600,150 Q1760,80 1920,140 Q2080,70 2240,150 Q2340,100 2400,160 L2400,240 L0,240 Z"
            fill={currentStage.theme.mountainMid}
            opacity="0.85"
          />
        </svg>
      </div>

      {/* 4. NORTH RIVERBANK (BỜ BẮC - Scenery & Historical Landmarks along the route) */}
      <div
        className="absolute w-[2000px] h-48 pointer-events-none"
        style={{
          top: '38%',
          left: `-${bankParallax}px`,
        }}
      >
        <svg viewBox="0 0 2000 180" className="w-full h-full" preserveAspectRatio="none">
          {/* Lush riverbank profile */}
          <path
            d="M0,80 Q250,50 500,80 Q750,55 1000,80 Q1250,50 1500,80 Q1750,60 2000,80 L2000,180 L0,180 Z"
            fill={currentStage.theme.bankFlora}
          />
          {/* Bank vegetation tufts & bamboo silhouettes */}
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 85 + 20}, ${50 + (i % 3) * 8})`}>
              {/* Bamboo/tree trunks */}
              <line x1="0" y1="35" x2="0" y2="0" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" />
              <circle cx="-3" cy="-5" r="10" fill="#047857" opacity="0.9" />
              <circle cx="3" cy="-7" r="12" fill="#059669" opacity="0.95" />
              <circle cx="0" cy="-14" r="9" fill="#10B981" opacity="0.8" />
            </g>
          ))}
        </svg>
      </div>

      {/* 4.5 TRADITIONAL VĂN LANG STILT HOUSES (NHÀ NỌC & NHÀ MÁI VỒNG LẠC VIỆT) */}
      {/* Appears authentically along the riverbank during the Stage 1 Lạc Việt journey */}
      <div className="absolute inset-0 pointer-events-none z-15">
        {[
          { dist: 160, top: '36%', scale: 0.88, type: 'noc', name: 'Nhà Nọc Lạc Việt' },
          { dist: 350, top: '34%', scale: 0.82, type: 'vong', name: 'Nhà Mái Vồng Văn Lang' },
          { dist: 530, top: '37%', scale: 0.95, type: 'noc', name: 'Nhà Sàn Văn Lang' },
          { dist: 710, top: '35%', scale: 1.05, type: 'vong', name: 'Nhà Mái Vồng Sông Hồng' },
          { dist: 940, top: '36%', scale: 0.85, type: 'noc', name: 'Nhà Nọc Lạc Việt' },
        ].map((house, idx) => {
          const houseDistOffset = house.dist - distance;
          const houseScreenX = window.innerWidth * 0.35 + houseDistOffset * 2.2;

          if (houseScreenX < -300 || houseScreenX > window.innerWidth + 350) return null;

          return (
            <div
              key={idx}
              className="absolute transition-transform"
              style={{
                left: `${houseScreenX}px`,
                top: house.top,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative group flex flex-col items-center">
                {house.type === 'noc' ? (
                  /* Frontal View: Nhà Nọc Văn Lang (Đúng chuẩn kiến trúc trên trống đồng) */
                  <svg width="130" height="100" viewBox="0 0 140 110" className="overflow-visible drop-shadow-md">
                    {/* Shadow */}
                    <ellipse cx="70" cy="98" rx="52" ry="7" fill="#064E3B" opacity="0.4" />
                    {/* Wooden Stilts */}
                    <g stroke="#3E2723" strokeWidth="3" strokeLinecap="round">
                      <line x1="26" y1="62" x2="26" y2="96" />
                      <line x1="44" y1="62" x2="44" y2="96" />
                      <line x1="62" y1="62" x2="62" y2="96" />
                      <line x1="78" y1="62" x2="78" y2="96" />
                      <line x1="96" y1="62" x2="96" y2="96" />
                      <line x1="114" y1="62" x2="114" y2="96" />
                    </g>
                    {/* Floor Deck Platform */}
                    <rect x="18" y="58" width="104" height="6" fill="#78350F" rx="1.5" stroke="#451A03" strokeWidth="1" />
                    {[22, 34, 46, 58, 70, 82, 94, 106, 118].map((lx) => (
                      <circle key={lx} cx={lx} cy="61" r="2.5" fill="#B45309" stroke="#451A03" strokeWidth="0.8" />
                    ))}
                    {/* House Front Walls with Lattice Windows */}
                    <rect x="36" y="28" width="68" height="30" fill="#FBF3DB" stroke="#78350F" strokeWidth="1.5" />
                    <rect x="62" y="34" width="16" height="24" fill="#3E2723" />
                    <rect x="42" y="34" width="14" height="12" fill="#EAD8B1" stroke="#78350F" strokeWidth="1" />
                    <polygon points="49,35 55,40 49,45 43,40" fill="#78350F" opacity="0.6" />
                    <rect x="84" y="34" width="14" height="12" fill="#EAD8B1" stroke="#78350F" strokeWidth="1" />
                    <polygon points="91,35 97,40 91,45 85,40" fill="#78350F" opacity="0.6" />
                    {/* Ceramic Jar */}
                    <path d="M54,58 Q50,54 52,48 Q54,46 56,46 Q58,46 60,48 Q62,54 58,58 Z" fill="#C2410C" stroke="#7C2D12" strokeWidth="0.8" />
                    {/* Triangular Thatched Roof */}
                    <path d="M70,8 Q105,42 128,60 Q122,63 116,61 Q70,48 24,61 Q18,63 12,60 Q35,42 70,8 Z" fill="#EAB308" stroke="#A16207" strokeWidth="1.5" />
                    <path d="M68,10 Q85,35 118,58" stroke="#CA8A04" strokeWidth="1.5" fill="none" opacity="0.7" />
                    <path d="M72,10 Q55,35 22,58" stroke="#CA8A04" strokeWidth="1.5" fill="none" opacity="0.7" />
                    <path d="M70,22 Q88,38 104,46 Q98,48 92,47 Q70,41 48,47 Q42,48 36,46 Q52,38 70,22 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" opacity="0.9" />
                    {/* Central Vertical Post (Cột Nọc) */}
                    <line x1="70" y1="6" x2="70" y2="96" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
                    <path d="M66,6 Q70,0 74,6 Q70,12 66,6 Z" fill="#78350F" />
                  </svg>
                ) : (
                  /* Perspective Curved Roof: Nhà Mái Vồng */
                  <svg width="135" height="100" viewBox="0 0 150 110" className="overflow-visible drop-shadow-md">
                    <ellipse cx="75" cy="98" rx="55" ry="7" fill="#064E3B" opacity="0.4" />
                    <g stroke="#3E2723" strokeWidth="3" strokeLinecap="round">
                      <line x1="30" y1="64" x2="30" y2="96" />
                      <line x1="50" y1="64" x2="50" y2="96" />
                      <line x1="75" y1="64" x2="75" y2="96" />
                      <line x1="100" y1="64" x2="100" y2="96" />
                      <line x1="120" y1="64" x2="120" y2="96" />
                    </g>
                    <polygon points="20,64 125,58 135,66 28,72" fill="#78350F" stroke="#451A03" strokeWidth="1" />
                    <polygon points="35,40 115,36 115,60 35,66" fill="#FBF3DB" stroke="#78350F" strokeWidth="1" />
                    <rect x="45" y="44" width="14" height="18" fill="#3E2723" />
                    <path d="M15,48 Q40,16 75,18 Q115,16 142,46 Q135,50 120,44 Q75,34 28,48 Z" fill="#EAB308" stroke="#A16207" strokeWidth="1.5" />
                    <path d="M20,44 Q75,22 135,42" stroke="#CA8A04" strokeWidth="2" fill="none" opacity="0.8" />
                    <line x1="35" y1="12" x2="35" y2="94" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M30,12 Q35,8 42,10 Q35,14 30,12 Z" fill="#B45309" />
                  </svg>
                )}
                <span className="mt-0.5 px-2 py-0.5 rounded-full bg-slate-950/80 text-[9px] font-bold text-amber-200 border border-amber-400/40 opacity-75 shadow-xs">
                  {house.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. HISTORICAL MILESTONES LOCATED DIRECTLY ALONG THE RIVER */}
      <div className="absolute inset-0 pointer-events-auto">
        {stages.map((stage) => {
          // Calculate screen position relative to boat's current distance
          // Center of the screen is boat position (e.g. 35% from left)
          // Each distance unit translates to screen pixels
          const distanceOffset = stage.distance - distance;
          // Scale: 1 unit of distance = ~2.2px
          const screenX = window.innerWidth * 0.35 + distanceOffset * 2.2;

          // Render landmark only if roughly within visible horizon
          if (screenX < -300 || screenX > window.innerWidth + 400) {
            return null;
          }

          const isCurrentActive = activeStageId === stage.id;
          const isCompleted = gameState.completedStages.includes(stage.id);

          return (
            <div
              key={stage.id}
              className="absolute z-20 transition-transform duration-300"
              style={{
                left: `${screenX}px`,
                top: '40%',
                transform: 'translate(-50%, -60%)',
              }}
            >
              {/* Landmark Architecture / Monument Pillar */}
              <div
                onClick={() => onOpenStageModal(stage.id)}
                className={`group cursor-pointer flex flex-col items-center transition-all duration-300 ${
                  isCurrentActive ? 'scale-110 drop-shadow-[0_0_25px_rgba(250,204,21,0.9)] animate-bounce' : 'hover:scale-105'
                }`}
                title={`Nhấp để khám phá: ${stage.title}`}
              >
                {/* Visual landmark based on stage era */}
                <div className="relative flex flex-col items-center">
                  {/* Glowing halo */}
                  <div
                    className={`absolute inset-0 rounded-2xl blur-xl ${
                      isCurrentActive ? 'bg-amber-400/50 animate-pulse' : 'bg-amber-400/20'
                    }`}
                  />

                  {/* Diorama Painting Card with Historical Gold Frame */}
                  <div
                    className={`relative w-28 h-20 sm:w-36 sm:h-24 md:w-44 md:h-28 rounded-2xl overflow-hidden border-2 md:border-3 shadow-2xl transition-all ${
                      isCompleted
                        ? 'border-emerald-400 ring-2 ring-emerald-500/50'
                        : isCurrentActive
                        ? 'border-amber-400 ring-4 ring-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,0.8)] scale-105'
                        : 'border-amber-200/60'
                    }`}
                  >
                    {stage.imageUrl ? (
                      <img
                        src={stage.imageUrl}
                        alt={stage.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

                    {/* Stage Emblem Seal on Top-Left Corner */}
                    <div
                      className={`absolute top-1.5 left-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center p-0.5 border shadow-md ${
                        isCompleted
                          ? 'bg-emerald-900/90 text-emerald-300 border-emerald-400'
                          : 'bg-slate-950/90 text-amber-300 border-amber-400'
                      }`}
                    >
                      <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current">
                        {stage.id === 1 ? (
                          <polygon points="50,15 54,42 80,45 58,55 65,80 50,62 35,80 42,55 20,45 46,42" />
                        ) : stage.id === 2 ? (
                          <path d="M25,85 L25,15 L75,35 L25,55 Z" />
                        ) : stage.id === 3 ? (
                          <polygon points="45,15 55,15 62,85 38,85" />
                        ) : stage.id === 4 ? (
                          <polygon points="50,15 61,38 85,38 66,54 73,78 50,64 27,78 34,54 15,38 39,38" />
                        ) : (
                          <path d="M20,60 Q40,30 70,25 Q80,25 75,35 Q60,45 65,55 Q75,60 85,55 Q65,75 40,70 Q25,80 20,60 Z" />
                        )}
                      </svg>
                    </div>

                    {/* Completion checkmark badge */}
                    {isCompleted && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                        ✓
                      </div>
                    )}
                  </div>
                </div>

                {/* Milestone Plaque */}
                <div className="mt-2 text-center pointer-events-none">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-slate-900/90 text-amber-200 border border-amber-400/50 shadow-lg backdrop-blur-xs whitespace-nowrap">
                    Chặng {stage.id}: {stage.title}
                  </span>
                  {isCurrentActive && (
                    <div className="mt-1 flex items-center justify-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-400 text-slate-950 shadow-md animate-pulse">
                        Nhấp để khám phá 📖
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* FINALE DOCK (BẾN ĐỖ TRI ÂN 20/11 at distance 5000m) */}
        {(() => {
          const distanceOffset = TOTAL_DISTANCE - distance;
          const dockScreenX = window.innerWidth * 0.35 + distanceOffset * 2.2;
          if (dockScreenX > -400 && dockScreenX < window.innerWidth + 600) {
            return (
              <div
                onClick={() => onOpenStageModal(999)}
                className="absolute z-20 cursor-pointer group hover:scale-110 transition-all duration-300 drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]"
                style={{
                  left: `${dockScreenX}px`,
                  top: '46%',
                  transform: 'translate(-50%, -50%)',
                }}
                title="Nhấp để mở Thiệp chúc mừng 20/11"
              >
                <div className="flex flex-col items-center">
                  {/* Ornate Wooden Pier & Lanterns */}
                  <div className="relative">
                    <svg width="220" height="90" viewBox="0 0 220 90">
                      {/* Pier wooden posts */}
                      {[20, 80, 140, 190].map((x, i) => (
                        <rect key={x} x={x} y={i % 2 === 0 ? 30 : 35} width="12" height={i % 2 === 0 ? 60 : 55} fill="#451A03" rx="2" />
                      ))}
                      {/* Pier deck */}
                      <rect x="10" y="22" width="200" height="15" fill="#78350F" rx="3" stroke="#B45309" strokeWidth="2" />
                      {/* Welcome arch / Gateway with flowers */}
                      <path d="M40,22 Q110,-10 180,22" stroke="#B45309" strokeWidth="6" fill="none" />
                      {/* Glowing Lantern */}
                      <circle cx="110" cy="10" r="10" fill="#F59E0B" opacity="0.9" />
                      <circle cx="110" cy="10" r="20" fill="#FDE047" opacity="0.3" />
                    </svg>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white font-bold text-xs shadow-xl border-2 border-amber-300 flex items-center gap-1.5 animate-pulse">
                    <span>💌</span>
                    <span>Bến Tri Ân 20/11 – Mở Thiệp Mừng</span>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}
      </div>

      {/* 6. THE LIVING RIVER (MẶT SÔNG VÀ CÁC LỚP SÓNG CHUYỂN ĐỘNG) */}
      <div
        className="absolute w-full h-[45%] bottom-0 overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${currentStage.theme.riverColor} 0%, #0F172A 100%)`,
        }}
      >
        {/* Animated wave layers */}
        <svg
          className="absolute inset-0 w-[2400px] h-full opacity-60 pointer-events-none"
          style={{ transform: `translateX(-${waterParallax}px)` }}
        >
          {/* Surface ripples */}
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M0,${20 + i * 25} Q150,${15 + i * 25} 300,${20 + i * 25} T600,${20 + i * 25} T900,${20 + i * 25} T1200,${20 + i * 25} T1500,${20 + i * 25} T1800,${20 + i * 25} T2100,${20 + i * 25} T2400,${20 + i * 25}`}
              fill="none"
              stroke={currentStage.theme.riverWave}
              strokeWidth="2.5"
              strokeOpacity={0.4 + (i % 3) * 0.2}
            />
          ))}
        </svg>

        {/* Historic Bach Dang Stakes rising in river water during Stage 3 */}
        {distance >= 1800 && distance <= 2850 && (
          <div className="absolute inset-0 pointer-events-none">
            {[80, 260, 470, 720, 940, 1160].map((stakeBaseX, idx) => {
              const stakeX = ((stakeBaseX - (distance - 1800) * 1.4) % 1200 + 1200) % 1200;
              return (
                <div
                  key={idx}
                  className="absolute drop-shadow-md"
                  style={{
                    left: `${stakeX}px`,
                    top: `${45 + (idx % 3) * 30}px`,
                  }}
                >
                  <svg width="28" height="60" viewBox="0 0 28 60">
                    {/* Dark wooden timber stake angled */}
                    <polygon points="10,0 18,0 24,60 4,60" fill="#2E1B0F" stroke="#1C0D02" strokeWidth="1.5" />
                    {/* Iron cap tip */}
                    <polygon points="10,0 18,0 16,14 12,14" fill="#94A3B8" />
                    {/* Water ripple circle at base */}
                    <ellipse cx="14" cy="55" rx="12" ry="4" fill="none" stroke="#67E8F9" strokeWidth="1.2" opacity="0.6" />
                  </svg>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating petals & flora drifting on water - dynamically tailored to historical era */}
        {Array.from({ length: 7 }).map((_, i) => {
          const petalX = ((i * 180 - distance * 0.3) % 1200 + 1200) % 1200;
          const petalY = 35 + (i * 26) % 130;

          // Color & type tailored to stage
          const isDienBien = currentStage.id === 4;
          const isThongNhat = currentStage.id === 5;
          const isFinaleDock = distance >= 4500;

          return (
            <div
              key={i}
              className="absolute pointer-events-none transition-transform opacity-80"
              style={{
                left: `${petalX}px`,
                top: `${petalY}px`,
                transform: `rotate(${Math.sin(Date.now() / 600 + i) * 20}deg)`,
              }}
            >
              {isFinaleDock ? (
                /* Hoa Đăng lung linh trên bến Tri Ân 20/11 */
                <svg width="22" height="18" viewBox="0 0 22 18">
                  <path d="M2,12 Q11,5 20,12 Q11,16 2,12 Z" fill="#F43F5E" />
                  <circle cx="11" cy="9" r="3.5" fill="#FDE047" />
                  <circle cx="11" cy="6" r="1.5" fill="#FEF08A" />
                </svg>
              ) : isThongNhat ? (
                /* Cánh hoa mai vàng mùa xuân thống nhất */
                <svg width="20" height="14" viewBox="0 0 20 14">
                  <path d="M0,7 Q10,0 20,7 Q10,14 0,7 Z" fill="#FACC15" opacity="0.9" />
                  <circle cx="10" cy="7" r="2.5" fill="#CA8A04" />
                </svg>
              ) : isDienBien ? (
                /* Cánh hoa ban trắng Tây Bắc */
                <svg width="20" height="14" viewBox="0 0 20 14">
                  <path d="M0,7 Q10,0 20,7 Q10,14 0,7 Z" fill="#FFFFFF" opacity="0.95" />
                  <path d="M6,7 Q10,3 14,7" stroke="#F472B6" strokeWidth="1" />
                </svg>
              ) : (
                /* Cánh sen hồng truyền thống */
                <svg width="20" height="12" viewBox="0 0 20 12">
                  <path d="M0,6 Q10,0 20,6 Q10,12 0,6 Z" fill="#F472B6" opacity="0.85" />
                </svg>
              )}
            </div>
          );
        })}

        {/* Water reflection of the sky */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-400/5 to-amber-200/10 pointer-events-none" />
      </div>

      {/* 7. THE WOODEN BOAT & THE FERRYMAN (THUYỀN GỖ & NGƯỜI LÁI ĐÒ) */}
      {/* Positioned at fixed screen focal area (~32% from left), with river world scrolling under it */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          left: '32%',
          top: '56%',
          transform: `translate(-50%, -50%) translateY(${boatBobY}px) rotate(${boatPitch}deg)`,
          transition: 'transform 0.08s ease-out',
        }}
      >
        {/* Boat & Ferryman handcrafted SVG */}
        <div className="relative w-72 h-44">
          <svg viewBox="0 0 260 160" className="w-full h-full overflow-visible drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]">
            {/* Water wake behind boat when moving */}
            {isRowing && (
              <g opacity="0.8">
                <ellipse cx="40" cy="130" rx="35" ry="8" fill="none" stroke="#E0F2FE" strokeWidth="2.5" opacity="0.7" className="animate-ping" />
                <path d="M20,130 Q-20,135 -60,140" stroke="#BAE6FD" strokeWidth="3" fill="none" strokeDasharray="6 4" />
                <path d="M20,126 Q-20,122 -60,118" stroke="#BAE6FD" strokeWidth="3" fill="none" strokeDasharray="6 4" />
              </g>
            )}

            {/* Boat shadow on water */}
            <ellipse cx="120" cy="135" rx="90" ry="14" fill="#020617" opacity="0.55" />

            {/* Wooden Hull of the Boat */}
            {/* Keel & Base */}
            <path
              d="M30,115 Q125,145 225,108 Q130,125 30,115 Z"
              fill="#291205"
            />
            {/* Outer Hull Plank 1 */}
            <path
              d="M24,108 Q125,140 230,100 L225,108 Q125,145 30,115 Z"
              fill="#451A03"
            />
            {/* Outer Hull Plank 2 (Mid tone) */}
            <path
              d="M20,100 Q125,134 235,92 L230,100 Q125,140 24,108 Z"
              fill="#78350F"
            />
            {/* Gunwale (Top Rim) */}
            <path
              d="M16,92 Q125,128 240,84 L235,92 Q125,134 20,100 Z"
              fill="#B45309"
              stroke="#D97706"
              strokeWidth="1"
            />
            {/* Inner Hull Shadow */}
            <path
              d="M28,95 Q125,120 228,88 Q125,110 28,95 Z"
              fill="#1C0B02"
            />

            {/* Wooden seat plank */}
            <rect x="90" y="94" width="35" height="6" fill="#92400E" rx="1.5" />

            {/* Traditional Bow Lantern */}
            <circle cx="236" cy="78" r="5" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />
            <line x1="236" y1="78" x2="236" y2="86" stroke="#451A03" strokeWidth="2" />

            {/* ======================================================== */}
            {/* THE FERRYMAN (NGƯỜI LÁI ĐÒ) */}
            {/* ======================================================== */}
            <g id="boatman" transform="translate(100, 35)">
              {/* Lower Body / Crossed Legs in boat */}
              <ellipse cx="14" cy="62" rx="16" ry="9" fill="#3E2723" />

              {/* Torso (Áo nâu sồng / bà ba) */}
              <path
                d="M5,35 Q14,32 23,35 L26,60 L2,60 Z"
                fill="#4E342E"
                stroke="#3E2723"
                strokeWidth="1.5"
              />

              {/* Cloth belt */}
              <line x1="3" y1="48" x2="25" y2="48" stroke="#D97706" strokeWidth="2" />

              {/* Head / Neck */}
              <circle cx="14" cy="26" r="7" fill="#D7A17C" />

              {/* Traditional Conical Hat (Nón Lá) */}
              <polygon
                points="14,6 -8,27 36,27"
                fill="#FDE68A"
                stroke="#D97706"
                strokeWidth="1.2"
              />
              <line x1="14" y1="6" x2="14" y2="27" stroke="#CA8A04" strokeWidth="1" strokeDasharray="2 2" />

              {/* Hat string (Quai nón) */}
              <path d="M1,27 Q14,34 27,27" stroke="#78350F" strokeWidth="1" fill="none" />

              {/* ====================================================== */}
              {/* ARMS & ROWING OAR (TAY VÀ MÁI CHÈO CÓ CHUYỂN ĐỘNG) */}
              {/* ====================================================== */}
              {/* Arms reaching to hold oar */}
              <path
                d={`M6,38 Q18,${42 + (isRowing ? 4 : 0)} 28,${44 + (isRowing ? -3 : 0)}`}
                stroke="#D7A17C"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Wooden Oar (Mái chèo gỗ) */}
              <g
                id="wooden-oar"
                style={{
                  transformOrigin: '24px 44px',
                  transform: `rotate(${oarAngle}deg) translateY(${oarDipDepth}px)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                {/* Oar Shaft */}
                <line x1="-30" y1="44" x2="90" y2="44" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
                {/* Oar Blade */}
                <path
                  d="M75,40 L105,37 Q115,44 105,51 L75,48 Z"
                  fill="#92400E"
                  stroke="#451A03"
                  strokeWidth="1.5"
                />

                {/* Water splash droplets around oar blade when actively stroking */}
                {isRowing && rowCycle > 0.15 && rowCycle < 0.75 && (
                  <g className="animate-ping" opacity="0.9">
                    <circle cx="95" cy="38" r="3" fill="#BAE6FD" />
                    <circle cx="108" cy="45" r="4" fill="#E0F2FE" />
                    <circle cx="98" cy="52" r="3" fill="#38BDF8" />
                  </g>
                )}
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* 8. SOUTH RIVERBANK (BỜ NAM - Foreground Reeds & Wildflowers) */}
      <div
        className="absolute w-[2000px] h-28 pointer-events-none"
        style={{
          bottom: 0,
          left: `-${bankParallax * 1.3}px`,
        }}
      >
        <svg viewBox="0 0 2000 120" className="w-full h-full" preserveAspectRatio="none">
          {/* Lower riverbank */}
          <path
            d="M0,70 Q250,55 500,70 Q750,50 1000,70 Q1250,60 1500,70 Q1750,55 2000,70 L2000,120 L0,120 Z"
            fill="#064E3B"
          />
          {/* Reeds and grass blades along bank */}
          {Array.from({ length: 30 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 68 + 10}, 65)`}>
              <line x1="0" y1="40" x2="-6" y2="0" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="4" y1="40" x2="8" y2="-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
              <circle cx="8" cy="-5" r="3" fill="#FDE047" opacity="0.9" />
            </g>
          ))}
        </svg>
      </div>

      {/* Ambient Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
};
