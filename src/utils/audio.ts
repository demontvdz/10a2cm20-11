/**
 * Web Audio API procedural sound engine.
 * Generates all river, oar, historical chimes, and celebration sounds procedurally.
 * Zero external audio assets, works completely offline.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime);
    }
  }

  /** Helper to schedule a procedural tone */
  private playTone(freq: number, type: OscillatorType, start: number, dur: number, peakGain: number = 0.2) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(peakGain, start + Math.min(0.05, dur * 0.15));
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  }

  /** Sound of oar dipping into water and propelling the boat forward */
  public playRowStrokeSound() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // 1. Water splash: filtered noise burst
    const bufSize = ctx.sampleRate * 0.35;
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(450, t);
    bandpass.frequency.exponentialRampToValueAtTime(150, t + 0.3);
    bandpass.Q.setValueAtTime(2.5, t);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    noise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(t);

    // 2. Low water displacement whoosh
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90 + Math.random() * 20, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.4);
    oscGain.gain.setValueAtTime(0.4, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  /** Ancient Vietnamese bell chime motif (D4, F4, G4, A4, C5) */
  public playLandmarkChime() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    [293.66, 349.23, 392.0, 440.0, 523.25].forEach((freq, i) => {
      this.playTone(freq, 'sine', t + i * 0.12, 0.9, 0.2);
    });
  }

  /** Ancient scroll opening / page flipping */
  public playScrollOpenSound() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const bufSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufSize) * Math.PI);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.exponentialRampToValueAtTime(300, t + 0.25);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
  }

  /** Correct quiz answer triumph chord */
  public playCorrectSound() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      this.playTone(freq, 'triangle', t + idx * 0.08, 0.8, 0.25);
    });
  }

  /** Quiz wrong answer chime */
  public playWrongSound() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.playTone(240, 'sine', ctx.currentTime, 0.25, 0.18);
  }

  /** Grand Finale Fanfare for 20/11 Celebration */
  public playGrandFinaleSound() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const melody = [
      { f: 392.0, d: 0.0, dur: 0.3 },
      { f: 440.0, d: 0.25, dur: 0.3 },
      { f: 493.88, d: 0.5, dur: 0.4 },
      { f: 587.33, d: 0.8, dur: 0.4 },
      { f: 659.25, d: 1.1, dur: 0.5 },
      { f: 783.99, d: 1.5, dur: 1.2 }
    ];
    melody.forEach(({ f, d, dur }) => {
      this.playTone(f, 'sine', t + d, dur, 0.25);
      this.playTone(f * 2, 'triangle', t + d, dur, 0.12);
    });
  }

  /** Background gentle river water stream */
  public startAmbientStream() {
    if (this.isAmbientPlaying || this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const bufSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufSize; i++) {
        lastOut = (lastOut + 0.02 * (Math.random() * 2 - 1)) / 1.02;
        data[i] = lastOut * 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, ctx.currentTime);

      noise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      noise.start(0);
      this.isAmbientPlaying = true;
    } catch {
      // Ignored if browser restricts autoplay before click
    }
  }
}

export const soundEngine = new SoundEngine();
