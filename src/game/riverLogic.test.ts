import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialGameState,
  applyRowStroke,
  stepBoatPhysics,
  evaluateQuizAnswer,
  completeStageAndContinue,
  calculateProgressPercentage,
  TOTAL_DISTANCE
} from './riverLogic';
import { HISTORICAL_STAGES } from './stagesData';

test('Initial state: boat is stationary at distance 0 with 0 velocity', () => {
  const state = createInitialGameState();
  assert.equal(state.distance, 0);
  assert.equal(state.velocity, 0);
  assert.equal(state.isRowing, false);
  assert.equal(state.completedStages.length, 0);
  assert.equal(state.activeStageId, null);
});

test('CRITICAL RULE: Boat NEVER moves automatically when velocity is 0', () => {
  const state = createInitialGameState();
  // Simulate 100 physics frames without player interaction
  let current = state;
  for (let i = 0; i < 100; i++) {
    current = stepBoatPhysics(current, HISTORICAL_STAGES, 0.016);
  }
  assert.equal(current.distance, 0, 'Distance must remain strictly 0 without player row strokes');
  assert.equal(current.velocity, 0, 'Velocity must remain 0');
});

test('Player interaction: Row stroke imparts forward velocity and records strokes', () => {
  const state = createInitialGameState();
  const rowedState = applyRowStroke(state, HISTORICAL_STAGES);

  assert.ok(rowedState.velocity > 0, 'Velocity must increase after row stroke');
  assert.equal(rowedState.totalStrokes, 1);
  assert.equal(rowedState.isRowing, true);

  // Stepping physics advances distance
  const next = stepBoatPhysics(rowedState, HISTORICAL_STAGES, 0.1);
  assert.ok(next.distance > 0, 'Boat moves forward only after player rowed');
});

test('Water friction brings the boat smoothly to a complete stop', () => {
  let state = applyRowStroke(createInitialGameState(), HISTORICAL_STAGES);
  // Step through enough frames for friction to dissipate velocity
  for (let i = 0; i < 150; i++) {
    state = stepBoatPhysics(state, HISTORICAL_STAGES, 0.05);
  }
  assert.equal(state.velocity, 0, 'Velocity decays to 0 via water friction');
  assert.equal(state.isRowing, false);
});

test('Boat automatically halts at Stage 1 milestone (800m) and locks rowing', () => {
  let state = createInitialGameState();
  // Place boat just before Stage 1 (e.g. 780m) with forward speed
  state.distance = 780;
  state.velocity = 100;

  state = stepBoatPhysics(state, HISTORICAL_STAGES, 0.1);
  assert.equal(state.distance, 800, 'Boat must stop precisely at Stage 1 milestone');
  assert.equal(state.velocity, 0, 'Boat velocity must be clamped to 0');
  assert.equal(state.activeStageId, 1, 'Stage 1 must be active');
  assert.equal(state.isModalOpen, true, 'Modal discovery must be opened');

  // Attempting to row while stopped at milestone with modal open must be rejected
  const tryRow = applyRowStroke(state, HISTORICAL_STAGES);
  assert.equal(tryRow.velocity, 0, 'Rowing must be locked while story/quiz is open');
});

test('Quiz validation for all 5 stages matches historical accuracy', () => {
  // Test Stage 1: Văn Lang - Các vua Hùng
  const s1 = HISTORICAL_STAGES[0];
  const q1Correct = evaluateQuizAnswer(s1, 0);
  assert.equal(q1Correct.isCorrect, true);
  assert.equal(evaluateQuizAnswer(s1, 1).isCorrect, false);

  // Test Stage 2: Hai Bà Trưng - Năm 40
  const s2 = HISTORICAL_STAGES[1];
  assert.equal(evaluateQuizAnswer(s2, 0).isCorrect, true);
  assert.equal(evaluateQuizAnswer(s2, 1).isCorrect, false);

  // Test Stage 3: Bạch Đằng - Ngô Quyền
  const s3 = HISTORICAL_STAGES[2];
  assert.equal(evaluateQuizAnswer(s3, 0).isCorrect, true);
  assert.equal(evaluateQuizAnswer(s3, 2).isCorrect, false);

  // Test Stage 4: Điện Biên Phủ - Năm 1954
  const s4 = HISTORICAL_STAGES[3];
  assert.equal(evaluateQuizAnswer(s4, 0).isCorrect, true);

  // Test Stage 5: Thống Nhất - 30/4/1975
  const s5 = HISTORICAL_STAGES[4];
  assert.equal(evaluateQuizAnswer(s5, 0).isCorrect, true);
});

test('Stage completion awards badge and unlocks further rowing', () => {
  let state = createInitialGameState();
  state.activeStageId = 1;
  state.isModalOpen = true;
  state.distance = 1000;

  state = completeStageAndContinue(state, 1, 'badge-van-lang');
  assert.equal(state.completedStages.includes(1), true);
  assert.equal(state.badges.includes('badge-van-lang'), true);
  assert.equal(state.isModalOpen, false);
  assert.equal(state.activeStageId, null);

  // Now rowing should be unlocked
  state = applyRowStroke(state, HISTORICAL_STAGES);
  assert.ok(state.velocity > 0, 'Rowing is now unlocked to proceed to Stage 2');
});

test('Progress percentage calculates correctly', () => {
  assert.equal(calculateProgressPercentage(0), 0);
  assert.equal(calculateProgressPercentage(2500), 50);
  assert.equal(calculateProgressPercentage(5000), 100);
});
