window.App = window.App || {};

/**
 * InsideScene (Final Chapter — Inside the Green House)
 * Dedicated module ready to be expanded into an interactive interior room,
 * family dialogue, and birthday celebration in the next step.
 */
window.App.InsideScene = (() => {
  let insideEl;
  let callbacksRef = {};

  function buildInteriorMarkup() {
    insideEl.innerHTML = `
      <div class="modal-card">
        <div class="modal-photo-box" style="background: linear-gradient(180deg, #fff3b0 0%, #ffd166 100%);">
          <svg width="100%" height="100%" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice">
            <rect x="0" y="145" width="360" height="55" fill="#bc6c25"/>
            <line x1="0" y1="145" x2="360" y2="145" stroke="#18141c" stroke-width="3.5"/>
            <path d="M20,16 Q180,52 340,16" fill="none" stroke="#18141c" stroke-width="3"/>
            <polygon points="56,23 74,26 63,44" fill="#ff595e" stroke="#18141c" stroke-width="2"/>
            <polygon points="106,31 124,33 114,51" fill="#ffca3a" stroke="#18141c" stroke-width="2"/>
            <polygon points="170,35 190,35 180,54" fill="#8ac926" stroke="#18141c" stroke-width="2"/>
            <polygon points="236,33 254,31 246,51" fill="#1982c4" stroke="#18141c" stroke-width="2"/>
            <polygon points="286,26 304,23 297,44" fill="#ff595e" stroke="#18141c" stroke-width="2"/>

            <rect x="115" y="114" width="130" height="36" rx="8" fill="#fffdf9" stroke="#18141c" stroke-width="3.5"/>
            <path d="M115,124 Q131,134 147,124 T180,124 T213,124 T245,124" fill="none" stroke="#ff758f" stroke-width="5" stroke-linecap="round"/>
            <rect x="135" y="88" width="90" height="28" rx="7" fill="#ffb3c6" stroke="#18141c" stroke-width="3.5"/>

            <rect x="155" y="68" width="7" height="20" rx="2" fill="#4ea8de" stroke="#18141c" stroke-width="2"/>
            <ellipse cx="158.5" cy="60" rx="4.5" ry="7" fill="#ffe74c" stroke="#f77f00" stroke-width="1.5"/>
            <rect x="177" y="64" width="7" height="24" rx="2" fill="#ffbe0b" stroke="#18141c" stroke-width="2"/>
            <ellipse cx="180.5" cy="56" rx="4.5" ry="7" fill="#ffe74c" stroke="#f77f00" stroke-width="1.5"/>
            <rect x="199" y="68" width="7" height="20" rx="2" fill="#52b788" stroke="#18141c" stroke-width="2"/>
            <ellipse cx="202.5" cy="60" rx="4.5" ry="7" fill="#ffe74c" stroke="#f77f00" stroke-width="1.5"/>
          </svg>
        </div>
        <div class="modal-title">Welcome Home, Mom! ❤️</div>
        <p class="modal-note">
          Every step of this journey leads back to the warmth and love you created for us. Happy Birthday—we love you endlessly!
        </p>
        <div class="modal-action-row">
          <button type="button" class="modal-btn secondary" id="step-outside-btn">Step Outside</button>
          <button type="button" class="modal-btn" id="replay-walk-btn">Walk Again ↺</button>
        </div>
      </div>
    `;

    document
      .getElementById("step-outside-btn")
      .addEventListener("click", () => {
        if (callbacksRef.onExitHouse) callbacksRef.onExitHouse(false);
      });

    document.getElementById("replay-walk-btn").addEventListener("click", () => {
      if (callbacksRef.onExitHouse) callbacksRef.onExitHouse(true);
    });
  }

  function init(callbacks) {
    callbacksRef = callbacks || {};
    insideEl = document.getElementById("inside-scene");
    buildInteriorMarkup();
  }

  function update(/* inputState */) {
    // Reserved for interactive inside-the-house movement & celebration interactions
  }

  return {
    init,
    update,
  };
})();
