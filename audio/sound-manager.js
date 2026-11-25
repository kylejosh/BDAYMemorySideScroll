window.App = window.App || {};

window.App.SoundManager = (() => {
  let audioCtx = null;
  let lastStepTime = 0;

  function ensureContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
  }

  function playStep() {
    const now = performance.now();
    if (now - lastStepTime < 280) return;
    lastStepTime = now;

    ensureContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(65, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.055);
  }

  function playMemoryChime() {
    ensureContext();
    if (!audioCtx) return;

    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.06);

      gain.gain.setValueAtTime(0.035, audioCtx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(
        0.0008,
        audioCtx.currentTime + i * 0.06 + 0.45,
      );

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.06);
      osc.stop(audioCtx.currentTime + i * 0.06 + 0.46);
    });
  }

  function playDoorEnter() {
    ensureContext();
    if (!audioCtx) return;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.07);

      gain.gain.setValueAtTime(0.045, audioCtx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(
        0.0008,
        audioCtx.currentTime + i * 0.07 + 0.55,
      );

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.07);
      osc.stop(audioCtx.currentTime + i * 0.07 + 0.56);
    });
  }

  function playCandleBlow() {
    ensureContext();
    if (!audioCtx) return;

    // Festive cheer arpeggio when candles are blown out
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(
        freq,
        audioCtx.currentTime + 0.22 + i * 0.065,
      );

      gain.gain.setValueAtTime(0.045, audioCtx.currentTime + 0.22 + i * 0.065);
      gain.gain.exponentialRampToValueAtTime(
        0.0008,
        audioCtx.currentTime + 0.22 + i * 0.065 + 0.55,
      );

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + 0.22 + i * 0.065);
      osc.stop(audioCtx.currentTime + 0.22 + i * 0.065 + 0.56);
    });
  }

  function playCandleRelight() {
    ensureContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(660, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      990,
      audioCtx.currentTime + 0.14,
    );

    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0008, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.16);
  }

  return {
    playStep,
    playMemoryChime,
    playDoorEnter,
    playCandleBlow,
    playCandleRelight,
  };
})();
