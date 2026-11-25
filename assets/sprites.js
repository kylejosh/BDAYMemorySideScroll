window.App = window.App || {};

window.App.Sprites = (() => {
  /* ========================================================================
     1. CHIBI PIXEL CHARACTER MATRICES (Mom — 28 x 36 Grid)
     ======================================================================== */
  const CHIBI_PALETTE = {
    O: '#2a1610', H: '#7e472b', h: '#5b301b', L: '#9f5e3b',
    B: '#f26d1d', b: '#ce4e0c', Y: '#ff9647', S: '#fbd5bf',
    s: '#edae90', E: '#1f120d', P: '#f4958e', M: '#d84a58',
    W: '#f7edd0', w: '#dfd0a6', G: '#6e5f5a', g: '#524540',
    K: '#f7f2ea', F: '#733e1f', f: '#4c2510'
  };

  const CHIBI_FRONT_IDLE = [
    '.........OOOOOOOOOO.........',
    '......OOOHHHHHHHHHHOOO......',
    '....OOHHHLLLLLLLLLLHHHOO....',
    '...OOHHHHHHHHHHHHHHHHHHOO...',
    '..OOHHHBBBBBBBBBBBBBBHHHOO..',
    '.OOHHBBHHHHHHHHHHHHHHBBHHOO.',
    '.OOHBHHHHHHHHHHHHHHHHHHBHOO.',
    '.OOHHHHHHHHHHHHHHHHHHHHHHOO.',
    'OOHHHHHHHHHHHOOHHHHHHHHHHHOO',
    'OOHHHHHHHOOOSSSSOOOHHHHHHHOO',
    'OOHHHHHOOSSSSSSSSSSOOHHHHHOO',
    'OOHHHOSSSSSSSSSSSSSSSSOHHHOO',
    '.OOHOSSSSSEESSSSEESSSSSOHOO.',
    'OOHOSSSSSSEESSSSEESSSSSSOHOO',
    'OOHhOSSSSSEESSSSEESSSSSOhHOO',
    'OOShOSSSSPPPSSSSPPPSSSSOhSOO',
    '.OOhOSSSSPPPMMMMPPPSSSSOhOO.',
    '.OOhHOSSSSSSMMMMSSSSSSOhHOO.',
    '..OOhHOSSSSSSSSSSSSSSOhHOO..',
    '...OOOhOOSSSSSSSSSSOOOhOO...',
    '....OOOOOWWBBBBBBWWOOOOO....',
    '...OOWWWOWBBYBBYBBWOWWWOO...',
    '..OOWWWwOBBBBBBBBBBOwWWWOO..',
    '..OOWWwOOBBBBBBBBBBOOwWWOO..',
    '..OOSsOOBBBBBBBBBBBBOOsSOO..',
    '...OO.OBBBYYYYYYYYBBBO.OO...',
    '......OBBBYBBBBBBYBBBO......',
    '.....OOBBBYBBBBBBYBBBOO.....',
    '.....OGOBBBYYYYYYBBBOGO.....',
    '.....OGgOBBBBBBBBBBOgGO.....',
    '......OggOOOOOOOOOOggO......',
    '.......OOKKKO..OOKKKO.......',
    '.......OOKKKO..OOKKKO.......',
    '......OOFFFFO..OOFFFFO......',
    '......OOKFFFO..OOKFFFO......',
    '......OOffffO..OOffffO......'
  ];

  const CHIBI_SIDE_WALK_1 = [
    '.........OOOOOOOOOO.........',
    '......OOOHHHHHHHHHHOOO......',
    '....OOHHHLLLLLLLLLLHHHOO....',
    '...OOHHHHHHHHHHHBBHHHHHOO...',
    '..OOHHHHHHHHHHHHBBHHHHHHHO..',
    '.OOHHHHHHHHHHHHHHBBHHHHHHHO.',
    '.OOHHHHHHHHHHHHHHBBHHHHHHHO.',
    '.OOHHHHHHHHHHHHHHHBBHHHHHHO.',
    'OOHHHHHHHHHHHHHHHHBBHHHHHHOO',
    'OOHHHHHHHHHHHHHHHHBBOOOOOHHO',
    'OOHHHHHHHHHHHHHHHHOSSSSSSOO.',
    'OOHHHHHHHHHHHHHHHOSSSSSSSSO.',
    '.OOHHHHHHHHHHHHHOSSSSSEESOO.',
    '.OOHHHHHHHHHHHHOSSSSSSEESOO.',
    '..OOHHHHHHHHHHHOsSSSSSEESOO.',
    '..OOHHhHHHHHHHHOsSSSSPPPSOO.',
    '...OOhHhHHHHHHHOSSSSSPPPSOO.',
    '....OOhHhHHHHHHHOSSSSSMMOO..',
    '.....OOOhHHHHHHHHOSSSSSOO...',
    '.......OOOOOOOOOOOWWWOOO....',
    '.........OOWWWWWWOBBBO......',
    '........OOWWWWWWWOBBBBO.....',
    '.......OOBbOWWWWWOBBBBBO....',
    '......OOBbbBOSSSSOBBBBBO....',
    '......OOBbbBOSSSSOBBBBBBO...',
    '.......OObBOSSSSSOBBBBBBO...',
    '........OOGGOOSSOBBBBBBBO...',
    '........OGGgO..OOBBBBBBO....',
    '........OGggO..OOBBBBBO.....',
    '.........OOO....OOOOOO......',
    '........OOKKO......OOKKO....',
    '.......OOKKKO.....OOKKKO....',
    '......OOFFFFO.....OOFFFFO...',
    '......OOKFFFO.....OOKFFFO...',
    '......OOffffO.....OOffffO...',
    '............................'
  ];

  const CHIBI_SIDE_MID = [
    '.........OOOOOOOOOO.........',
    '......OOOHHHHHHHHHHOOO......',
    '....OOHHHLLLLLLLLLLHHHOO....',
    '...OOHHHHHHHHHHHBBHHHHHOO...',
    '..OOHHHHHHHHHHHHBBHHHHHHHO..',
    '.OOHHHHHHHHHHHHHHBBHHHHHHHO.',
    '.OOHHHHHHHHHHHHHHBBHHHHHHHO.',
    '.OOHHHHHHHHHHHHHHHBBHHHHHHO.',
    'OOHHHHHHHHHHHHHHHHBBHHHHHHOO',
    'OOHHHHHHHHHHHHHHHHBBOOOOOHHO',
    'OOHHHHHHHHHHHHHHHHOSSSSSSOO.',
    'OOHHHHHHHHHHHHHHHOSSSSSSSSO.',
    '.OOHHHHHHHHHHHHHOSSSSSEESOO.',
    '.OOHHHHHHHHHHHHOSSSSSSEESOO.',
    '..OOHHHHHHHHHHHOsSSSSSEESOO.',
    '..OOHHhHHHHHHHHOsSSSSPPPSOO.',
    '...OOhHhHHHHHHHOSSSSSPPPSOO.',
    '....OOhHhHHHHHHHOSSSSSMMOO..',
    '.....OOOhHHHHHHHHOSSSSSOO...',
    '.......OOOOOOOOOOOWWWOOO....',
    '.........OOWWWWWWOBBBO......',
    '........OOWWWWWWWOBBBBO.....',
    '.......OOBbOWWWWWOBBBBBO....',
    '......OOBbbBOWWWwOBBBBBO....',
    '......OOBbbBOSSSSOBBBBBBO...',
    '.......OObBOSSSSSOBBBBBBO...',
    '........OOGGOSSSSOBBBBBBO...',
    '........OGGgOOOOOBBBBBBBO...',
    '........OGggO...OOBBBBBO....',
    '.........OOO.....OOOOOO.....',
    '...........OOKKKOO..........',
    '...........OOKKKOO..........',
    '..........OOFFFFFO..........',
    '..........OOKFFFFO..........',
    '..........OOfffffO..........',
    '............................'
  ];

  const CHIBI_SIDE_WALK_2 = [
    '.........OOOOOOOOOO.........',
    '......OOOHHHHHHHHHHOOO......',
    '....OOHHHLLLLLLLLLLHHHOO....',
    '...OOHHHHHHHHHHHBBHHHHHOO...',
    '..OOHHHHHHHHHHHHBBHHHHHHHO..',
    '.OOHHHHHHHHHHHHHHBBHHHHHHHO.',
    '.OOHHHHHHHHHHHHHHBBHHHHHHHO.',
    '.OOHHHHHHHHHHHHHHHBBHHHHHHO.',
    'OOHHHHHHHHHHHHHHHHBBHHHHHHOO',
    'OOHHHHHHHHHHHHHHHHBBOOOOOHHO',
    'OOHHHHHHHHHHHHHHHHOSSSSSSOO.',
    'OOHHHHHHHHHHHHHHHOSSSSSSSSO.',
    '.OOHHHHHHHHHHHHHOSSSSSEESOO.',
    '.OOHHHHHHHHHHHHOSSSSSSEESOO.',
    '..OOHHHHHHHHHHHOsSSSSSEESOO.',
    '..OOHHhHHHHHHHHOsSSSSPPPSOO.',
    '...OOhHhHHHHHHHOSSSSSPPPSOO.',
    '....OOhHhHHHHHHHOSSSSSMMOO..',
    '.....OOOhHHHHHHHHOSSSSSOO...',
    '.......OOOOOOOOOOOWWWOOO....',
    '.........OOWWWWWWOBBBO......',
    '........OOWWWWWWWOBBBBO.....',
    '.......OOBbOWWWWWOBBBBBO....',
    '......OOBbbBOWWWwOBBBBBO....',
    '......OOBbbBOWSSWOBBBBBBO...',
    '.......OObBOSSSSSOBBBBBBO...',
    '........OOGGOSSSSOBBBBBBO...',
    '........OGGgO..OOBBBBBBBO...',
    '........OGggO..OOBBBBBBO....',
    '.........OOO....OOOOOOO.....',
    '...........OOKKO..OOKKO.....',
    '..........OOKKKO.OOKKKO.....',
    '.........OOFFFFOOOFFFFO.....',
    '.........OOKFFFOOOKFFFO.....',
    '.........OOffffOOOffffO.....',
    '............................'
  ];

  function renderChibiPixelSVG(matrix) {
    const px = 4;
    let rects = '';
    for (let r = 0; r < matrix.length; r++) {
      const row = matrix[r];
      for (let c = 0; c < row.length; c++) {
        const key = row[c];
        if (key !== '.' && CHIBI_PALETTE[key]) {
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
    renderChibiPixelSVG(CHIBI_SIDE_MID)
  ];

  /* ========================================================================
     2. INSIDE-THE-HOUSE FAMILY PIXEL-ART RENDERER (48 x 60 Canvas)
     ======================================================================== */
  const FAMILY_PAL = {
    O: '#3d211a', S: '#f8ccb8', D: '#e5a68e', N: '#df9783',
    C: '#f29a98', B: '#e07679', M: '#c84b5b', H: '#753928',
    L: '#944d37', W: '#54261a', G: '#b8bac4', A: '#ee6c20',
    P: '#ff9248', R: '#c85212', Y: '#f4e7be', E: '#dfd0a1',
    V: '#7fa074', U: '#5f7d56', T: '#c66838', K: '#9c4c24',
    F: '#465875', Z: '#324057', I: '#dceef7', Q: '#ffe74c'
  };

  function fpx(ctx, x, y, color) {
    ctx.fillStyle = FAMILY_PAL[color] || color;
    ctx.fillRect(x, y, 1, 1);
  }

  function frect(ctx, x, y, w, h, color) {
    ctx.fillStyle = FAMILY_PAL[color] || color;
    ctx.fillRect(x, y, w, h);
  }

  function fOutlineRect(ctx, x, y, w, h, fill, shadow) {
    frect(ctx, x, y, w, h, 'O');
    if (w > 2 && h > 2) {
      frect(ctx, x + 1, y + 1, w - 2, h - 2, fill);
      if (shadow) {
        frect(ctx, x + 1, y + h - 2, w - 2, 1, shadow);
      }
    }
  }

  function drawBackHair(ctx, type) {
    if (type === 'girl1') {
      frect(ctx, 8, 17, 32, 23, 'O');
      frect(ctx, 7, 22, 34, 15, 'O');
      frect(ctx, 6, 26, 36, 9, 'O');
      frect(ctx, 9, 18, 30, 21, 'W');
      frect(ctx, 8, 23, 32, 13, 'H');
      frect(ctx, 7, 27, 34, 7, 'H');
      frect(ctx, 6, 33, 4, 3, 'O');
      frect(ctx, 7, 33, 3, 2, 'H');
      frect(ctx, 38, 33, 4, 3, 'O');
      frect(ctx, 38, 33, 3, 2, 'H');
    } else if (type === 'girl2') {
      frect(ctx, 8, 17, 32, 20, 'O');
      frect(ctx, 7, 22, 34, 13, 'O');
      frect(ctx, 6, 26, 36, 7, 'O');
      frect(ctx, 9, 18, 30, 18, 'W');
      frect(ctx, 8, 23, 32, 11, 'H');
      frect(ctx, 7, 27, 34, 5, 'H');
      frect(ctx, 6, 31, 3, 2, 'O');
      frect(ctx, 7, 31, 2, 1, 'H');
      frect(ctx, 39, 31, 3, 2, 'O');
      frect(ctx, 39, 31, 2, 1, 'H');
    }
  }

  function drawTorso(ctx, type) {
    frect(ctx, 19, 35, 10, 3, 'O');
    frect(ctx, 20, 35, 8, 2, 'D');

    if (type === 'girl1' || type === 'girl2') {
      const apronMain = type === 'girl1' ? 'A' : '#e67e22';
      const apronShade = type === 'girl1' ? 'R' : '#bf6516';
      const apronBtn = type === 'girl1' ? 'P' : '#f5b041';

      fOutlineRect(ctx, 10, 38, 6, 8, 'Y', 'E');
      fOutlineRect(ctx, 32, 38, 6, 8, 'Y', 'E');
      fOutlineRect(ctx, 10, 45, 5, 10, 'S', 'D');
      fOutlineRect(ctx, 33, 45, 5, 10, 'S', 'D');

      fOutlineRect(ctx, 14, 37, 20, 23, apronMain, apronShade);
      frect(ctx, 19, 37, 10, 5, 'Y');
      frect(ctx, 20, 37, 8, 1, 'D');
      frect(ctx, 19, 41, 10, 1, 'O');
      frect(ctx, 16, 37, 3, 6, apronMain);
      frect(ctx, 29, 37, 3, 6, apronMain);
      fpx(ctx, 17, 41, apronBtn);
      fpx(ctx, 30, 41, apronBtn);
      frect(ctx, 15, 38, 1, 21, apronShade);
      frect(ctx, 32, 38, 1, 21, apronShade);
      frect(ctx, 16, 47, 16, 1, apronShade);
      frect(ctx, 19, 50, 10, 7, apronBtn);
      frect(ctx, 20, 51, 8, 5, apronMain);
    } else if (type === 'boy3') {
      fOutlineRect(ctx, 10, 38, 6, 8, 'Y', 'E');
      fOutlineRect(ctx, 32, 38, 6, 8, 'Y', 'E');
      fOutlineRect(ctx, 10, 45, 5, 11, 'S', 'D');
      fOutlineRect(ctx, 33, 45, 5, 11, 'S', 'D');

      fOutlineRect(ctx, 14, 37, 20, 23, 'Y', 'E');
      frect(ctx, 20, 37, 8, 2, 'D');
      frect(ctx, 15, 38, 1, 21, 'E');
      frect(ctx, 32, 38, 1, 21, 'E');
    } else if (type === 'boy2') {
      fOutlineRect(ctx, 10, 38, 6, 9, 'V', 'U');
      fOutlineRect(ctx, 32, 38, 6, 9, 'V', 'U');
      fOutlineRect(ctx, 10, 46, 5, 10, 'S', 'D');
      fOutlineRect(ctx, 33, 46, 5, 10, 'S', 'D');

      fOutlineRect(ctx, 14, 37, 20, 23, 'V', 'U');
      frect(ctx, 21, 37, 6, 3, 'Y');
      frect(ctx, 23, 40, 2, 19, 'U');
    } else if (type === 'boy1') {
      fOutlineRect(ctx, 10, 38, 6, 10, 'T', 'K');
      fOutlineRect(ctx, 32, 38, 6, 10, 'T', 'K');
      fOutlineRect(ctx, 10, 47, 5, 9, 'S', 'D');
      fOutlineRect(ctx, 33, 47, 5, 9, 'S', 'D');

      fOutlineRect(ctx, 14, 37, 20, 23, 'T', 'K');
      frect(ctx, 20, 37, 8, 22, 'Y');
      frect(ctx, 20, 37, 8, 1, 'D');
      frect(ctx, 19, 38, 1, 21, 'K');
      frect(ctx, 28, 38, 1, 21, 'K');
    } else if (type === 'dad') {
      fOutlineRect(ctx, 9, 38, 6, 10, 'F', 'Z');
      fOutlineRect(ctx, 33, 38, 6, 10, 'F', 'Z');
      fOutlineRect(ctx, 9, 47, 5, 9, 'S', 'D');
      fOutlineRect(ctx, 34, 47, 5, 9, 'S', 'D');

      fOutlineRect(ctx, 13, 37, 22, 23, 'F', 'Z');
      frect(ctx, 20, 37, 8, 4, 'Y');
      frect(ctx, 21, 37, 6, 2, 'D');
      frect(ctx, 23, 41, 2, 18, 'Z');
    }
  }

  function drawGirlHeadAndFace(ctx, cheering, type) {
    if (type === 'girl1') {
      frect(ctx, 14, 12, 20, 2, 'O');
      frect(ctx, 12, 14, 24, 13, 'O');
      frect(ctx, 13, 27, 22, 4, 'O');
      frect(ctx, 15, 31, 18, 2, 'O');
      frect(ctx, 17, 33, 14, 2, 'O');
      frect(ctx, 19, 35, 10, 1, 'O');

      frect(ctx, 10, 24, 2, 4, 'O');
      frect(ctx, 11, 25, 1, 2, 'S');
      frect(ctx, 36, 24, 2, 4, 'O');
      frect(ctx, 36, 25, 1, 2, 'S');

      frect(ctx, 14, 13, 20, 14, 'S');
      frect(ctx, 13, 15, 22, 12, 'S');
      frect(ctx, 14, 27, 20, 4, 'S');
      frect(ctx, 16, 31, 16, 2, 'S');
      frect(ctx, 18, 33, 12, 1, 'S');
      frect(ctx, 19, 34, 10, 1, 'D');

      frect(ctx, 15, 27, 3, 1, 'C');
      fpx(ctx, 16, 27, 'B');
      frect(ctx, 30, 27, 3, 1, 'C');
      fpx(ctx, 31, 27, 'B');
    } else {
      frect(ctx, 14, 12, 20, 24, 'O');
      frect(ctx, 12, 14, 24, 20, 'O');
      frect(ctx, 11, 17, 26, 15, 'O');

      frect(ctx, 9, 24, 3, 5, 'O');
      frect(ctx, 10, 25, 2, 3, 'S');
      fpx(ctx, 10, 26, 'D');

      frect(ctx, 36, 24, 3, 5, 'O');
      frect(ctx, 36, 25, 2, 3, 'S');
      fpx(ctx, 37, 26, 'D');

      frect(ctx, 14, 13, 20, 22, 'S');
      frect(ctx, 13, 15, 22, 18, 'S');
      frect(ctx, 12, 17, 24, 14, 'S');
      frect(ctx, 15, 34, 18, 1, 'D');

      frect(ctx, 13, 27, 4, 2, 'C');
      fpx(ctx, 14, 27, 'B');
      fpx(ctx, 16, 27, 'B');

      frect(ctx, 31, 27, 4, 2, 'C');
      fpx(ctx, 31, 27, 'B');
      fpx(ctx, 33, 27, 'B');
    }

    frect(ctx, 23, 27, 2, 1, 'N');

    if (!cheering) {
      frect(ctx, 17, 23, 2, 3, 'O');
      frect(ctx, 29, 23, 2, 3, 'O');
      fpx(ctx, 21, 29, 'M');
      frect(ctx, 22, 30, 4, 1, 'M');
      fpx(ctx, 26, 29, 'M');
    } else {
      fpx(ctx, 16, 25, 'O');
      frect(ctx, 17, 24, 2, 1, 'O');
      fpx(ctx, 19, 25, 'O');
      fpx(ctx, 28, 25, 'O');
      frect(ctx, 29, 24, 2, 1, 'O');
      fpx(ctx, 31, 25, 'O');

      frect(ctx, 21, 29, 6, 1, 'O');
      frect(ctx, 21, 30, 6, 2, 'M');
      frect(ctx, 23, 31, 2, 1, 'C');
      frect(ctx, 22, 32, 4, 1, 'O');
    }
  }

  function drawMaleHeadAndFace(ctx, cheering) {
    frect(ctx, 15, 12, 18, 2, 'O');
    frect(ctx, 13, 14, 22, 15, 'O');
    frect(ctx, 14, 29, 20, 4, 'O');
    frect(ctx, 15, 33, 18, 2, 'O');
    frect(ctx, 17, 35, 14, 1, 'O');

    frect(ctx, 11, 23, 2, 5, 'O');
    frect(ctx, 12, 24, 1, 3, 'S');
    frect(ctx, 35, 23, 2, 5, 'O');
    frect(ctx, 35, 24, 1, 3, 'S');

    frect(ctx, 15, 13, 18, 2, 'S');
    frect(ctx, 14, 15, 20, 14, 'S');
    frect(ctx, 15, 29, 18, 4, 'S');
    frect(ctx, 16, 33, 16, 1, 'S');
    frect(ctx, 17, 34, 14, 1, 'D');

    frect(ctx, 15, 27, 3, 1, 'C');
    fpx(ctx, 16, 27, 'B');
    frect(ctx, 30, 27, 3, 1, 'C');
    fpx(ctx, 31, 27, 'B');
    frect(ctx, 23, 27, 2, 1, 'N');

    if (!cheering) {
      frect(ctx, 17, 23, 2, 3, 'O');
      frect(ctx, 29, 23, 2, 3, 'O');
      fpx(ctx, 21, 30, 'M');
      frect(ctx, 22, 31, 4, 1, 'M');
      fpx(ctx, 26, 30, 'M');
    } else {
      fpx(ctx, 16, 25, 'O');
      frect(ctx, 17, 24, 2, 1, 'O');
      fpx(ctx, 19, 25, 'O');
      fpx(ctx, 28, 25, 'O');
      frect(ctx, 29, 24, 2, 1, 'O');
      fpx(ctx, 31, 25, 'O');

      frect(ctx, 21, 30, 6, 1, 'O');
      frect(ctx, 21, 31, 6, 2, 'M');
      frect(ctx, 23, 32, 2, 1, 'C');
      frect(ctx, 22, 33, 4, 1, 'O');
    }
  }

  function drawPartyHat(ctx, type) {
    const hatColors = {
      boy3: '#3a86ff',
      boy2: '#ff9f1c',
      dad: '#e63946',
      boy1: '#2ec4b6',
      girl1: '#ff758f',
      girl2: '#ffbe0b'
    };
    const hc = hatColors[type] || '#ff5964';
    const yOff = (type === 'girl1' || type === 'girl2') ? 1 : 0;

    frect(ctx, 22, 1 + yOff, 4, 2, 'O');
    frect(ctx, 23, 1 + yOff, 2, 2, 'Q');
    frect(ctx, 21, 3 + yOff, 6, 2, 'O');
    frect(ctx, 22, 3 + yOff, 4, 2, hc);
    frect(ctx, 20, 5 + yOff, 8, 2, 'O');
    frect(ctx, 21, 5 + yOff, 6, 2, hc);
    fpx(ctx, 23, 5 + yOff, 'Q');
    frect(ctx, 19, 7 + yOff, 10, 2, 'O');
    frect(ctx, 20, 7 + yOff, 8, 2, hc);
    fpx(ctx, 22, 7 + yOff, '#ffffff');
    fpx(ctx, 25, 7 + yOff, '#ffffff');
  }

  function drawCroppedTexturedHair(ctx, flip, hasSilverTemples) {
    const mx = (x, w) => (flip ? 48 - x - w : x);

    frect(ctx, mx(20, 9), 8, 9, 1, 'O');
    frect(ctx, mx(17, 15), 9, 15, 1, 'O');
    frect(ctx, mx(20, 9), 9, 9, 1, 'H');

    frect(ctx, mx(15, 19), 10, 19, 1, 'O');
    frect(ctx, mx(17, 15), 10, 15, 1, 'H');
    frect(ctx, mx(19, 11), 10, 11, 1, 'L');

    frect(ctx, mx(14, 21), 11, 21, 1, 'O');
    frect(ctx, mx(15, 19), 11, 19, 1, 'H');
    frect(ctx, mx(16, 16), 11, 16, 1, 'L');

    frect(ctx, mx(13, 23), 12, 23, 2, 'O');
    frect(ctx, mx(14, 21), 12, 21, 2, 'H');
    frect(ctx, mx(15, 5), 12, 5, 1, 'L');
    frect(ctx, mx(26, 6), 12, 6, 1, 'L');

    frect(ctx, mx(12, 24), 14, 24, 2, 'O');
    frect(ctx, mx(13, 22), 14, 22, 2, 'H');

    frect(ctx, mx(12, 24), 16, 24, 1, 'O');
    frect(ctx, mx(13, 2), 16, 2, 1, 'H');
    frect(ctx, mx(18, 3), 16, 3, 1, 'H');
    frect(ctx, mx(23, 3), 16, 3, 1, 'H');
    frect(ctx, mx(28, 3), 16, 3, 1, 'H');
    frect(ctx, mx(31, 4), 16, 4, 1, 'H');

    frect(ctx, mx(12, 3), 17, 3, 1, 'O');
    frect(ctx, mx(13, 1), 17, 1, 1, 'H');
    frect(ctx, mx(15, 3), 17, 3, 1, 'D');
    frect(ctx, mx(18, 3), 17, 3, 1, 'O');
    frect(ctx, mx(19, 2), 17, 2, 1, 'H');
    frect(ctx, mx(21, 2), 17, 2, 1, 'D');
    frect(ctx, mx(23, 3), 17, 3, 1, 'O');
    frect(ctx, mx(23, 3), 17, 3, 1, 'H');
    frect(ctx, mx(26, 2), 17, 2, 1, 'D');
    frect(ctx, mx(28, 3), 17, 3, 1, 'O');
    frect(ctx, mx(28, 2), 17, 2, 1, 'H');
    frect(ctx, mx(31, 5), 17, 5, 1, 'O');
    frect(ctx, mx(31, 4), 17, 4, 1, 'H');

    frect(ctx, mx(12, 3), 18, 3, 1, 'O');
    frect(ctx, mx(13, 1), 18, 1, 1, 'H');
    frect(ctx, mx(19, 2), 18, 2, 1, 'O');
    frect(ctx, mx(23, 3), 18, 3, 1, 'O');
    frect(ctx, mx(23, 2), 18, 2, 1, 'H');
    frect(ctx, mx(28, 2), 18, 2, 1, 'O');
    frect(ctx, mx(31, 2), 18, 2, 1, 'D');
    frect(ctx, mx(33, 3), 18, 3, 1, 'O');
    frect(ctx, mx(34, 1), 18, 1, 1, 'H');

    frect(ctx, mx(12, 3), 19, 3, 3, 'O');
    frect(ctx, mx(13, 1), 19, 1, 3, 'W');
    frect(ctx, mx(23, 2), 19, 2, 1, 'O');
    frect(ctx, mx(33, 3), 19, 3, 3, 'O');
    frect(ctx, mx(34, 1), 19, 1, 3, 'W');

    frect(ctx, mx(13, 2), 22, 2, 1, 'O');
    frect(ctx, mx(33, 2), 22, 2, 1, 'O');

    if (hasSilverTemples) {
      frect(ctx, mx(13, 1), 19, 1, 2, 'G');
      frect(ctx, mx(34, 1), 19, 1, 2, 'G');
    }
  }

  function drawFrontHairAndAccessories(ctx, type) {
    if (type === 'girl1' || type === 'girl2') {
      frect(ctx, 13, 10, 22, 9, 'O');
      frect(ctx, 11, 12, 26, 8, 'O');
      frect(ctx, 10, 15, 28, 6, 'O');

      frect(ctx, 14, 11, 20, 7, 'H');
      frect(ctx, 12, 13, 24, 6, 'H');
      frect(ctx, 11, 16, 26, 4, 'H');

      frect(ctx, 16, 12, 7, 2, 'L');
      frect(ctx, 26, 13, 6, 2, 'L');

      frect(ctx, 12, 14, 24, 2, 'A');
      frect(ctx, 16, 14, 10, 1, 'P');

      if (type === 'girl1') {
        frect(ctx, 11, 20, 3, 4, 'H');
        frect(ctx, 34, 20, 3, 4, 'H');
      } else {
        frect(ctx, 11, 20, 4, 4, 'H');
        frect(ctx, 33, 20, 4, 4, 'H');
      }

      frect(ctx, 15, 20, 6, 1, 'H');
      frect(ctx, 26, 20, 6, 1, 'H');
      frect(ctx, 14, 21, 20, 1, 'D');
    } else {
      const flip = type === 'boy2';
      const hasSilver = type === 'dad';
      drawCroppedTexturedHair(ctx, flip, hasSilver);

      if (type === 'boy1') {
        frect(ctx, 15, 22, 6, 1, '#6e5549');
        fpx(ctx, 15, 23, '#6e5549');
        fpx(ctx, 15, 24, '#6e5549');
        fpx(ctx, 16, 23, 'I');
        frect(ctx, 21, 23, 6, 1, '#6e5549');
        frect(ctx, 27, 22, 6, 1, '#6e5549');
        fpx(ctx, 32, 23, '#6e5549');
        fpx(ctx, 32, 24, '#6e5549');
        fpx(ctx, 31, 23, 'I');
      }
    }

    drawPartyHat(ctx, type);
  }

  function renderFamilyCharacter(canvas, type, cheering = false) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackHair(ctx, type);
    drawTorso(ctx, type);
    if (type === 'girl1' || type === 'girl2') {
      drawGirlHeadAndFace(ctx, cheering, type);
    } else {
      drawMaleHeadAndFace(ctx, cheering);
    }
    drawFrontHairAndAccessories(ctx, type);
  }

  /* ========================================================================
     3. OUTSIDE SCENERY TREES, PRESET ILLUSTRATIONS & GREEN HOUSE SVG
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
      </svg>`
  };

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
    if (typeof picValue === 'string' && picValue.startsWith('preset:')) {
      return PRESET_ILLUSTRATIONS[picValue] || PRESET_ILLUSTRATIONS['preset:family'];
    }
    return `<img src="${picValue}" alt="${altText}" />`;
  }

  return {
    chibiFrontSVG,
    chibiWalkFramesSVG,
    renderFamilyCharacter,
    TREES,
    GREEN_HOUSE_EXTERIOR_SVG,
    renderPictureHTML
  };
})();