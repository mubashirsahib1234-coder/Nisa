/**
 * Ambient poetry acoustic synthesizer using Web Audio API.
 * Provides a serene, warm harmonic drone inspired by acoustic strings / tanpura.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscillators: OscillatorNode[] = [];
let isPlaying = false;

export function toggleAmbientSound(onStateChange?: (playing: boolean) => void): boolean {
  if (isPlaying) {
    stopAmbientSound();
    onStateChange?.(false);
    return false;
  } else {
    startAmbientSound();
    onStateChange?.(true);
    return true;
  }
}

export function startAmbientSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);

    // Warm low-pass filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, audioCtx.currentTime);
    masterGain.connect(filter);
    filter.connect(audioCtx.destination);

    // Harmonic frequencies (Sa - Pa - Sa in Indian classical music D# / C# base)
    const baseFreq = 138.59; // C#3
    const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 3.01];

    oscillators = freqs.map((f, i) => {
      const osc = audioCtx!.createOscillator();
      const oscGain = audioCtx!.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f + (Math.random() * 0.4 - 0.2), audioCtx!.currentTime);

      // Subtle slow LFO vibrato
      const lfo = audioCtx!.createOscillator();
      const lfoGain = audioCtx!.createGain();
      lfo.frequency.setValueAtTime(0.1 + i * 0.05, audioCtx!.currentTime);
      lfoGain.gain.setValueAtTime(1.5, audioCtx!.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.25 / (i + 1), audioCtx!.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain!);
      osc.start();
      return osc;
    });

    isPlaying = true;
  } catch (e) {
    console.warn('AudioContext initialization prevented:', e);
  }
}

export function stopAmbientSound() {
  if (masterGain && audioCtx) {
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      oscillators = [];
      isPlaying = false;
    }, 1300);
  } else {
    isPlaying = false;
  }
}

export function isAudioPlaying(): boolean {
  return isPlaying;
}
