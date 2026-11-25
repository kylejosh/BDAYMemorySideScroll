window.App = window.App || {};

window.App.Sprites = (() => {
  /* ========================================================================
     1. CHIBI PIXEL CHARACTER MATRICES (Mom — 28 x 36 Grid)
     ======================================================================== */
  const CHIBI_PALETTE = {
    O: "#2a1610",
    H: "#7e472b",
    h: "#5b301b",
    L: "#9f5e3b",
    B: "#f26d1d",
    b: "#ce4e0c",
    Y: "#ff9647",
    S: "#fbd5bf",
    s: "#edae90",
    E: "#1f120d",
    P: "#f4958e",
    M: "#d84a58",
    W: "#f7edd0",
    w: "#dfd0a6",
    G: "#6e5f5a",
    g: "#524540",
    K: "#f7f2ea",
    F: "#733e1f",
    f: "#4c2510",
  };

  const CHIBI_FRONT_IDLE = [
    ".........OOOOOOOOOO.........",
    "......OOOHHHHHHHHHHOOO......",
    "....OOHHHLLLLLLLLLLHHHOO....",
    "...OOHHHHHHHHHHHHHHHHHHOO...",
    "..OOHHHBBBBBBBBBBBBBBHHHOO..",
    ".OOHHBBHHHHHHHHHHHHHHBBHHOO.",
    ".OOHBHHHHHHHHHHHHHHHHHHBHOO.",
    ".OOHHHHHHHHHHHHHHHHHHHHHHOO.",
    "OOHHHHHHHHHHHOOHHHHHHHHHHHOO",
    "OOHHHHHHHOOOSSSSOOOHHHHHHHOO",
    "OOHHHHHOOSSSSSSSSSSOOHHHHHOO",
    "OOHHHOSSSSSSSSSSSSSSSSOHHHOO",
    ".OOHOSSSSSEESSSSEESSSSSOHOO.",
    "OOHOSSSSSSEESSSSEESSSSSSOHOO",
    "OOHhOSSSSSEESSSSEESSSSSOhHOO",
    "OOShOSSSSPPPSSSSPPPSSSSOhSOO",
    ".OOhOSSSSPPPMMMMPPPSSSSOhOO.",
    ".OOhHOSSSSSSMMMMSSSSSSOhHOO.",
    "..OOhHOSSSSSSSSSSSSSSOhHOO..",
    "...OOOhOOSSSSSSSSSSOOOhOO...",
    "....OOOOOWWBBBBBBWWOOOOO....",
    "...OOWWWOWBBYBBYBBWOWWWOO...",
    "..OOWWWwOBBBBBBBBBBOwWWWOO..",
    "..OOWWwOOBBBBBBBBBBOOwWWOO..",
    "..OOSsOOBBBBBBBBBBBBOOsSOO..",
    "...OO.OBBBYYYYYYYYBBBO.OO...",
    "......OBBBYBBBBBBYBBBO......",
    ".....OOBBBYBBBBBBYBBBOO.....",
    ".....OGOBBBYYYYYYBBBOGO.....",
    ".....OGgOBBBBBBBBBBOgGO.....",
    "......OggOOOOOOOOOOggO......",
    ".......OOKKKO..OOKKKO.......",
    ".......OOKKKO..OOKKKO.......",
    "......OOFFFFO..OOFFFFO......",
    "......OOKFFFO..OOKFFFO......",
    "......OOffffO..OOffffO......",
  ];

  const CHIBI_SIDE_WALK_1 = [
    ".........OOOOOOOOOO.........",
    "......OOOHHHHHHHHHHOOO......",
    "....OOHHHLLLLLLLLLLHHHOO....",
    "...OOHHHHHHHHHHHBBHHHHHOO...",
    "..OOHHHHHHHHHHHHBBHHHHHHHO..",
    ".OOHHHHHHHHHHHHHHBBHHHHHHHO.",
    ".OOHHHHHHHHHHHHHHBBHHHHHHHO.",
    ".OOHHHHHHHHHHHHHHHBBHHHHHHO.",
    "OOHHHHHHHHHHHHHHHHBBHHHHHHOO",
    "OOHHHHHHHHHHHHHHHHBBOOOOOHHO",
    "OOHHHHHHHHHHHHHHHHOSSSSSSOO.",
    "OOHHHHHHHHHHHHHHHOSSSSSSSSO.",
    ".OOHHHHHHHHHHHHHOSSSSSEESOO.",
    ".OOHHHHHHHHHHHHOSSSSSSEESOO.",
    "..OOHHHHHHHHHHHOsSSSSSEESOO.",
    "..OOHHhHHHHHHHHOsSSSSPPPSOO.",
    "...OOhHhHHHHHHHOSSSSSPPPSOO.",
    "....OOhHhHHHHHHHOSSSSSMMOO..",
    ".....OOOhHHHHHHHHOSSSSSOO...",
    ".......OOOOOOOOOOOWWWOOO....",
    ".........OOWWWWWWOBBBO......",
    "........OOWWWWWWWOBBBBO.....",
    ".......OOBbOWWWWWOBBBBBO....",
    "......OOBbbBOSSSSOBBBBBO....",
    "......OOBbbBOSSSSOBBBBBBO...",
    ".......OObBOSSSSSOBBBBBBO...",
    "........OOGGOOSSOBBBBBBBO...",
    "........OGGgO..OOBBBBBBO....",
    "........OGggO..OOBBBBBO.....",
    ".........OOO....OOOOOO......",
    "........OOKKO......OOKKO....",
    ".......OOKKKO.....OOKKKO....",
    "......OOFFFFO.....OOFFFFO...",
    "......OOKFFFO.....OOKFFFO...",
    "......OOffffO.....OOffffO...",
    "............................",
  ];

  const CHIBI_SIDE_MID = [
    ".........OOOOOOOOOO.........",
    "......OOOHHHHHHHHHHOOO......",
    "....OOHHHLLLLLLLLLLHHHOO....",
    "...OOHHHHHHHHHHHBBHHHHHOO...",
    "..OOHHHHHHHHHHHHBBHHHHHHHO..",
    ".OOHHHHHHHHHHHHHHBBHHHHHHHO.",
    ".OOHHHHHHHHHHHHHHBBHHHHHHHO.",
    ".OOHHHHHHHHHHHHHHHBBHHHHHHO.",
    "OOHHHHHHHHHHHHHHHHBBHHHHHHOO",
    "OOHHHHHHHHHHHHHHHHBBOOOOOHHO",
    "OOHHHHHHHHHHHHHHHHOSSSSSSOO.",
    "OOHHHHHHHHHHHHHHHOSSSSSSSSO.",
    ".OOHHHHHHHHHHHHHOSSSSSEESOO.",
    ".OOHHHHHHHHHHHHOSSSSSSEESOO.",
    "..OOHHHHHHHHHHHOsSSSSSEESOO.",
    "..OOHHhHHHHHHHHOsSSSSPPPSOO.",
    "...OOhHhHHHHHHHOSSSSSPPPSOO.",
    "....OOhHhHHHHHHHOSSSSSMMOO..",
    ".....OOOhHHHHHHHHOSSSSSOO...",
    ".......OOOOOOOOOOOWWWOOO....",
    ".........OOWWWWWWOBBBO......",
    "........OOWWWWWWWOBBBBO.....",
    ".......OOBbOWWWWWOBBBBBO....",
    "......OOBbbBOWWWwOBBBBBO....",
    "......OOBbbBOSSSSOBBBBBBO...",
    ".......OObBOSSSSSOBBBBBBO...",
    "........OOGGOSSSSOBBBBBBO...",
    "........OGGgOOOOOBBBBBBBO...",
    "........OGggO...OOBBBBBO....",
    ".........OOO.....OOOOOO.....",
    "...........OOKKKOO..........",
    "...........OOKKKOO..........",
    "..........OOFFFFFO..........",
    "..........OOKFFFFO..........",
    "..........OOfffffO..........",
    "............................",
  ];

  const CHIBI_SIDE_WALK_2 = [
    ".........OOOOOOOOOO.........",
    "......OOOHHHHHHHHHHOOO......",
    "....OOHHHLLLLLLLLLLHHHOO....",
    "...OOHHHHHHHHHHHBBHHHHHOO...",
    "..OOHHHHHHHHHHHHBBHHHHHHHO..",
    ".OOHHHHHHHHHHHHHHBBHHHHHHHO.",
    ".OOHHHHHHHHHHHHHHBBHHHHHHHO.",
    ".OOHHHHHHHHHHHHHHHBBHHHHHHO.",
    "OOHHHHHHHHHHHHHHHHBBHHHHHHOO",
    "OOHHHHHHHHHHHHHHHHBBOOOOOHHO",
    "OOHHHHHHHHHHHHHHHHOSSSSSSOO.",
    "OOHHHHHHHHHHHHHHHOSSSSSSSSO.",
    ".OOHHHHHHHHHHHHHOSSSSSEESOO.",
    ".OOHHHHHHHHHHHHOSSSSSSEESOO.",
    "..OOHHHHHHHHHHHOsSSSSSEESOO.",
    "..OOHHhHHHHHHHHOsSSSSPPPSOO.",
    "...OOhHhHHHHHHHOSSSSSPPPSOO.",
    "....OOhHhHHHHHHHOSSSSSMMOO..",
    ".....OOOhHHHHHHHHOSSSSSOO...",
    ".......OOOOOOOOOOOWWWOOO....",
    ".........OOWWWWWWOBBBO......",
    "........OOWWWWWWWOBBBBO.....",
    ".......OOBbOWWWWWOBBBBBO....",
    "......OOBbbBOWWWwOBBBBBO....",
    "......OOBbbBOWSSWOBBBBBBO...",
    ".......OObBOSSSSSOBBBBBBO...",
    "........OOGGOSSSSOBBBBBBO...",
    "........OGGgO..OOBBBBBBBO...",
    "........OGggO..OOBBBBBBO....",
    ".........OOO....OOOOOOO.....",
    "...........OOKKO..OOKKO.....",
    "..........OOKKKO.OOKKKO.....",
    ".........OOFFFFOOOFFFFO.....",
    ".........OOKFFFOOOKFFFO.....",
    ".........OOffffOOOffffO.....",
    "............................",
  ];

  function renderChibiPixelSVG(matrix) {
    const px = 4;
    let rects = "";
    for (let r = 0; r < matrix.length; r++) {
      const row = matrix[r];
      for (let c = 0; c < row.length; c++) {
        const key = row[c];
        if (key !== "." && CHIBI_PALETTE[key]) {
          rects += `<rect x="${c * px}" y="${r * px}" width="${px}" height="${px}" fill="${CHIBI_PALETTE[key]}"/>`;
        }
      }
    }
    return `<svg width="112" height="144" viewBox="0 0 112 144" shape-rendering="crispEdges">${rects}</svg>`;
  }

  const chibiFrontSVG = renderChibiPixelSVG(CHIBI_FRONT_IDLE);
  const chibiWalkFramesSVG = [
    renderChibiPixelSVG(CHIBI_SIDE_WALK_1),
    renderChibiPixelSVG(CHIBI_SIDE_MID),
    renderChibiPixelSVG(CHIBI_SIDE_WALK_2),
    renderChibiPixelSVG(CHIBI_SIDE_MID),
  ];

  /* ========================================================================
     2. FIVE DISTINCT 2D TREE VARIETIES
     ======================================================================== */
  const TREES = {
    oak: `
      <svg width="164" height="190" viewBox="0 0 164 190">
        <path d="M74,190 L76,120 L58,96 L65,91 L80,108 L95,88 L102,94 L86,118 L89,190 Z" fill="#6f4518" stroke="#18141c" stroke-width="3"/>
        <circle cx="52" cy="84" r="34" fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
        <circle cx="112" cy="84" r="34" fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
        <circle cx="82" cy="54" r="42" fill="#40916c" stroke="#18141c" stroke-width="3"/>
        <circle cx="68" cy="46" r="22" fill="#52b788"/>
        <circle cx="102" cy="74" r="18" fill="#52b788"/>
      </svg>`,
    sakura: `
      <svg width="168" height="186" viewBox="0 0 168 186">
        <path d="M76,186 L78,118 L56,94 L63,89 L82,108 L104,86 L110,92 L88,118 L91,186 Z" fill="#5c3a21" stroke="#18141c" stroke-width="3"/>
        <circle cx="50" cy="82" r="33" fill="#ff8fab" stroke="#18141c" stroke-width="3"/>
        <circle cx="116" cy="80" r="33" fill="#ff8fab" stroke="#18141c" stroke-width="3"/>
        <circle cx="84" cy="52" r="42" fill="#ffb3c6" stroke="#18141c" stroke-width="3"/>
        <circle cx="72" cy="44" r="22" fill="#ffe5ec"/>
        <circle cx="104" cy="70" r="16" fill="#ffc2d1"/>
      </svg>`,
    pine: `
      <svg width="136" height="214" viewBox="0 0 136 214">
        <rect x="60" y="164" width="16" height="50" fill="#582f0e" stroke="#18141c" stroke-width="3"/>
        <polygon points="68,82 18,168 118,168" fill="#1b4332" stroke="#18141c" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="68,46 26,124 110,124" fill="#2d6a4f" stroke="#18141c" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="68,14 36,80 100,80" fill="#40916c" stroke="#18141c" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="68,22 50,58 74,58" fill="#52b788"/>
      </svg>`,
    citrus: `
      <svg width="150" height="174" viewBox="0 0 150 174">
        <rect x="68" y="114" width="14" height="60" rx="4" fill="#7f4f24" stroke="#18141c" stroke-width="3"/>
        <circle cx="52" cy="80" r="30" fill="#386641" stroke="#18141c" stroke-width="3"/>
        <circle cx="98" cy="80" r="30" fill="#386641" stroke="#18141c" stroke-width="3"/>
        <circle cx="75" cy="52" r="36" fill="#6a994e" stroke="#18141c" stroke-width="3"/>
        <circle cx="64" cy="44" r="18" fill="#a7c957"/>
        <circle cx="52" cy="76" r="5" fill="#f77f00" stroke="#18141c" stroke-width="1.8"/>
        <circle cx="88" cy="58" r="5" fill="#f77f00" stroke="#18141c" stroke-width="1.8"/>
        <circle cx="96" cy="84" r="5" fill="#fcbf49" stroke="#18141c" stroke-width="1.8"/>
      </svg>`,
    willow: `
      <svg width="166" height="196" viewBox="0 0 166 196">
        <path d="M77,196 L79,112 L87,112 L89,196 Z" fill="#e9ecef" stroke="#18141c" stroke-width="3"/>
        <line x1="80" y1="142" x2="85" y2="142" stroke="#495057" stroke-width="2.5"/>
        <line x1="81" y1="168" x2="87" y2="168" stroke="#495057" stroke-width="2.5"/>
        <path d="M30,136 Q26,46 83,38 Q140,46 136,136 Q116,124 104,138 Q92,122 83,138 Q72,122 60,138 Q48,124 30,136 Z" fill="#52b788" stroke="#18141c" stroke-width="3" stroke-linejoin="round"/>
        <path d="M44,116 Q44,56 83,50 Q114,56 116,112" fill="none" stroke="#95d5b2" stroke-width="4" stroke-linecap="round"/>
      </svg>`,
  };

  /* ========================================================================
     3. PRESET MEMORY ILLUSTRATIONS & GREEN HOUSE EXTERIOR SVG
     ======================================================================== */
  const PRESET_ILLUSTRATIONS = {
    "preset:family": `
      <svg class="art-2d art-2d-1" viewBox="0 0 230 150">
        <circle cx="185" cy="34" r="18" fill="#ffe74c" stroke="#18141c" stroke-width="3"/>
        <circle cx="88" cy="84" r="14" fill="#f3c19d" stroke="#18141c" stroke-width="3"/>
        <rect x="70" y="98" width="36" height="40" rx="14" fill="#ff758f" stroke="#18141c" stroke-width="3"/>
        <circle cx="122" cy="92" r="11" fill="#f3c19d" stroke="#18141c" stroke-width="3"/>
        <rect x="108" y="103" width="28" height="34" rx="11" fill="#4ea8de" stroke="#18141c" stroke-width="3"/>
        <circle cx="150" cy="94" r="11" fill="#f3c19d" stroke="#18141c" stroke-width="3"/>
        <rect x="136" y="105" width="28" height="32" rx="11" fill="#ffbe0b" stroke="#18141c" stroke-width="3"/>
      </svg>`,
    "preset:van": `
      <svg class="art-2d art-2d-2" viewBox="0 0 230 150">
        <rect x="48" y="54" width="134" height="62" rx="22" fill="#ffffff" stroke="#18141c" stroke-width="3.5"/>
        <rect x="64" y="66" width="28" height="22" rx="5" fill="#90e0ef" stroke="#18141c" stroke-width="2.5"/>
        <rect x="100" y="66" width="28" height="22" rx="5" fill="#90e0ef" stroke="#18141c" stroke-width="2.5"/>
        <rect x="136" y="66" width="28" height="22" rx="5" fill="#90e0ef" stroke="#18141c" stroke-width="2.5"/>
        <circle cx="80" cy="116" r="13" fill="#231c24" stroke="#adb5bd" stroke-width="3"/>
        <circle cx="152" cy="116" r="13" fill="#231c24" stroke="#adb5bd" stroke-width="3"/>
      </svg>`,
    "preset:graduation": `
      <svg class="art-2d art-2d-3" viewBox="0 0 230 150">
        <polygon points="56,34 84,22 112,34 84,46" fill="#18141c"/>
        <line x1="106" y1="36" x2="106" y2="54" stroke="#ffe74c" stroke-width="3"/>
        <polygon points="122,30 150,18 178,30 150,42" fill="#18141c"/>
        <line x1="172" y1="32" x2="172" y2="50" stroke="#ffe74c" stroke-width="3"/>
        <path d="M115 124 C78 96 74 68 96 64 C108 62 115 72 115 72 C115 72 122 62 134 64 C156 68 152 96 115 124 Z" fill="#ff4d6d" stroke="#18141c" stroke-width="3.5"/>
      </svg>`,
  };

  const GREEN_HOUSE_EXTERIOR_SVG = `
    <svg width="700" height="264" viewBox="0 0 700 264">
      <defs>
        <pattern id="roof-stripes-2d" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#1db954"/>
          <line x1="0" y1="14" x2="16" y2="14" stroke="#158f40" stroke-width="3"/>
        </pattern>
        <pattern id="wood-siding-2d" width="20" height="18" patternUnits="userSpaceOnUse">
          <rect width="20" height="18" fill="#b57c58"/>
          <line x1="0" y1="17" x2="20" y2="17" stroke="#966141" stroke-width="2.5"/>
        </pattern>
        <pattern id="green-siding-2d" width="20" height="18" patternUnits="userSpaceOnUse">
          <rect width="20" height="18" fill="#22c55e"/>
          <line x1="0" y1="17" x2="20" y2="17" stroke="#16a34a" stroke-width="2.5"/>
        </pattern>
      </defs>

      <polygon points="144,6 286,114 4,114" fill="url(#roof-stripes-2d)" stroke="#18141c" stroke-width="5" stroke-linejoin="round"/>
      <polygon points="492,16 696,114 286,114" fill="url(#roof-stripes-2d)" stroke="#18141c" stroke-width="5" stroke-linejoin="round"/>

      <rect x="6" y="114" width="120" height="148" fill="#d5d8dc" stroke="#18141c" stroke-width="4.5"/>
      <rect x="8" y="116" width="116" height="12" fill="#f8f9fa"/>
      <ellipse cx="66" cy="126" rx="14" ry="6" fill="#ffe74c"/>
      <rect x="30" y="162" width="72" height="84" rx="22" fill="#ffffff" stroke="#18141c" stroke-width="4"/>
      <rect x="20" y="196" width="10" height="14" rx="4" fill="#ffffff" stroke="#18141c" stroke-width="3.5"/>
      <rect x="102" y="196" width="10" height="14" rx="4" fill="#ffffff" stroke="#18141c" stroke-width="3.5"/>
      <rect x="38" y="172" width="56" height="28" rx="9" fill="#90e0ef" stroke="#18141c" stroke-width="3.5"/>
      <circle cx="42" cy="218" r="7" fill="#ffe74c" stroke="#18141c" stroke-width="2.5"/>
      <circle cx="90" cy="218" r="7" fill="#ffe74c" stroke="#18141c" stroke-width="2.5"/>
      <rect x="54" y="213" width="24" height="12" rx="4" fill="#343a40"/>
      <rect x="34" y="244" width="16" height="16" rx="4" fill="#18141c"/>
      <rect x="82" y="244" width="16" height="16" rx="4" fill="#18141c"/>

      <rect x="126" y="114" width="160" height="148" fill="url(#wood-siding-2d)" stroke="#18141c" stroke-width="4.5"/>
      <rect x="128" y="190" width="96" height="70" fill="#d5d8dc" stroke="#18141c" stroke-width="4"/>
      <rect x="224" y="130" width="60" height="130" rx="3" fill="url(#wood-siding-2d)" stroke="#18141c" stroke-width="4"/>
      <circle cx="272" cy="196" r="4.5" fill="#3a281c"/>

      <rect x="286" y="114" width="244" height="102" fill="#fcf8e3" stroke="#18141c" stroke-width="4.5"/>
      <ellipse cx="408" cy="126" rx="54" ry="14" fill="#fff3b0"/>
      <ellipse class="house-warm-glow" cx="408" cy="158" rx="98" ry="44" fill="#ffe74c"/>
      <rect x="300" y="136" width="56" height="78" rx="4" fill="#a67c52" stroke="#18141c" stroke-width="4"/>
      <rect x="310" y="146" width="36" height="22" rx="3" fill="#fff3b0" stroke="#18141c" stroke-width="2.5"/>
      <circle cx="309" cy="182" r="3.5" fill="#18141c"/>
      <rect x="372" y="196" width="20" height="18" rx="4" fill="#e07a5f" stroke="#18141c" stroke-width="2.5"/>
      <circle cx="382" cy="188" r="12" fill="#52b788" stroke="#18141c" stroke-width="2.5"/>
      <rect x="442" y="194" width="72" height="20" rx="4" fill="#bc6c25" stroke="#18141c" stroke-width="3"/>
      <line x1="286" y1="164" x2="530" y2="164" stroke="#18141c" stroke-width="4"/>
      <g stroke="#18141c" stroke-width="3.5">
        <line x1="302" y1="114" x2="302" y2="216"/>
        <line x1="326" y1="114" x2="326" y2="216"/>
        <line x1="350" y1="114" x2="350" y2="216"/>
        <line x1="374" y1="114" x2="374" y2="216"/>
        <line x1="398" y1="114" x2="398" y2="216"/>
        <line x1="422" y1="114" x2="422" y2="216"/>
        <line x1="446" y1="114" x2="446" y2="216"/>
        <line x1="470" y1="114" x2="470" y2="216"/>
        <line x1="494" y1="114" x2="494" y2="216"/>
        <line x1="518" y1="114" x2="518" y2="216"/>
      </g>
      <rect x="286" y="216" width="244" height="46" fill="#d5d8dc" stroke="#18141c" stroke-width="4.5"/>
      <rect x="288" y="216" width="12" height="44" fill="#7f4f24"/>
      <rect x="516" y="216" width="12" height="44" fill="#7f4f24"/>

      <rect x="530" y="114" width="160" height="148" fill="url(#green-siding-2d)" stroke="#18141c" stroke-width="4.5"/>
      <rect x="560" y="148" width="100" height="64" rx="5" fill="#18141c"/>
      <rect x="566" y="154" width="41" height="52" rx="2" fill="#484652"/>
      <rect x="613" y="154" width="41" height="52" rx="2" fill="#484652"/>
      <rect class="house-warm-glow" x="566" y="154" width="41" height="52" rx="2" fill="#ffe74c"/>
      <rect class="house-warm-glow" x="613" y="154" width="41" height="52" rx="2" fill="#ffe74c"/>

      <ellipse cx="326" cy="244" rx="22" ry="12" fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
      <circle cx="372" cy="240" r="6" fill="#35a7ff" stroke="#18141c" stroke-width="2"/>
      <circle cx="388" cy="242" r="5" fill="#72efdd" stroke="#18141c" stroke-width="2"/>
      <ellipse cx="430" cy="245" rx="18" ry="10" fill="#40916c" stroke="#18141c" stroke-width="3"/>
      <ellipse cx="478" cy="244" rx="22" ry="11" fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
      <circle cx="556" cy="242" r="5.5" fill="#ffe74c" stroke="#18141c" stroke-width="2"/>
      <circle cx="576" cy="242" r="5.5" fill="#72efdd" stroke="#18141c" stroke-width="2"/>
      <circle cx="596" cy="242" r="5.5" fill="#ff5964" stroke="#18141c" stroke-width="2"/>
      <ellipse cx="644" cy="244" rx="20" ry="11" fill="#2d6a4f" stroke="#18141c" stroke-width="3"/>
      <rect x="286" y="252" width="406" height="10" rx="3" fill="#ced4da" stroke="#18141c" stroke-width="3"/>
    </svg>
  `;

  function renderPictureHTML(picValue, altText) {
    if (typeof picValue === "string" && picValue.startsWith("preset:")) {
      return (
        PRESET_ILLUSTRATIONS[picValue] || PRESET_ILLUSTRATIONS["preset:family"]
      );
    }
    return `<img src="${picValue}" alt="${altText}" />`;
  }

  return {
    chibiFrontSVG,
    chibiWalkFramesSVG,
    TREES,
    GREEN_HOUSE_EXTERIOR_SVG,
    renderPictureHTML,
  };
})();
