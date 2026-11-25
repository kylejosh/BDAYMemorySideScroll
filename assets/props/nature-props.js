window.App = window.App || {};
window.App.Sprites = window.App.Sprites || {};

(() => {
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

  Object.assign(window.App.Sprites, {
    TREES,
  });
})();
