window.App = window.App || {};

/**
 * InsideScene (Final Chapter — POV Birthday Celebration Modal)
 * Assembles the 980x470 POV room using modular assets from
 * assets/characters/family-sprites.js and assets/props/birthday-cake.js.
 */
window.App.InsideScene = (() => {
  const { Sprites, SoundManager } = window.App;

  let insideCardEl;
  let povStageEl;
  let cakeHeroEl;
  let spriteCanvases = [];
  let callbacksRef = {};
  let candlesOut = false;

  function updateResponsiveScale() {
    const availW = Math.max(280, window.innerWidth - 36);
    const availH = Math.max(180, window.innerHeight - 36);
    const scale = Math.min(1, availW / 980, availH / 470);
    document.documentElement.style.setProperty("--pov-scale", scale.toFixed(4));
  }

  function buildInteriorMarkup() {
    insideCardEl.innerHTML = `
      <div class="inside-pov-viewport">
        <div class="inside-pov-stage" id="inside-pov-stage">
          <button type="button" class="inside-exit-btn" id="inside-exit-btn">← Step Outside</button>

          <!-- BACKGROUND BALLOONS -->
          <div class="balloons-row">
            <div class="balloon" style="left: 16px; top: 10px; background: #ff6b6b;"></div>
            <div class="balloon" style="left: 118px; top: -6px; background: #f8f9fa; animation-delay: 0.4s;"></div>
            <div class="balloon" style="left: 256px; top: 4px; background: #ffd166; animation-delay: 0.8s;"></div>
            <div class="balloon" style="left: 392px; top: -4px; background: #118ab2; animation-delay: 1.2s;"></div>
            <div class="balloon" style="left: 515px; top: 6px; background: #f77f00; animation-delay: 0.5s;"></div>
            <div class="balloon" style="left: 635px; top: -8px; background: #ffccd5; animation-delay: 1.0s;"></div>
            <div class="balloon" style="left: 765px; top: 2px; background: #06d6a0; animation-delay: 0.3s;"></div>
            <div class="balloon" style="right: 14px; top: 12px; background: #e07a5f; animation-delay: 0.9s;"></div>
          </div>

          <!-- "HAPPY BIRTHDAY" BUNTING BANNER -->
          <div class="party-banner">
            <div class="banner-string"></div>
            <div class="banner-flag" style="color: #e63946; transform: rotate(-4deg);">H</div>
            <div class="banner-flag" style="color: #f77f00; transform: rotate(-2deg);">A</div>
            <div class="banner-flag" style="color: #2a9d8f; transform: rotate(2deg);">P</div>
            <div class="banner-flag" style="color: #457b9d; transform: rotate(-3deg);">P</div>
            <div class="banner-flag" style="color: #e76f51; transform: rotate(3deg);">Y</div>
            <div style="width: 14px;"></div>
            <div class="banner-flag" style="color: #2a9d8f; transform: rotate(-2deg);">B</div>
            <div class="banner-flag" style="color: #e63946; transform: rotate(2deg);">I</div>
            <div class="banner-flag" style="color: #f77f00; transform: rotate(-3deg);">R</div>
            <div class="banner-flag" style="color: #457b9d; transform: rotate(3deg);">T</div>
            <div class="banner-flag" style="color: #2a9d8f; transform: rotate(-2deg);">H</div>
            <div class="banner-flag" style="color: #e76f51; transform: rotate(2deg);">D</div>
            <div class="banner-flag" style="color: #e63946; transform: rotate(-3deg);">A</div>
            <div class="banner-flag" style="color: #f77f00; transform: rotate(4deg);">Y</div>
          </div>

          <!-- THE 6 PIXEL-ART FAMILY MEMBERS AROUND THE TABLE -->
          <div class="family-group">
            <div class="pixel-person" style="left: 34px; animation-delay: 0.1s;">
              <canvas class="pixel-sprite" data-char="boy3" width="48" height="60" style="width: 176px; height: 220px;"></canvas>
            </div>
            <div class="pixel-person" style="left: 176px; animation-delay: 0.45s;">
              <canvas class="pixel-sprite" data-char="boy2" width="48" height="60" style="width: 184px; height: 230px;"></canvas>
            </div>
            <div class="pixel-person" style="left: 320px; z-index: 7; animation-delay: 0.2s;">
              <canvas class="pixel-sprite" data-char="dad" width="48" height="60" style="width: 196px; height: 245px;"></canvas>
            </div>
            <div class="pixel-person" style="left: 474px; z-index: 7; animation-delay: 0.6s;">
              <canvas class="pixel-sprite" data-char="boy1" width="48" height="60" style="width: 192px; height: 240px;"></canvas>
            </div>
            <div class="pixel-person" style="left: 626px; animation-delay: 0.35s;">
              <canvas class="pixel-sprite" data-char="girl1" width="48" height="60" style="width: 184px; height: 230px;"></canvas>
            </div>
            <div class="pixel-person" style="left: 770px; animation-delay: 0.75s;">
              <canvas class="pixel-sprite" data-char="girl2" width="48" height="60" style="width: 176px; height: 220px;"></canvas>
            </div>
          </div>

          <!-- WOODEN DINING TABLE -->
          <div class="dining-table">
            <div class="table-edge-line"></div>
          </div>

          <!-- WIDE FOREGROUND STRAWBERRY BIRTHDAY CAKE -->
          <div class="birthday-cake-hero" id="cake-hero" title="Tap cake to blow out or relight candles">
            ${Sprites.BIRTHDAY_CAKE_SVG}
          </div>

          <div class="candle-ambient-glow"></div>
        </div>
      </div>
    `;
  }

  function renderFamily(cheering) {
    spriteCanvases.forEach((canvas) => {
      Sprites.renderFamilyCharacter(canvas, canvas.dataset.char, cheering);
    });
  }

  function launchConfetti() {
    const colors = [
      "#ff5964",
      "#ffbe0b",
      "#3a86ff",
      "#06d6a0",
      "#ff758f",
      "#ffffff",
    ];
    for (let i = 0; i < 65; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 0.6}s`;
      piece.style.animationDuration = `${2.1 + Math.random() * 1.2}s`;
      povStageEl.appendChild(piece);
      setTimeout(() => piece.remove(), 3500);
    }
  }

  function toggleCandles() {
    if (!povStageEl) return;

    if (!candlesOut) {
      povStageEl.classList.add("blowing");
      SoundManager.playCandleBlow();
      setTimeout(() => {
        povStageEl.classList.remove("blowing");
        povStageEl.classList.add("candles-out");
        candlesOut = true;
        renderFamily(true);
        launchConfetti();
      }, 280);
    } else {
      candlesOut = false;
      povStageEl.classList.remove("candles-out", "blowing");
      SoundManager.playCandleRelight();
      renderFamily(false);
    }
  }

  function open() {
    updateResponsiveScale();
  }

  function init(callbacks) {
    callbacksRef = callbacks || {};
    insideCardEl = document.getElementById("inside-scene");

    buildInteriorMarkup();

    povStageEl = document.getElementById("inside-pov-stage");
    cakeHeroEl = document.getElementById("cake-hero");
    spriteCanvases = Array.from(povStageEl.querySelectorAll(".pixel-sprite"));

    renderFamily(false);
    updateResponsiveScale();

    cakeHeroEl.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCandles();
    });

    document
      .getElementById("inside-exit-btn")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        if (callbacksRef.onExitHouse) callbacksRef.onExitHouse();
      });

    window.addEventListener("resize", updateResponsiveScale);
  }

  return {
    init,
    open,
    toggleCandles,
  };
})();
