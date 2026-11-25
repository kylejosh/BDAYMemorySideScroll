window.App = window.App || {};

window.App.Atmosphere = (() => {
  const ATMOSPHERE_STOPS = [
    {
      u: 0.0,
      skyTop: "#74c0fc",
      skyMid: "#c5f6fa",
      skyBottom: "#fff3bf",
      celestialXRatio: 0.22,
      celestialY: 118,
      celestialSize: 62,
      celestialColor: "#fff9db",
      celestialGlow: [255, 243, 191, 0.72],
      mountainFar: "#8ecae6",
      hillMid: "#74c69d",
      hillNear: "#52b788",
      ambientTint: [255, 249, 219, 0.08],
      starOpacity: 0.0,
      cloudOpacity: 0.95,
      lampGlowOpacity: 0.04,
      houseLightOpacity: 0.2,
      memoryHalo: [255, 243, 176, 0.78],
    },
    {
      u: 1 / 3,
      skyTop: "#228be6",
      skyMid: "#74c0fc",
      skyBottom: "#d0ebff",
      celestialXRatio: 0.5,
      celestialY: 54,
      celestialSize: 56,
      celestialColor: "#ffffff",
      celestialGlow: [255, 255, 224, 0.85],
      mountainFar: "#72efdd",
      hillMid: "#52b788",
      hillNear: "#2d6a4f",
      ambientTint: [255, 255, 255, 0.04],
      starOpacity: 0.0,
      cloudOpacity: 1.0,
      lampGlowOpacity: 0.0,
      houseLightOpacity: 0.15,
      memoryHalo: [255, 250, 205, 0.82],
    },
    {
      u: 2 / 3,
      skyTop: "#6d597a",
      skyMid: "#e56b6f",
      skyBottom: "#f6bd60",
      celestialXRatio: 0.76,
      celestialY: 128,
      celestialSize: 68,
      celestialColor: "#ffe066",
      celestialGlow: [255, 183, 3, 0.62],
      mountainFar: "#9d4edd",
      hillMid: "#6a994e",
      hillNear: "#386641",
      ambientTint: [255, 173, 96, 0.14],
      starOpacity: 0.12,
      cloudOpacity: 0.75,
      lampGlowOpacity: 0.32,
      houseLightOpacity: 0.55,
      memoryHalo: [255, 214, 102, 0.84],
    },
    {
      u: 1.0,
      skyTop: "#0b091e",
      skyMid: "#1d1b38",
      skyBottom: "#2f2a5c",
      celestialXRatio: 0.84,
      celestialY: 64,
      celestialSize: 52,
      celestialColor: "#fdfcdc",
      celestialGlow: [253, 252, 220, 0.42],
      mountainFar: "#16142c",
      hillMid: "#1b3a2f",
      hillNear: "#132a22",
      ambientTint: [15, 14, 42, 0.24],
      starOpacity: 1.0,
      cloudOpacity: 0.16,
      lampGlowOpacity: 0.75,
      houseLightOpacity: 0.95,
      memoryHalo: [255, 231, 76, 0.92],
    },
  ];

  let lastTarget = null;
  let lastQuantizedU = -1;
  let lastViewportW = -1;

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(hexA, hexB, t) {
    const [r1, g1, b1] = hexToRgb(hexA);
    const [r2, g2, b2] = hexToRgb(hexB);
    return `rgb(${Math.round(lerp(r1, r2, t))}, ${Math.round(lerp(g1, g2, t))}, ${Math.round(lerp(b1, b2, t))})`;
  }

  function lerpRgba(rgbaA, rgbaB, t) {
    return `rgba(${Math.round(lerp(rgbaA[0], rgbaB[0], t))}, ${Math.round(lerp(rgbaA[1], rgbaB[1], t))}, ${Math.round(lerp(rgbaA[2], rgbaB[2], t))}, ${lerp(rgbaA[3], rgbaB[3], t).toFixed(3)})`;
  }

  function computeProgress(momCenterWorld, milestones) {
    const count = milestones.length;
    if (count <= 1) return 1;
    if (momCenterWorld <= milestones[0]) return 0;
    if (momCenterWorld >= milestones[count - 1]) return 1;

    for (let i = 0; i < count - 1; i++) {
      const mStart = milestones[i];
      const mEnd = milestones[i + 1];
      if (momCenterWorld >= mStart && momCenterWorld <= mEnd) {
        const segT = (momCenterWorld - mStart) / (mEnd - mStart);
        return (i + segT) / (count - 1);
      }
    }
    return 1;
  }

  function apply(targetEl, uRaw, viewportW) {
    const u = Math.max(0, Math.min(1, uRaw));
    // Quantize to 40 steps so mobile GPUs don't re-rasterize full-screen gradients every frame
    const quantizedU = Math.round(u * 40) / 40;

    if (
      targetEl === lastTarget &&
      viewportW === lastViewportW &&
      quantizedU === lastQuantizedU
    ) {
      return;
    }

    lastTarget = targetEl;
    lastQuantizedU = quantizedU;
    lastViewportW = viewportW;

    let sA = ATMOSPHERE_STOPS[0];
    let sB = ATMOSPHERE_STOPS[ATMOSPHERE_STOPS.length - 1];
    let localT = 0;

    for (let i = 0; i < ATMOSPHERE_STOPS.length - 1; i++) {
      if (
        quantizedU >= ATMOSPHERE_STOPS[i].u &&
        quantizedU <= ATMOSPHERE_STOPS[i + 1].u
      ) {
        sA = ATMOSPHERE_STOPS[i];
        sB = ATMOSPHERE_STOPS[i + 1];
        localT = (quantizedU - sA.u) / (sB.u - sA.u);
        break;
      }
    }

    const celestialX = lerp(
      sA.celestialXRatio * viewportW,
      sB.celestialXRatio * viewportW,
      localT,
    );
    const style = targetEl.style;
    style.setProperty("--sky-top", lerpColor(sA.skyTop, sB.skyTop, localT));
    style.setProperty("--sky-mid", lerpColor(sA.skyMid, sB.skyMid, localT));
    style.setProperty(
      "--sky-bottom",
      lerpColor(sA.skyBottom, sB.skyBottom, localT),
    );
    style.setProperty("--celestial-x", `${celestialX.toFixed(1)}px`);
    style.setProperty(
      "--celestial-y",
      `${lerp(sA.celestialY, sB.celestialY, localT).toFixed(1)}px`,
    );
    style.setProperty(
      "--celestial-size",
      `${lerp(sA.celestialSize, sB.celestialSize, localT).toFixed(1)}px`,
    );
    style.setProperty(
      "--celestial-color",
      lerpColor(sA.celestialColor, sB.celestialColor, localT),
    );
    style.setProperty(
      "--celestial-glow",
      lerpRgba(sA.celestialGlow, sB.celestialGlow, localT),
    );
    style.setProperty(
      "--mountain-far",
      lerpColor(sA.mountainFar, sB.mountainFar, localT),
    );
    style.setProperty("--hill-mid", lerpColor(sA.hillMid, sB.hillMid, localT));
    style.setProperty(
      "--hill-near",
      lerpColor(sA.hillNear, sB.hillNear, localT),
    );
    style.setProperty(
      "--ambient-tint",
      lerpRgba(sA.ambientTint, sB.ambientTint, localT),
    );
    style.setProperty(
      "--star-opacity",
      lerp(sA.starOpacity, sB.starOpacity, localT).toFixed(3),
    );
    style.setProperty(
      "--cloud-opacity",
      lerp(sA.cloudOpacity, sB.cloudOpacity, localT).toFixed(3),
    );
    style.setProperty(
      "--lamp-glow-opacity",
      lerp(sA.lampGlowOpacity, sB.lampGlowOpacity, localT).toFixed(3),
    );
    style.setProperty(
      "--house-light-opacity",
      lerp(sA.houseLightOpacity, sB.houseLightOpacity, localT).toFixed(3),
    );
    style.setProperty(
      "--memory-halo",
      lerpRgba(sA.memoryHalo, sB.memoryHalo, localT),
    );
  }

  return {
    computeProgress,
    apply,
  };
})();
