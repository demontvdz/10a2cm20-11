export interface StageData {
  id: number;
  key: string;
  title: string;
  period: string;
  distance: number; // in river units (e.g. 1000, 2000, 3000, 4000, 5000)
  theme: {
    skyTop: string;
    skyBottom: string;
    riverColor: string;
    riverWave: string;
    mountainFar: string;
    mountainMid: string;
    bankFlora: string;
    landmarkIcon: string;
  };
  story: {
    headline: string;
    timeframe: string;
    paragraphs: string[];
    historicalMeaning: string;
    quote: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
    explanation: string;
  };
  badge: {
    id: string;
    name: string;
    subtitle: string;
    iconSvg: string;
    description: string;
  };
  imageUrl?: string;
}

export const TOTAL_DISTANCE = 5000;
export const ROW_IMPULSE = 120; // propulsion speed per stroke
export const MAX_VELOCITY = 240;
export const WATER_FRICTION = 0.92; // smooth decay per physics tick
export const MILESTONE_STOP_THRESHOLD = 35; // distance margin to latch at milestone

export interface GameState {
  distance: number;
  velocity: number;
  isRowing: boolean;
  rowCycle: number; // 0 to 1 for oar stroke animation
  completedStages: number[]; // array of stage IDs [1, 2, ...]
  activeStageId: number | null; // currently stopped at milestone
  isModalOpen: boolean;
  isFinished: boolean; // reached finale
  badges: string[];
  totalStrokes: number;
}

export function createInitialGameState(): GameState {
  return {
    distance: 0,
    velocity: 0,
    isRowing: false,
    rowCycle: 0,
    completedStages: [],
    activeStageId: null,
    isModalOpen: false,
    isFinished: false,
    badges: [],
    totalStrokes: 0,
  };
}

/**
 * Apply a row stroke from the player.
 * Only works if not currently locked at an open milestone modal or finished.
 */
export function applyRowStroke(state: GameState, stages: StageData[]): GameState {
  // If stopped at a milestone and haven't completed it, boat cannot move
  if (state.activeStageId !== null && state.isModalOpen) {
    return state;
  }
  if (state.isFinished) {
    return state;
  }

  const nextVelocity = Math.min(state.velocity + ROW_IMPULSE, MAX_VELOCITY);
  return {
    ...state,
    velocity: nextVelocity,
    isRowing: true,
    rowCycle: 0,
    totalStrokes: state.totalStrokes + 1,
  };
}

/**
 * Step boat physics simulation.
 * Pure function: boat moves forward proportional to velocity, decays via friction.
 * If approaching an uncompleted milestone, boat glides to a stop and latches.
 */
export function stepBoatPhysics(
  state: GameState,
  stages: StageData[],
  dt: number = 0.016
): GameState {
  // If velocity is effectively zero, boat does not move at all
  if (Math.abs(state.velocity) < 0.2) {
    return {
      ...state,
      velocity: 0,
      isRowing: false,
    };
  }

  // Calculate potential new distance
  const proposedDistance = state.distance + state.velocity * dt;

  // Check if we hit any uncompleted stage milestone
  for (const stage of stages) {
    const isCompleted = state.completedStages.includes(stage.id);
    if (!isCompleted) {
      // If we crossed or are right at the stage's target distance
      if (
        state.distance <= stage.distance &&
        proposedDistance >= stage.distance - MILESTONE_STOP_THRESHOLD
      ) {
        // Dock boat exactly at milestone, stop motion, open discovery
        return {
          ...state,
          distance: stage.distance,
          velocity: 0,
          isRowing: false,
          activeStageId: stage.id,
          isModalOpen: true,
        };
      }
    }
  }

  // Check if reached the end of the journey (Bến Đỗ Tri Ân 20/11 at 5000m)
  if (proposedDistance >= TOTAL_DISTANCE) {
    return {
      ...state,
      distance: TOTAL_DISTANCE,
      velocity: 0,
      isRowing: false,
      isFinished: true,
      activeStageId: 999, // 999 represents final dock
      isModalOpen: true,
    };
  }

  // Normal movement
  const nextVelocity = state.velocity * Math.pow(WATER_FRICTION, dt * 60);
  const nextRowCycle = state.isRowing ? Math.min(1, state.rowCycle + dt * 2.5) : 0;
  const isStillRowing = nextRowCycle < 1 && state.isRowing;

  return {
    ...state,
    distance: proposedDistance,
    velocity: nextVelocity,
    isRowing: isStillRowing,
    rowCycle: isStillRowing ? nextRowCycle : 0,
  };
}

/**
 * Validates a stage quiz answer
 */
export function evaluateQuizAnswer(stage: StageData, selectedIndex: number): {
  isCorrect: boolean;
  hint: string;
  explanation: string;
} {
  const isCorrect = selectedIndex === stage.quiz.correctIndex;
  return {
    isCorrect,
    hint: isCorrect ? '' : stage.quiz.hint,
    explanation: stage.quiz.explanation,
  };
}

/**
 * Complete current stage, award badge, unlock rowing
 */
export function completeStageAndContinue(state: GameState, stageId: number, badgeId: string): GameState {
  const completed = state.completedStages.includes(stageId)
    ? state.completedStages
    : [...state.completedStages, stageId];

  const badges = state.badges.includes(badgeId)
    ? state.badges
    : [...state.badges, badgeId];

  const isAllDone = completed.length >= 5;

  return {
    ...state,
    completedStages: completed,
    badges,
    activeStageId: null,
    isModalOpen: false,
    // Add a slight nudge forward past the threshold so the boat doesn't re-trigger the same stop
    distance: state.distance + 1,
    isFinished: isAllDone && state.distance >= TOTAL_DISTANCE - 10,
  };
}

/**
 * Calculates current progress percentage (0 - 100)
 */
export function calculateProgressPercentage(distance: number): number {
  return Math.min(100, Math.max(0, Math.round((distance / TOTAL_DISTANCE) * 100)));
}

/**
 * Determine current era based on river distance
 */
export function getCurrentStageIndex(distance: number, stages: StageData[]): number {
  for (let i = stages.length - 1; i >= 0; i--) {
    if (distance >= stages[i].distance - 200) {
      return i;
    }
  }
  return 0;
}
