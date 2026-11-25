window.App = window.App || {};
window.App.Sprites = window.App.Sprites || {};

(() => {
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

  Object.assign(window.App.Sprites, {
    GREEN_HOUSE_EXTERIOR_SVG,
  });
})();
