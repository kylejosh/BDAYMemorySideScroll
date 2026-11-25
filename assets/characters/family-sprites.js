window.App = window.App || {};
window.App.Sprites = window.App.Sprites || {};

(() => {
  const FAMILY_PAL = {
    O: "#3d211a",
    S: "#f8ccb8",
    D: "#e5a68e",
    N: "#df9783",
    C: "#f29a98",
    B: "#e07679",
    M: "#c84b5b",
    H: "#753928",
    L: "#944d37",
    W: "#54261a",
    G: "#b8bac4",
    A: "#ee6c20",
    P: "#ff9248",
    R: "#c85212",
    Y: "#f4e7be",
    E: "#dfd0a1",
    V: "#7fa074",
    U: "#5f7d56",
    T: "#c66838",
    K: "#9c4c24",
    F: "#465875",
    Z: "#324057",
    I: "#dceef7",
    Q: "#ffe74c",
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
    frect(ctx, x, y, w, h, "O");
    if (w > 2 && h > 2) {
      frect(ctx, x + 1, y + 1, w - 2, h - 2, fill);
      if (shadow) {
        frect(ctx, x + 1, y + h - 2, w - 2, 1, shadow);
      }
    }
  }

  function drawBackHair(ctx, type) {
    if (type === "girl1") {
      frect(ctx, 8, 17, 32, 23, "O");
      frect(ctx, 7, 22, 34, 15, "O");
      frect(ctx, 6, 26, 36, 9, "O");
      frect(ctx, 9, 18, 30, 21, "W");
      frect(ctx, 8, 23, 32, 13, "H");
      frect(ctx, 7, 27, 34, 7, "H");
      frect(ctx, 6, 33, 4, 3, "O");
      frect(ctx, 7, 33, 3, 2, "H");
      frect(ctx, 38, 33, 4, 3, "O");
      frect(ctx, 38, 33, 3, 2, "H");
    } else if (type === "girl2") {
      frect(ctx, 8, 17, 32, 20, "O");
      frect(ctx, 7, 22, 34, 13, "O");
      frect(ctx, 6, 26, 36, 7, "O");
      frect(ctx, 9, 18, 30, 18, "W");
      frect(ctx, 8, 23, 32, 11, "H");
      frect(ctx, 7, 27, 34, 5, "H");
      frect(ctx, 6, 31, 3, 2, "O");
      frect(ctx, 7, 31, 2, 1, "H");
      frect(ctx, 39, 31, 3, 2, "O");
      frect(ctx, 39, 31, 2, 1, "H");
    }
  }

  function drawTorso(ctx, type) {
    frect(ctx, 19, 35, 10, 3, "O");
    frect(ctx, 20, 35, 8, 2, "D");

    if (type === "girl1" || type === "girl2") {
      const apronMain = type === "girl1" ? "A" : "#e67e22";
      const apronShade = type === "girl1" ? "R" : "#bf6516";
      const apronBtn = type === "girl1" ? "P" : "#f5b041";

      fOutlineRect(ctx, 10, 38, 6, 8, "Y", "E");
      fOutlineRect(ctx, 32, 38, 6, 8, "Y", "E");
      fOutlineRect(ctx, 10, 45, 5, 10, "S", "D");
      fOutlineRect(ctx, 33, 45, 5, 10, "S", "D");

      fOutlineRect(ctx, 14, 37, 20, 23, apronMain, apronShade);
      frect(ctx, 19, 37, 10, 5, "Y");
      frect(ctx, 20, 37, 8, 1, "D");
      frect(ctx, 19, 41, 10, 1, "O");
      frect(ctx, 16, 37, 3, 6, apronMain);
      frect(ctx, 29, 37, 3, 6, apronMain);
      fpx(ctx, 17, 41, apronBtn);
      fpx(ctx, 30, 41, apronBtn);
      frect(ctx, 15, 38, 1, 21, apronShade);
      frect(ctx, 32, 38, 1, 21, apronShade);
      frect(ctx, 16, 47, 16, 1, apronShade);
      frect(ctx, 19, 50, 10, 7, apronBtn);
      frect(ctx, 20, 51, 8, 5, apronMain);
    } else if (type === "boy3") {
      fOutlineRect(ctx, 10, 38, 6, 8, "Y", "E");
      fOutlineRect(ctx, 32, 38, 6, 8, "Y", "E");
      fOutlineRect(ctx, 10, 45, 5, 11, "S", "D");
      fOutlineRect(ctx, 33, 45, 5, 11, "S", "D");

      fOutlineRect(ctx, 14, 37, 20, 23, "Y", "E");
      frect(ctx, 20, 37, 8, 2, "D");
      frect(ctx, 15, 38, 1, 21, "E");
      frect(ctx, 32, 38, 1, 21, "E");
    } else if (type === "boy2") {
      fOutlineRect(ctx, 10, 38, 6, 9, "V", "U");
      fOutlineRect(ctx, 32, 38, 6, 9, "V", "U");
      fOutlineRect(ctx, 10, 46, 5, 10, "S", "D");
      fOutlineRect(ctx, 33, 46, 5, 10, "S", "D");

      fOutlineRect(ctx, 14, 37, 20, 23, "V", "U");
      frect(ctx, 21, 37, 6, 3, "Y");
      frect(ctx, 23, 40, 2, 19, "U");
    } else if (type === "boy1") {
      fOutlineRect(ctx, 10, 38, 6, 10, "T", "K");
      fOutlineRect(ctx, 32, 38, 6, 10, "T", "K");
      fOutlineRect(ctx, 10, 47, 5, 9, "S", "D");
      fOutlineRect(ctx, 33, 47, 5, 9, "S", "D");

      fOutlineRect(ctx, 14, 37, 20, 23, "T", "K");
      frect(ctx, 20, 37, 8, 22, "Y");
      frect(ctx, 20, 37, 8, 1, "D");
      frect(ctx, 19, 38, 1, 21, "K");
      frect(ctx, 28, 38, 1, 21, "K");
    } else if (type === "dad") {
      fOutlineRect(ctx, 9, 38, 6, 10, "F", "Z");
      fOutlineRect(ctx, 33, 38, 6, 10, "F", "Z");
      fOutlineRect(ctx, 9, 47, 5, 9, "S", "D");
      fOutlineRect(ctx, 34, 47, 5, 9, "S", "D");

      fOutlineRect(ctx, 13, 37, 22, 23, "F", "Z");
      frect(ctx, 20, 37, 8, 4, "Y");
      frect(ctx, 21, 37, 6, 2, "D");
      frect(ctx, 23, 41, 2, 18, "Z");
    }
  }

  function drawGirlHeadAndFace(ctx, cheering, type) {
    if (type === "girl1") {
      frect(ctx, 14, 12, 20, 2, "O");
      frect(ctx, 12, 14, 24, 13, "O");
      frect(ctx, 13, 27, 22, 4, "O");
      frect(ctx, 15, 31, 18, 2, "O");
      frect(ctx, 17, 33, 14, 2, "O");
      frect(ctx, 19, 35, 10, 1, "O");

      frect(ctx, 10, 24, 2, 4, "O");
      frect(ctx, 11, 25, 1, 2, "S");
      frect(ctx, 36, 24, 2, 4, "O");
      frect(ctx, 36, 25, 1, 2, "S");

      frect(ctx, 14, 13, 20, 14, "S");
      frect(ctx, 13, 15, 22, 12, "S");
      frect(ctx, 14, 27, 20, 4, "S");
      frect(ctx, 16, 31, 16, 2, "S");
      frect(ctx, 18, 33, 12, 1, "S");
      frect(ctx, 19, 34, 10, 1, "D");

      frect(ctx, 15, 27, 3, 1, "C");
      fpx(ctx, 16, 27, "B");
      frect(ctx, 30, 27, 3, 1, "C");
      fpx(ctx, 31, 27, "B");
    } else {
      frect(ctx, 14, 12, 20, 24, "O");
      frect(ctx, 12, 14, 24, 20, "O");
      frect(ctx, 11, 17, 26, 15, "O");

      frect(ctx, 9, 24, 3, 5, "O");
      frect(ctx, 10, 25, 2, 3, "S");
      fpx(ctx, 10, 26, "D");

      frect(ctx, 36, 24, 3, 5, "O");
      frect(ctx, 36, 25, 2, 3, "S");
      fpx(ctx, 37, 26, "D");

      frect(ctx, 14, 13, 20, 22, "S");
      frect(ctx, 13, 15, 22, 18, "S");
      frect(ctx, 12, 17, 24, 14, "S");
      frect(ctx, 15, 34, 18, 1, "D");

      frect(ctx, 13, 27, 4, 2, "C");
      fpx(ctx, 14, 27, "B");
      fpx(ctx, 16, 27, "B");

      frect(ctx, 31, 27, 4, 2, "C");
      fpx(ctx, 31, 27, "B");
      fpx(ctx, 33, 27, "B");
    }

    frect(ctx, 23, 27, 2, 1, "N");

    if (!cheering) {
      frect(ctx, 17, 23, 2, 3, "O");
      frect(ctx, 29, 23, 2, 3, "O");
      fpx(ctx, 21, 29, "M");
      frect(ctx, 22, 30, 4, 1, "M");
      fpx(ctx, 26, 29, "M");
    } else {
      fpx(ctx, 16, 25, "O");
      frect(ctx, 17, 24, 2, 1, "O");
      fpx(ctx, 19, 25, "O");
      fpx(ctx, 28, 25, "O");
      frect(ctx, 29, 24, 2, 1, "O");
      fpx(ctx, 31, 25, "O");

      frect(ctx, 21, 29, 6, 1, "O");
      frect(ctx, 21, 30, 6, 2, "M");
      frect(ctx, 23, 31, 2, 1, "C");
      frect(ctx, 22, 32, 4, 1, "O");
    }
  }

  function drawMaleHeadAndFace(ctx, cheering) {
    frect(ctx, 15, 12, 18, 2, "O");
    frect(ctx, 13, 14, 22, 15, "O");
    frect(ctx, 14, 29, 20, 4, "O");
    frect(ctx, 15, 33, 18, 2, "O");
    frect(ctx, 17, 35, 14, 1, "O");

    frect(ctx, 11, 23, 2, 5, "O");
    frect(ctx, 12, 24, 1, 3, "S");
    frect(ctx, 35, 23, 2, 5, "O");
    frect(ctx, 35, 24, 1, 3, "S");

    frect(ctx, 15, 13, 18, 2, "S");
    frect(ctx, 14, 15, 20, 14, "S");
    frect(ctx, 15, 29, 18, 4, "S");
    frect(ctx, 16, 33, 16, 1, "S");
    frect(ctx, 17, 34, 14, 1, "D");

    frect(ctx, 15, 27, 3, 1, "C");
    fpx(ctx, 16, 27, "B");
    frect(ctx, 30, 27, 3, 1, "C");
    fpx(ctx, 31, 27, "B");
    frect(ctx, 23, 27, 2, 1, "N");

    if (!cheering) {
      frect(ctx, 17, 23, 2, 3, "O");
      frect(ctx, 29, 23, 2, 3, "O");
      fpx(ctx, 21, 30, "M");
      frect(ctx, 22, 31, 4, 1, "M");
      fpx(ctx, 26, 30, "M");
    } else {
      fpx(ctx, 16, 25, "O");
      frect(ctx, 17, 24, 2, 1, "O");
      fpx(ctx, 19, 25, "O");
      fpx(ctx, 28, 25, "O");
      frect(ctx, 29, 24, 2, 1, "O");
      fpx(ctx, 31, 25, "O");

      frect(ctx, 21, 30, 6, 1, "O");
      frect(ctx, 21, 31, 6, 2, "M");
      frect(ctx, 23, 32, 2, 1, "C");
      frect(ctx, 22, 33, 4, 1, "O");
    }
  }

  function drawPartyHat(ctx, type) {
    const hatColors = {
      boy3: "#3a86ff",
      boy2: "#ff9f1c",
      dad: "#e63946",
      boy1: "#2ec4b6",
      girl1: "#ff758f",
      girl2: "#ffbe0b",
    };
    const hc = hatColors[type] || "#ff5964";
    const yOff = type === "girl1" || type === "girl2" ? 1 : 0;

    frect(ctx, 22, 1 + yOff, 4, 2, "O");
    frect(ctx, 23, 1 + yOff, 2, 2, "Q");
    frect(ctx, 21, 3 + yOff, 6, 2, "O");
    frect(ctx, 22, 3 + yOff, 4, 2, hc);
    frect(ctx, 20, 5 + yOff, 8, 2, "O");
    frect(ctx, 21, 5 + yOff, 6, 2, hc);
    fpx(ctx, 23, 5 + yOff, "Q");
    frect(ctx, 19, 7 + yOff, 10, 2, "O");
    frect(ctx, 20, 7 + yOff, 8, 2, hc);
    fpx(ctx, 22, 7 + yOff, "#ffffff");
    fpx(ctx, 25, 7 + yOff, "#ffffff");
  }

  function drawCroppedTexturedHair(ctx, flip, hasSilverTemples) {
    const mx = (x, w) => (flip ? 48 - x - w : x);

    frect(ctx, mx(20, 9), 8, 9, 1, "O");
    frect(ctx, mx(17, 15), 9, 15, 1, "O");
    frect(ctx, mx(20, 9), 9, 9, 1, "H");

    frect(ctx, mx(15, 19), 10, 19, 1, "O");
    frect(ctx, mx(17, 15), 10, 15, 1, "H");
    frect(ctx, mx(19, 11), 10, 11, 1, "L");

    frect(ctx, mx(14, 21), 11, 21, 1, "O");
    frect(ctx, mx(15, 19), 11, 19, 1, "H");
    frect(ctx, mx(16, 16), 11, 16, 1, "L");

    frect(ctx, mx(13, 23), 12, 23, 2, "O");
    frect(ctx, mx(14, 21), 12, 21, 2, "H");
    frect(ctx, mx(15, 5), 12, 5, 1, "L");
    frect(ctx, mx(26, 6), 12, 6, 1, "L");

    frect(ctx, mx(12, 24), 14, 24, 2, "O");
    frect(ctx, mx(13, 22), 14, 22, 2, "H");

    frect(ctx, mx(12, 24), 16, 24, 1, "O");
    frect(ctx, mx(13, 2), 16, 2, 1, "H");
    frect(ctx, mx(18, 3), 16, 3, 1, "H");
    frect(ctx, mx(23, 3), 16, 3, 1, "H");
    frect(ctx, mx(28, 3), 16, 3, 1, "H");
    frect(ctx, mx(31, 4), 16, 4, 1, "H");

    frect(ctx, mx(12, 3), 17, 3, 1, "O");
    frect(ctx, mx(13, 1), 17, 1, 1, "H");
    frect(ctx, mx(15, 3), 17, 3, 1, "D");
    frect(ctx, mx(18, 3), 17, 3, 1, "O");
    frect(ctx, mx(19, 2), 17, 2, 1, "H");
    frect(ctx, mx(21, 2), 17, 2, 1, "D");
    frect(ctx, mx(23, 3), 17, 3, 1, "O");
    frect(ctx, mx(23, 3), 17, 3, 1, "H");
    frect(ctx, mx(26, 2), 17, 2, 1, "D");
    frect(ctx, mx(28, 3), 17, 3, 1, "O");
    frect(ctx, mx(28, 2), 17, 2, 1, "H");
    frect(ctx, mx(31, 5), 17, 5, 1, "O");
    frect(ctx, mx(31, 4), 17, 4, 1, "H");

    frect(ctx, mx(12, 3), 18, 3, 1, "O");
    frect(ctx, mx(13, 1), 18, 1, 1, "H");
    frect(ctx, mx(19, 2), 18, 2, 1, "O");
    frect(ctx, mx(23, 3), 18, 3, 1, "O");
    frect(ctx, mx(23, 2), 18, 2, 1, "H");
    frect(ctx, mx(28, 2), 18, 2, 1, "O");
    frect(ctx, mx(31, 2), 18, 2, 1, "D");
    frect(ctx, mx(33, 3), 18, 3, 1, "O");
    frect(ctx, mx(34, 1), 18, 1, 1, "H");

    frect(ctx, mx(12, 3), 19, 3, 3, "O");
    frect(ctx, mx(13, 1), 19, 1, 3, "W");
    frect(ctx, mx(23, 2), 19, 2, 1, "O");
    frect(ctx, mx(33, 3), 19, 3, 3, "O");
    frect(ctx, mx(34, 1), 19, 1, 3, "W");

    frect(ctx, mx(13, 2), 22, 2, 1, "O");
    frect(ctx, mx(33, 2), 22, 2, 1, "O");

    if (hasSilverTemples) {
      frect(ctx, mx(13, 1), 19, 1, 2, "G");
      frect(ctx, mx(34, 1), 19, 1, 2, "G");
    }
  }

  function drawFrontHairAndAccessories(ctx, type) {
    if (type === "girl1" || type === "girl2") {
      frect(ctx, 13, 10, 22, 9, "O");
      frect(ctx, 11, 12, 26, 8, "O");
      frect(ctx, 10, 15, 28, 6, "O");

      frect(ctx, 14, 11, 20, 7, "H");
      frect(ctx, 12, 13, 24, 6, "H");
      frect(ctx, 11, 16, 26, 4, "H");

      frect(ctx, 16, 12, 7, 2, "L");
      frect(ctx, 26, 13, 6, 2, "L");

      frect(ctx, 12, 14, 24, 2, "A");
      frect(ctx, 16, 14, 10, 1, "P");

      if (type === "girl1") {
        frect(ctx, 11, 20, 3, 4, "H");
        frect(ctx, 34, 20, 3, 4, "H");
      } else {
        frect(ctx, 11, 20, 4, 4, "H");
        frect(ctx, 33, 20, 4, 4, "H");
      }

      frect(ctx, 15, 20, 6, 1, "H");
      frect(ctx, 26, 20, 6, 1, "H");
      frect(ctx, 14, 21, 20, 1, "D");
    } else {
      const flip = type === "boy2";
      const hasSilver = type === "dad";
      drawCroppedTexturedHair(ctx, flip, hasSilver);

      if (type === "boy1") {
        frect(ctx, 15, 22, 6, 1, "#6e5549");
        fpx(ctx, 15, 23, "#6e5549");
        fpx(ctx, 15, 24, "#6e5549");
        fpx(ctx, 16, 23, "I");
        frect(ctx, 21, 23, 6, 1, "#6e5549");
        frect(ctx, 27, 22, 6, 1, "#6e5549");
        fpx(ctx, 32, 23, "#6e5549");
        fpx(ctx, 32, 24, "#6e5549");
        fpx(ctx, 31, 23, "I");
      }
    }

    drawPartyHat(ctx, type);
  }

  function renderFamilyCharacter(canvas, type, cheering = false) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackHair(ctx, type);
    drawTorso(ctx, type);
    if (type === "girl1" || type === "girl2") {
      drawGirlHeadAndFace(ctx, cheering, type);
    } else {
      drawMaleHeadAndFace(ctx, cheering);
    }
    drawFrontHairAndAccessories(ctx, type);
  }

  Object.assign(window.App.Sprites, {
    renderFamilyCharacter,
  });
})();
