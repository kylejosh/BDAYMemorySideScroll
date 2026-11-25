window.App = window.App || {};
window.App.Sprites = window.App.Sprites || {};

(() => {
  const GREEN_HOUSE_EXTERIOR_SVG = `
    <svg width="700" height="264" viewBox="0 0 700 264" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Twin-Gable Green Roof Stripes (18px repeat: 14px leaf green + 4px shade) -->
        <pattern id="gh-roof-stripes" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="#1db954"/>
          <rect y="14" width="18" height="4" fill="#158f40"/>
        </pattern>

        <!-- Horizontal Terracotta Wood Siding (18px repeat: 16px plank + 2px groove) -->
        <pattern id="gh-wood-siding" width="20" height="18" patternUnits="userSpaceOnUse">
          <rect width="20" height="18" fill="#b57c58"/>
          <rect y="16" width="20" height="2" fill="#966141"/>
        </pattern>

        <!-- Horizontal Green Accent Siding (18px repeat: 16px plank + 2px groove) -->
        <pattern id="gh-green-siding" width="20" height="18" patternUnits="userSpaceOnUse">
          <rect width="20" height="18" fill="#22c55e"/>
          <rect y="16" width="20" height="2" fill="#16a34a"/>
        </pattern>

        <!-- Cement Parking Bay Wall Gradient & Seam Grid -->
        <linearGradient id="gh-cement-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#bcc2ca"/>
          <stop offset="35%" stop-color="#d3d8df"/>
          <stop offset="100%" stop-color="#e1e5eb"/>
        </linearGradient>
        <pattern id="gh-cement-seams" width="57" height="32" patternUnits="userSpaceOnUse">
          <rect y="30" width="57" height="2" fill="#18141c" fill-opacity="0.10"/>
          <rect x="55" width="2" height="32" fill="#18141c" fill-opacity="0.08"/>
        </pattern>

        <!-- Rounded White Van Body & Windshield Gradients -->
        <linearGradient id="gh-van-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="75%" stop-color="#f8f9fa"/>
          <stop offset="100%" stop-color="#e9ecef"/>
        </linearGradient>
        <linearGradient id="gh-van-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#90e0ef"/>
          <stop offset="100%" stop-color="#caf0f8"/>
        </linearGradient>

        <!-- Open Porch Cream-White Back Wall & Warm Light Wash -->
        <linearGradient id="gh-porch-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fcf8e3"/>
          <stop offset="100%" stop-color="#f2ebd2"/>
        </linearGradient>
        <radialGradient id="gh-porch-glow" cx="50%" cy="15%" r="78%">
          <stop offset="0%" stop-color="#ffe875" stop-opacity="0.78"/>
          <stop offset="55%" stop-color="#ffe74c" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#ffe74c" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="gh-carport-glow" cx="50%" cy="20%" r="75%">
          <stop offset="0%" stop-color="#ffe74c" stop-opacity="0.72"/>
          <stop offset="100%" stop-color="#ffe74c" stop-opacity="0"/>
        </radialGradient>

        <!-- Segmented Front Garden Curb Pattern -->
        <pattern id="gh-curb-blocks" width="27" height="11" patternUnits="userSpaceOnUse">
          <rect width="24" height="11" fill="#ced4da"/>
          <rect x="24" width="3" height="11" fill="#495057"/>
        </pattern>
      </defs>

      <!-- ===================================================================
           1. TWIN-GABLE GREEN ROOFS (Right Roof Behind Left Roof)
           =================================================================== -->
      <!-- Right Gable Roof -->
      <polygon points="492,14 698,112 282,112" fill="#18141c"/>
      <polygon points="492,24 682,104 298,104" fill="url(#gh-roof-stripes)"/>

      <!-- Left Gable Roof -->
      <polygon points="144,2 292,112 0,112" fill="#18141c"/>
      <polygon points="144,12 276,104 12,104" fill="url(#gh-roof-stripes)"/>

      <!-- ===================================================================
           2. LEFT WING: CEMENT PARKING BAY + GRAY HALF-WALL + WOOD STORAGE DOOR
           =================================================================== -->
      <!-- Left Wing Structural Frame -->
      <rect x="0" y="110" width="288" height="148" fill="#18141c"/>

      <!-- Cement-Covered Parking Bay -->
      <rect x="6" y="114" width="116" height="140" fill="url(#gh-cement-wall)"/>
      <rect x="6" y="132" width="116" height="122" fill="url(#gh-cement-seams)"/>

      <!-- Carport Header Beam & Overhead Warm Bulb -->
      <rect x="6" y="114" width="116" height="18" fill="#f8f9fa"/>
      <line x1="6" y1="116" x2="122" y2="116" stroke="#18141c" stroke-width="4"/>
      <line x1="6" y1="130" x2="122" y2="130" stroke="#18141c" stroke-width="4"/>
      <ellipse class="house-warm-glow" cx="64" cy="144" rx="44" ry="20" fill="url(#gh-carport-glow)"/>
      <rect x="56" y="132" width="16" height="5" fill="#ffe74c"/>

      <!-- Rounded White Family Van -->
      <g>
        <!-- Tires -->
        <path d="M 30 238 L 45 238 L 45 245 Q 45 250, 40 250 L 35 250 Q 30 250, 30 245 Z" fill="#18141c"/>
        <path d="M 83 238 L 98 238 L 98 245 Q 98 250, 93 250 L 88 250 Q 83 250, 83 245 Z" fill="#18141c"/>

        <!-- Side Mirrors -->
        <rect x="17" y="194" width="8" height="11" rx="4" fill="#ffffff" stroke="#18141c" stroke-width="3"/>
        <rect x="103" y="194" width="8" height="11" rx="4" fill="#ffffff" stroke="#18141c" stroke-width="3"/>

        <!-- Rounded Van Shell -->
        <path d="M 24 184 Q 24 154, 54 154 L 74 154 Q 104 154, 104 184 L 104 228 Q 104 238, 94 238 L 34 238 Q 24 238, 24 228 Z"
              fill="url(#gh-van-body)" stroke="#18141c" stroke-width="4"/>

        <!-- Tinted Windshield + Glare Highlight -->
        <path d="M 35 182 Q 35 164, 53 164 L 75 164 Q 93 164, 93 182 L 93 188 Q 93 192, 89 192 L 39 192 Q 35 192, 35 188 Z"
              fill="url(#gh-van-glass)" stroke="#18141c" stroke-width="3"/>
        <rect x="42" y="168" width="18" height="5" rx="2.5" fill="#ffffff" fill-opacity="0.85"/>

        <!-- Headlights, Grille & Front Bumper -->
        <rect x="31" y="201" width="13" height="11" rx="4" fill="#ffe74c" stroke="#18141c" stroke-width="2"/>
        <rect x="52" y="200" width="24" height="13" rx="4" fill="#343a40" stroke="#18141c" stroke-width="2"/>
        <rect x="84" y="201" width="13" height="11" rx="4" fill="#ffe74c" stroke="#18141c" stroke-width="2"/>
        <rect x="33" y="226" width="62" height="6" rx="3" fill="#dee2e6" stroke="#18141c" stroke-width="2"/>
      </g>

      <!-- Horizontal Terracotta Wood Wall Section -->
      <rect x="128" y="116" width="160" height="138" fill="url(#gh-wood-siding)"/>

      <!-- Gray Concrete Half-Wall -->
      <rect x="128" y="184" width="98" height="70" fill="#d5d8dc" stroke="#18141c" stroke-width="4.5"/>
      <rect x="130" y="186" width="94" height="6" fill="#ffffff" fill-opacity="0.5"/>

      <!-- Matching Wood Storage Room Door -->
      <rect x="226" y="122" width="58" height="132" fill="url(#gh-wood-siding)" stroke="#18141c" stroke-width="4"/>
      <rect x="228" y="124" width="5" height="128" fill="#966141" fill-opacity="0.55"/>
      <rect x="277" y="124" width="5" height="128" fill="#966141" fill-opacity="0.55"/>
      <rect x="228" y="124" width="54" height="3" fill="#ffe0c6" fill-opacity="0.25"/>
      <circle cx="273" cy="184" r="4" fill="#4a3525" stroke="#18141c" stroke-width="2"/>

      <!-- Entry Step Stone -->
      <rect x="176" y="253" width="44" height="9" rx="3" fill="#f8f9fa" stroke="#18141c" stroke-width="3"/>

      <!-- ===================================================================
           3. RIGHT WING: WHITE OPEN PORCH (STEEL BARS) + [ | ] GREEN SECTION
           =================================================================== -->
      <!-- Right Wing Structural Frame -->
      <rect x="288" y="110" width="410" height="148" fill="#18141c"/>

      <!-- White Lit Open-Air Porch Backdrop -->
      <rect x="288" y="114" width="244" height="98" fill="url(#gh-porch-wall)"/>
      <rect class="house-warm-glow" x="288" y="114" width="244" height="98" fill="url(#gh-porch-glow)"/>
      <rect x="400" y="114" width="22" height="7" fill="#fff9db" stroke="#18141c" stroke-width="2"/>

      <!-- Lower Main House Door (Left-Most Behind Steel Bars) -->
      <rect x="298" y="130" width="54" height="82" fill="#18141c"/>
      <rect x="302" y="134" width="46" height="78" fill="#a67c52"/>
      <rect x="302" y="134" width="46" height="2" fill="#c99e72"/>
      <rect x="309" y="142" width="32" height="20" fill="#fff3b0" stroke="#18141c" stroke-width="2"/>
      <circle cx="309" cy="179" r="3" fill="#2b2129"/>

      <!-- Porch Potted Plant & Wooden Bench -->
      <path d="M 370 198 Q 370 184, 381 184 Q 392 184, 392 198 L 392 200 L 370 200 Z"
            fill="#52b788" stroke="#18141c" stroke-width="2"/>
      <rect x="374" y="200" width="14" height="12" fill="#e07a5f" stroke="#18141c" stroke-width="2"/>
      <rect x="436" y="190" width="78" height="22" fill="#bc6c25" stroke="#18141c" stroke-width="3"/>

      <!-- Foreground Steel Security Bars -->
      <g>
        <!-- Top & Middle Horizontal Bars -->
        <rect x="288" y="114" width="244" height="5" fill="#1e1b26"/>
        <rect x="288" y="160" width="244" height="5" fill="#1e1b26"/>
        <line x1="288" y1="160.5" x2="532" y2="160.5" stroke="#474259" stroke-width="1"/>

        <!-- 9 Vertical Steel Bars -->
        <rect x="298" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="298.5" y1="114" x2="298.5" y2="212" stroke="#474259" stroke-width="1"/>
        <rect x="325" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="325.5" y1="114" x2="325.5" y2="212" stroke="#474259" stroke-width="1"/>
        <rect x="353" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="353.5" y1="114" x2="353.5" y2="212" stroke="#474259" stroke-width="1"/>
        <rect x="380" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="380.5" y1="114" x2="380.5" y2="212" stroke="#474259" stroke-width="1"/>
        <rect x="408" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="408.5" y1="114" x2="408.5" y2="212" stroke="#474259" stroke-width="1"/>
        <rect x="435" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="435.5" y1="114" x2="435.5" y2="212" stroke="#474259" stroke-width="1"/>
        <rect x="463" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="463.5" y1="114" x2="463.5" y2="212" stroke="#474259" stroke-width="1"/>
        <rect x="490" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="490.5" y1="114" x2="490.5" y2="212" stroke="#474259" stroke-width="1"/>
        <rect x="517" y="114" width="5" height="98" fill="#1e1b26"/>
        <line x1="517.5" y1="114" x2="517.5" y2="212" stroke="#474259" stroke-width="1"/>
      </g>

      <!-- Lower Gray Porch Concrete Wall Flanked by Brown Pillars -->
      <rect x="288" y="212" width="244" height="42" fill="#d5d8dc"/>
      <rect x="288" y="212" width="244" height="4" fill="#18141c"/>
      <rect x="288" y="212" width="11" height="42" fill="#7f4f24" stroke="#18141c" stroke-width="3"/>
      <rect x="521" y="212" width="11" height="42" fill="#7f4f24" stroke="#18141c" stroke-width="3"/>

      <!-- Far-Right Green Accent Wall + [ | ] Split Casement Window -->
      <rect x="538" y="116" width="154" height="138" fill="url(#gh-green-siding)"/>
      <rect x="564" y="146" width="102" height="64" fill="#18141c"/>
      <rect x="571" y="153" width="41.5" height="50" fill="#484652"/>
      <rect x="617.5" y="153" width="41.5" height="50" fill="#484652"/>
      <rect x="576" y="158" width="6" height="16" rx="2" fill="#ffffff" fill-opacity="0.14"/>
      <rect x="622.5" y="158" width="6" height="16" rx="2" fill="#ffffff" fill-opacity="0.14"/>

      <!-- ===================================================================
           4. FRONT GARDEN PLANTER (Bushes, Square Blooms & Segmented Curb)
           =================================================================== -->
      <!-- Left Garden Zone (In Front of Porch) -->
      <g>
        <!-- Bush 1 -->
        <path d="M 312 249 L 312 243 Q 312 231, 326 231 L 342 231 Q 356 231, 356 243 L 356 249 Q 356 253, 352 253 L 316 253 Q 312 253, 312 249 Z"
              fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
        <rect x="318" y="235" width="24" height="8" rx="4" fill="#52b788"/>

        <!-- Blue & Teal Square Flowers -->
        <rect x="373" y="244" width="3" height="8" fill="#40916c"/>
        <rect x="370" y="235" width="10" height="10" rx="2" fill="#35a7ff" stroke="#18141c" stroke-width="2"/>
        <rect x="389" y="244" width="3" height="8" fill="#40916c"/>
        <rect x="386" y="235" width="10" height="10" rx="2" fill="#72efdd" stroke="#18141c" stroke-width="2"/>

        <!-- Small Bush -->
        <path d="M 408 249 L 408 246 Q 408 235, 420 235 L 426 235 Q 438 235, 438 246 L 438 249 Q 438 253, 434 253 L 412 253 Q 408 253, 408 249 Z"
              fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
        <rect x="414" y="239" width="16" height="6" rx="3" fill="#52b788"/>

        <!-- Bush 2 -->
        <path d="M 450 249 L 450 243 Q 450 231, 464 231 L 480 231 Q 494 231, 494 243 L 494 249 Q 494 253, 490 253 L 454 253 Q 450 253, 450 249 Z"
              fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
        <rect x="456" y="235" width="24" height="8" rx="4" fill="#52b788"/>

        <!-- Blue Flower -->
        <rect x="511" y="244" width="3" height="8" fill="#40916c"/>
        <rect x="508" y="235" width="10" height="10" rx="2" fill="#35a7ff" stroke="#18141c" stroke-width="2"/>
      </g>

      <!-- Right Garden Zone (In Front of Green Wall) -->
      <g>
        <!-- Yellow, Teal & Coral Square Flowers -->
        <rect x="557" y="244" width="3" height="8" fill="#40916c"/>
        <rect x="554" y="235" width="10" height="10" rx="2" fill="#ffe74c" stroke="#18141c" stroke-width="2"/>
        <rect x="573" y="244" width="3" height="8" fill="#40916c"/>
        <rect x="570" y="235" width="10" height="10" rx="2" fill="#72efdd" stroke="#18141c" stroke-width="2"/>
        <rect x="589" y="244" width="3" height="8" fill="#40916c"/>
        <rect x="586" y="235" width="10" height="10" rx="2" fill="#ff5964" stroke="#18141c" stroke-width="2"/>

        <!-- Small Bush -->
        <path d="M 626 249 L 626 246 Q 626 235, 638 235 L 644 235 Q 656 235, 656 246 L 656 249 Q 656 253, 652 253 L 630 253 Q 626 253, 626 249 Z"
              fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
        <rect x="632" y="239" width="16" height="6" rx="3" fill="#52b788"/>
      </g>

      <!-- Segmented Concrete Garden Curb -->
      <rect x="288" y="251" width="408" height="11" rx="2" fill="url(#gh-curb-blocks)" stroke="#18141c" stroke-width="3"/>
    </svg>
  `;

  Object.assign(window.App.Sprites, {
    GREEN_HOUSE_EXTERIOR_SVG,
  });
})();
