window.App = window.App || {};
window.App.Sprites = window.App.Sprites || {};

(() => {
  const BIRTHDAY_CAKE_SVG = `
    <div class="candle-fx" style="left: 110px; top: 14px;">
      <div class="smoke-wisp"></div>
      <div class="flame"></div>
    </div>
    <div class="candle-fx" style="left: 172px; top: 6px;">
      <div class="smoke-wisp" style="animation-delay: 0.1s;"></div>
      <div class="flame" style="animation-delay: 0.12s;"></div>
    </div>
    <div class="candle-fx" style="left: 252px; top: 6px;">
      <div class="smoke-wisp" style="animation-delay: 0.05s;"></div>
      <div class="flame" style="animation-delay: 0.2s;"></div>
    </div>
    <div class="candle-fx" style="left: 314px; top: 14px;">
      <div class="smoke-wisp" style="animation-delay: 0.15s;"></div>
      <div class="flame" style="animation-delay: 0.08s;"></div>
    </div>

    <svg class="cake-illustration" viewBox="0 0 440 235" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="candle-1"><rect x="112" y="43" width="12" height="54" rx="3" /></clipPath>
        <clipPath id="candle-2"><rect x="174" y="35" width="12" height="50" rx="3" /></clipPath>
        <clipPath id="candle-3"><rect x="254" y="35" width="12" height="50" rx="3" /></clipPath>
        <clipPath id="candle-4"><rect x="316" y="43" width="12" height="54" rx="3" /></clipPath>
      </defs>

      <!-- Platter -->
      <ellipse cx="220" cy="199" rx="208" ry="27" fill="#e6dfd5" stroke="#3d211a" stroke-width="3.5" />
      <ellipse cx="220" cy="194" rx="208" ry="25" fill="#fffdf9" stroke="#3d211a" stroke-width="3.5" />
      <ellipse cx="220" cy="194" rx="184" ry="20" fill="none" stroke="#e5d7c4" stroke-width="2" />

      <!-- Cake Base -->
      <path d="M 44 103 L 44 174 C 44 202, 396 202, 396 174 L 396 103 Z"
            fill="#fae6ce" stroke="#3d211a" stroke-width="3.5" stroke-linejoin="round" />

      <!-- Wavy Berry Filling -->
      <path d="M 44 145 Q 92 156, 140 147 T 236 148 T 332 147 Q 368 152, 396 145
               L 396 158 Q 368 165, 332 160 T 236 161 T 140 160 Q 92 169, 44 158 Z"
            fill="#ff758f" stroke="#3d211a" stroke-width="3" stroke-linejoin="round" />

      <!-- Top Surface -->
      <ellipse cx="220" cy="100" rx="182" ry="24" fill="#fffdf9" stroke="#3d211a" stroke-width="3.5" />

      <!-- 4 Striped Candles -->
      <line x1="118" y1="37" x2="118" y2="43" stroke="#3d211a" stroke-width="3" stroke-linecap="round" />
      <g clip-path="url(#candle-1)">
        <rect x="112" y="43" width="12" height="54" fill="#fffdf9" />
        <path d="M 108 54 L 128 44 M 108 66 L 128 56 M 108 78 L 128 68 M 108 90 L 128 80 M 108 102 L 128 92"
              stroke="#4cc9f0" stroke-width="4.5" />
      </g>
      <rect x="112" y="43" width="12" height="54" rx="3" fill="none" stroke="#3d211a" stroke-width="3" />

      <line x1="180" y1="29" x2="180" y2="35" stroke="#3d211a" stroke-width="3" stroke-linecap="round" />
      <g clip-path="url(#candle-2)">
        <rect x="174" y="35" width="12" height="50" fill="#fffdf9" />
        <path d="M 170 46 L 190 36 M 170 58 L 190 48 M 170 70 L 190 60 M 170 82 L 190 72"
              stroke="#4cc9f0" stroke-width="4.5" />
      </g>
      <rect x="174" y="35" width="12" height="50" rx="3" fill="none" stroke="#3d211a" stroke-width="3" />

      <line x1="260" y1="29" x2="260" y2="35" stroke="#3d211a" stroke-width="3" stroke-linecap="round" />
      <g clip-path="url(#candle-3)">
        <rect x="254" y="35" width="12" height="50" fill="#fffdf9" />
        <path d="M 250 46 L 270 36 M 250 58 L 270 48 M 250 70 L 270 60 M 250 82 L 270 72"
              stroke="#4cc9f0" stroke-width="4.5" />
      </g>
      <rect x="254" y="35" width="12" height="50" rx="3" fill="none" stroke="#3d211a" stroke-width="3" />

      <line x1="322" y1="37" x2="322" y2="43" stroke="#3d211a" stroke-width="3" stroke-linecap="round" />
      <g clip-path="url(#candle-4)">
        <rect x="316" y="43" width="12" height="54" fill="#fffdf9" />
        <path d="M 312 54 L 332 44 M 312 66 L 332 56 M 312 78 L 332 68 M 312 90 L 332 80 M 312 102 L 332 92"
              stroke="#4cc9f0" stroke-width="4.5" />
      </g>
      <rect x="316" y="43" width="12" height="54" rx="3" fill="none" stroke="#3d211a" stroke-width="3" />

      <!-- Overhanging Frosting Rim -->
      <path d="M 38 100 C 38 114, 105 124, 220 124 C 335 124, 402 114, 402 100
               L 402 117 C 382 127, 355 124, 330 129 C 300 134, 270 125, 240 130
               C 210 135, 180 125, 150 130 C 120 135, 88 124, 62 128 C 48 130, 40 123, 38 117 Z"
            fill="#fff8ee" stroke="#3d211a" stroke-width="3.5" stroke-linejoin="round" />

      <!-- HAPPY BIRTHDAY Plaque -->
      <path d="M 157 67 Q 159 64, 163 64 L 277 64 Q 281 64, 283 67 L 295 101 L 145 101 Z"
            fill="#fffdf9" stroke="#3d211a" stroke-width="3.2" stroke-linejoin="round" />
      <text x="220" y="80" text-anchor="middle" font-family="Quicksand, sans-serif" font-weight="800" font-size="15" letter-spacing="1" fill="#3d211a">HAPPY</text>
      <text x="220" y="95" text-anchor="middle" font-family="Quicksand, sans-serif" font-weight="800" font-size="15" letter-spacing="0.8" fill="#3d211a">BIRTHDAY</text>

      <!-- 5 Seeded Strawberries -->
      <g transform="translate(76, 94)">
        <path d="M 0 -17 C 9 -17, 17 -2, 16 7 C 15 14, 7 16, 0 16 C -7 16, -15 14, -16 7 C -17 -2, -9 -17, 0 -17 Z" fill="#ff5964" stroke="#3d211a" stroke-width="3.2" />
        <ellipse cx="-5" cy="-4" rx="2.5" ry="4.5" transform="rotate(-18 -5 -4)" fill="#ff8fa3" />
        <circle cx="-6" cy="-7" r="1.3" fill="#3d211a" /><circle cx="5" cy="-6" r="1.3" fill="#3d211a" /><circle cx="0" cy="0" r="1.3" fill="#3d211a" /><circle cx="-8" cy="6" r="1.3" fill="#3d211a" /><circle cx="7" cy="6" r="1.3" fill="#3d211a" />
      </g>
      <g transform="translate(138, 104)">
        <path d="M 0 -17 C 9 -17, 17 -2, 16 7 C 15 14, 7 16, 0 16 C -7 16, -15 14, -16 7 C -17 -2, -9 -17, 0 -17 Z" fill="#ff5964" stroke="#3d211a" stroke-width="3.2" />
        <ellipse cx="-5" cy="-4" rx="2.5" ry="4.5" transform="rotate(-18 -5 -4)" fill="#ff8fa3" />
        <circle cx="-6" cy="-7" r="1.3" fill="#3d211a" /><circle cx="5" cy="-6" r="1.3" fill="#3d211a" /><circle cx="0" cy="0" r="1.3" fill="#3d211a" /><circle cx="-8" cy="6" r="1.3" fill="#3d211a" /><circle cx="7" cy="6" r="1.3" fill="#3d211a" />
      </g>
      <g transform="translate(220, 109)">
        <path d="M 0 -17 C 9 -17, 17 -2, 16 7 C 15 14, 7 16, 0 16 C -7 16, -15 14, -16 7 C -17 -2, -9 -17, 0 -17 Z" fill="#ff5964" stroke="#3d211a" stroke-width="3.2" />
        <ellipse cx="-5" cy="-4" rx="2.5" ry="4.5" transform="rotate(-18 -5 -4)" fill="#ff8fa3" />
        <circle cx="-6" cy="-7" r="1.3" fill="#3d211a" /><circle cx="5" cy="-6" r="1.3" fill="#3d211a" /><circle cx="0" cy="0" r="1.3" fill="#3d211a" /><circle cx="-8" cy="6" r="1.3" fill="#3d211a" /><circle cx="7" cy="6" r="1.3" fill="#3d211a" />
      </g>
      <g transform="translate(302, 104)">
        <path d="M 0 -17 C 9 -17, 17 -2, 16 7 C 15 14, 7 16, 0 16 C -7 16, -15 14, -16 7 C -17 -2, -9 -17, 0 -17 Z" fill="#ff5964" stroke="#3d211a" stroke-width="3.2" />
        <ellipse cx="-5" cy="-4" rx="2.5" ry="4.5" transform="rotate(-18 -5 -4)" fill="#ff8fa3" />
        <circle cx="-6" cy="-7" r="1.3" fill="#3d211a" /><circle cx="5" cy="-6" r="1.3" fill="#3d211a" /><circle cx="0" cy="0" r="1.3" fill="#3d211a" /><circle cx="-8" cy="6" r="1.3" fill="#3d211a" /><circle cx="7" cy="6" r="1.3" fill="#3d211a" />
      </g>
      <g transform="translate(364, 94)">
        <path d="M 0 -17 C 9 -17, 17 -2, 16 7 C 15 14, 7 16, 0 16 C -7 16, -15 14, -16 7 C -17 -2, -9 -17, 0 -17 Z" fill="#ff5964" stroke="#3d211a" stroke-width="3.2" />
        <ellipse cx="-5" cy="-4" rx="2.5" ry="4.5" transform="rotate(-18 -5 -4)" fill="#ff8fa3" />
        <circle cx="-6" cy="-7" r="1.3" fill="#3d211a" /><circle cx="5" cy="-6" r="1.3" fill="#3d211a" /><circle cx="0" cy="0" r="1.3" fill="#3d211a" /><circle cx="-8" cy="6" r="1.3" fill="#3d211a" /><circle cx="7" cy="6" r="1.3" fill="#3d211a" />
      </g>
    </svg>
  `;

  Object.assign(window.App.Sprites, {
    BIRTHDAY_CAKE_SVG,
  });
})();
