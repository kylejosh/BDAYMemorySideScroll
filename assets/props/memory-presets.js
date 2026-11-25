window.App = window.App || {};
window.App.Sprites = window.App.Sprites || {};

(() => {
  const PRESET_ILLUSTRATIONS = {
    'preset:family': `
      <svg class="art-2d art-2d-1" viewBox="0 0 230 150">
        <circle cx="185" cy="34" r="18" fill="#ffe74c" stroke="#18141c" stroke-width="3"/>
        <circle cx="88" cy="84" r="14" fill="#f3c19d" stroke="#18141c" stroke-width="3"/>
        <rect x="70" y="98" width="36" height="40" rx="14" fill="#ff758f" stroke="#18141c" stroke-width="3"/>
        <circle cx="122" cy="92" r="11" fill="#f3c19d" stroke="#18141c" stroke-width="3"/>
        <rect x="108" y="103" width="28" height="34" rx="11" fill="#4ea8de" stroke="#18141c" stroke-width="3"/>
        <circle cx="150" cy="94" r="11" fill="#f3c19d" stroke="#18141c" stroke-width="3"/>
        <rect x="136" y="105" width="28" height="32" rx="11" fill="#ffbe0b" stroke="#18141c" stroke-width="3"/>
      </svg>`,
    'preset:van': `
      <svg class="art-2d art-2d-2" viewBox="0 0 230 150">
        <rect x="48" y="54" width="134" height="62" rx="22" fill="#ffffff" stroke="#18141c" stroke-width="3.5"/>
        <rect x="64" y="66" width="28" height="22" rx="5" fill="#90e0ef" stroke="#18141c" stroke-width="2.5"/>
        <rect x="100" y="66" width="28" height="22" rx="5" fill="#90e0ef" stroke="#18141c" stroke-width="2.5"/>
        <rect x="136" y="66" width="28" height="22" rx="5" fill="#90e0ef" stroke="#18141c" stroke-width="2.5"/>
        <circle cx="80" cy="116" r="13" fill="#231c24" stroke="#adb5bd" stroke-width="3"/>
        <circle cx="152" cy="116" r="13" fill="#231c24" stroke="#adb5bd" stroke-width="3"/>
      </svg>`,
    'preset:graduation': `
      <svg class="art-2d art-2d-3" viewBox="0 0 230 150">
        <polygon points="56,34 84,22 112,34 84,46" fill="#18141c"/>
        <line x1="106" y1="36" x2="106" y2="54" stroke="#ffe74c" stroke-width="3"/>
        <polygon points="122,30 150,18 178,30 150,42" fill="#18141c"/>
        <line x1="172" y1="32" x2="172" y2="50" stroke="#ffe74c" stroke-width="3"/>
        <path d="M115 124 C78 96 74 68 96 64 C108 62 115 72 115 72 C115 72 122 62 134 64 C156 68 152 96 115 124 Z" fill="#ff4d6d" stroke="#18141c" stroke-width="3.5"/>
      </svg>`
  };

  function renderPictureHTML(picValue, altText) {
    if (typeof picValue === 'string' && picValue.startsWith('preset:')) {
      return PRESET_ILLUSTRATIONS[picValue] || PRESET_ILLUSTRATIONS['preset:family'];
    }
    return `<img src="${picValue}" alt="${altText}" />`;
  }

  Object.assign(window.App.Sprites, {
    renderPictureHTML
  });
})();