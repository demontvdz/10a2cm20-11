/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameState,
  createInitialGameState,
  applyRowStroke,
  stepBoatPhysics,
  completeStageAndContinue,
} from './game/riverLogic';
import { HISTORICAL_STAGES } from './game/stagesData';
import { soundEngine } from './utils/audio';
import { RiverScene } from './components/RiverScene';
import { HUD } from './components/HUD';
import { StoryModal } from './components/StoryModal';
import { LetterModal } from './components/LetterModal';
import { TitleScreen } from './components/TitleScreen';
import { SchoolBadge } from './components/SchoolBadge';

export default function App() {
  const [appState, setAppState] = useState<'title' | 'playing' | 'paused' | 'gameover'>('title');
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [viewingStageId, setViewingStageId] = useState<number | null>(null);
  const [showLetterModal, setShowLetterModal] = useState<boolean>(false);

  // Keep live references to state for 60fps loop without stale closures
  const gameStateRef = useRef<GameState>(gameState);
  gameStateRef.current = gameState;

  const appStateRef = useRef<'title' | 'playing' | 'paused' | 'gameover'>(appState);
  appStateRef.current = appState;

  const viewingStageIdRef = useRef<number | null>(viewingStageId);
  viewingStageIdRef.current = viewingStageId;

  const lastFrameTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  // Sync state to body dataset
  useEffect(() => {
    document.body.dataset.state = appState;
  }, [appState]);

  // Handle Autostart query parameter (?autostart=1)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        startGame();
      }
    }
  }, []);

  // Start game handler
  const startGame = useCallback(() => {
    setAppState('playing');
    soundEngine.startAmbientStream();
  }, []);

  // Row Stroke Action
  const handleRowStroke = useCallback(() => {
    if (appStateRef.current !== 'playing') return;
    if (viewingStageIdRef.current !== null) return; // Story modal is open

    setGameState((prev) => {
      const next = applyRowStroke(prev, HISTORICAL_STAGES);
      if (next.velocity > prev.velocity) {
        soundEngine.playRowStrokeSound();
      }
      return next;
    });
  }, []);

  // Sound toggle
  const handleToggleMute = useCallback(() => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  // Pause toggle
  const handleTogglePause = useCallback(() => {
    setAppState((prev) => {
      if (prev === 'playing') return 'paused';
      if (prev === 'paused') return 'playing';
      return prev;
    });
  }, []);

  // Open Historical Story Modal or Finale Greeting Card
  const handleOpenStageModal = useCallback((stageId: number) => {
    if (stageId === 999) {
      soundEngine.playGrandFinaleSound();
      setShowLetterModal(true);
      return;
    }
    setViewingStageId(stageId);
    soundEngine.playScrollOpenSound();
  }, []);

  // Complete Stage & Continue Journey
  const handleCompleteStageAndContinue = useCallback((stageId: number, badgeId: string) => {
    setGameState((prev) => completeStageAndContinue(prev, stageId, badgeId));
    setViewingStageId(null);
  }, []);

  // Close Story Modal
  const handleCloseStoryModal = useCallback(() => {
    setViewingStageId(null);
  }, []);

  // Restart Journey
  const handleRestartJourney = useCallback(() => {
    setGameState(createInitialGameState());
    setViewingStageId(null);
    setShowLetterModal(false);
    setAppState('playing');
  }, []);

  // 60FPS Physics Simulation Loop
  useEffect(() => {
    const loop = (time: number) => {
      const rawDt = (time - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = time;
      const dt = Math.min(rawDt, 0.05); // clamp dt against lag spikes

      if (appStateRef.current === 'playing') {
        const prev = gameStateRef.current;
        // Don't advance physics if currently reading a story modal
        if (viewingStageIdRef.current === null && !prev.isFinished) {
          const next = stepBoatPhysics(prev, HISTORICAL_STAGES, dt);

          // Did we just arrive at a milestone?
          if (next.activeStageId !== null && prev.activeStageId === null && next.activeStageId !== 999) {
            soundEngine.playLandmarkChime();
            setViewingStageId(next.activeStageId);
          }

          // Did we reach the grand finale dock (at 5000m or isFinished)?
          if (
            (next.distance >= 5000 && prev.distance < 5000) ||
            (next.isFinished && !prev.isFinished) ||
            (next.activeStageId === 999 && prev.activeStageId !== 999)
          ) {
            soundEngine.playGrandFinaleSound();
            setShowLetterModal(true);
            setAppState('gameover');
          }

          setGameState(next);
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Keyboard Shortcuts Hub
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Title screen triggers
      if (appStateRef.current === 'title') {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          startGame();
        }
        return;
      }

      // Audio mute
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
        return;
      }

      // Pause toggle
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        e.preventDefault();
        handleTogglePause();
        return;
      }

      // Rowing: Space or Right Arrow
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault();
        handleRowStroke();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startGame, handleToggleMute, handleTogglePause, handleRowStroke]);

  // Current active stage for modal
  const activeModalStage = viewingStageId
    ? HISTORICAL_STAGES.find((s) => s.id === viewingStageId)
    : null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* PERSISTENT SCHOOL & CLASS 10A2 BADGE THROUGHOUT WEB */}
      <SchoolBadge />

      {/* 1. TITLE SCREEN */}
      {appState === 'title' && <TitleScreen onStart={startGame} />}

      {/* 2. THE LIVING RIVER ENVIRONMENT */}
      <RiverScene
        gameState={gameState}
        stages={HISTORICAL_STAGES}
        onOpenStageModal={handleOpenStageModal}
      />

      {/* 3. HEADS-UP DISPLAY (HUD) & ROW DOCK */}
      {appState !== 'title' && (
        <HUD
          gameState={gameState}
          stages={HISTORICAL_STAGES}
          isMuted={isMuted}
          isPaused={appState === 'paused'}
          onRowClick={handleRowStroke}
          onTogglePause={handleTogglePause}
          onToggleMute={handleToggleMute}
          onOpenStageModal={handleOpenStageModal}
          onOpenLetterModal={() => setShowLetterModal(true)}
        />
      )}

      {/* 4. PAUSE OVERLAY MODAL */}
      {appState === 'paused' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center text-amber-50 shadow-2xl space-y-4">
            <h3 className="text-2xl font-bold font-serif-vintage text-amber-300">
              Tạm Dừng Chuyến Đò
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Dòng sông lịch sử đang êm đềm đợi bạn. Nhấn tiếp tục để trở lại hành trình.
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setAppState('playing')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-sm transition-all cursor-pointer"
              >
                Tiếp tục hành trình [P]
              </button>
              <button
                onClick={handleRestartJourney}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs transition-all cursor-pointer"
              >
                Chèo lại từ đầu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. HISTORICAL STORY & QUIZ MODAL */}
      {activeModalStage && (
        <StoryModal
          stage={activeModalStage}
          isCompleted={gameState.completedStages.includes(activeModalStage.id)}
          onCompleteAndContinue={handleCompleteStageAndContinue}
          onCloseOnly={handleCloseStoryModal}
        />
      )}

      {/* 6. GRAND FINALE 20/11 LETTER MODAL */}
      {showLetterModal && (
        <LetterModal
          stages={HISTORICAL_STAGES}
          badges={gameState.badges}
          onRestart={handleRestartJourney}
          onClose={() => setShowLetterModal(false)}
        />
      )}
    </div>
  );
}
