window.App = window.App || {};

window.App.OutsideScene = (() => {
  const { PICTURES_DATA, Sprites, Atmosphere, SoundManager } = window.App;

  const CHAPTER_SPACING = 1200;
  const FIRST_TRIGGER_X = 620;
  const houseWorldX =
    FIRST_TRIGGER_X + PICTURES_DATA.length * CHAPTER_SPACING - 600;
  const houseStopX = houseWorldX + 290;
  const WORLD_WIDTH = houseWorldX + 830;

  let stageFrame;
  let outsideEl;
  let worldTrack;
  let cloudLayerEl;
  let mountainsLayerEl;
  let hillsLayerEl;
  let momSprite;
  let chibiMount;
  let enterHouseBtn;
  let slots = [];

  let momWorldX = 160;
  let cameraX = 0;
  let targetWorldX = null;
  let activeSlotIndex = -1;
  let walkCycleTimer = 0;
  let currentWalkIdx = 0;
  let isCurrentlyFrontPose = true;
  const chimedChapters = new Set();

  const atmosphereMilestones = [
    ...PICTURES_DATA.map(
      (_, idx) => FIRST_TRIGGER_X + idx * CHAPTER_SPACING + 160,
    ),
    houseStopX,
  ];

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function getResponsiveMetrics() {
    const viewportW = stageFrame.clientWidth || window.innerWidth;
    const isMobile = viewportW < 640;
    const momHalfW = isMobile ? 48 : 56;
    const momScreenAnchor = isMobile
      ? Math.max(54, Math.round(viewportW * 0.16))
      : 250;
    const frameWidth = isMobile
      ? Math.min(214, viewportW - momScreenAnchor - 24)
      : 258;
    const frameOffsetFromTrigger = isMobile
      ? Math.max(92, viewportW - momScreenAnchor - frameWidth - 14)
      : 320;
    const dissolveLeftThreshold = isMobile ? 22 : 58;

    return {
      viewportW,
      momHalfW,
      momScreenAnchor,
      frameOffsetFromTrigger,
      dissolveLeftThreshold,
    };
  }

  function buildWorldProps() {
    worldTrack.style.width = `${WORLD_WIDTH}px`;

    const houseWrapper = document.getElementById("house-wrapper");
    const houseDriveway = document.getElementById("house-driveway");
    houseWrapper.style.left = `${houseWorldX}px`;
    houseWrapper.innerHTML = Sprites.GREEN_HOUSE_EXTERIOR_SVG;
    houseDriveway.style.left = `${houseWorldX + 8}px`;

    // Clouds
    for (let cx = 95; cx < WORLD_WIDTH * 0.45; cx += 380) {
      const cloud = document.createElement("div");
      cloud.className = "cloud-2d";
      cloud.style.top = `${38 + (cx % 44)}px`;
      cloud.style.left = `${cx}px`;
      cloud.style.transform = `scale(${0.88 + ((cx / 190) % 3) * 0.12})`;
      cloudLayerEl.appendChild(cloud);
    }

    // Diverse 2D Trees, Fences & Streetlamps
    const sceneryLayer = document.getElementById("scenery-prop-layer");
    const treeTypes = ["oak", "sakura", "pine", "citrus", "willow"];
    let treeIdx = 0;
    for (let tx = 40; tx < houseWorldX - 150; tx += 235) {
      const type = treeTypes[treeIdx % treeTypes.length];
      const scale = 0.9 + (treeIdx % 3) * 0.07;
      const el = document.createElement("div");
      el.className = "scenic-tree";
      el.style.left = `${tx}px`;
      el.style.zIndex = treeIdx % 2 === 0 ? 2 : 3;
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = "bottom center";
      el.innerHTML = Sprites.TREES[type];
      sceneryLayer.appendChild(el);
      treeIdx++;
    }

    for (let lx = 440; lx < houseWorldX - 240; lx += 1500) {
      const lamp = document.createElement("div");
      lamp.className = "lamp-2d";
      lamp.style.left = `${lx}px`;
      lamp.innerHTML = `<div class="lamp-2d-halo"></div><div class="lamp-2d-bulb"></div><div class="lamp-2d-pole"></div>`;
      sceneryLayer.appendChild(lamp);
    }

    const homeLamp = document.createElement("div");
    homeLamp.className = "lamp-2d";
    homeLamp.style.left = `${houseWorldX + 728}px`;
    homeLamp.style.height = "298px";
    homeLamp.innerHTML = `<div class="lamp-2d-halo" style="width:165px;height:165px;top:-58px;"></div><div class="lamp-2d-bulb" style="width:38px;height:38px;"></div><div class="lamp-2d-pole"></div>`;
    sceneryLayer.appendChild(homeLamp);

    for (let fx = 185; fx < houseWorldX - 220; fx += 1400) {
      const fence = document.createElement("div");
      fence.className = "wooden-fence";
      fence.style.left = `${fx}px`;
      fence.innerHTML = `
        <svg width="210" height="34" viewBox="0 0 210 34">
          <rect x="0" y="10" width="210" height="5" fill="#bc6c25" stroke="#18141c" stroke-width="2"/>
          <rect x="0" y="21" width="210" height="5" fill="#bc6c25" stroke="#18141c" stroke-width="2"/>
          <rect x="12" y="2" width="10" height="32" rx="2" fill="#dda15e" stroke="#18141c" stroke-width="2.2"/>
          <rect x="64" y="2" width="10" height="32" rx="2" fill="#dda15e" stroke="#18141c" stroke-width="2.2"/>
          <rect x="116" y="2" width="10" height="32" rx="2" fill="#dda15e" stroke="#18141c" stroke-width="2.2"/>
          <rect x="168" y="2" width="10" height="32" rx="2" fill="#dda15e" stroke="#18141c" stroke-width="2.2"/>
        </svg>`;
      sceneryLayer.appendChild(fence);
    }
  }

  function buildChapters(onOpenMemory) {
    const chaptersMount = document.getElementById("chapters-mount");
    PICTURES_DATA.forEach((item, idx) => {
      const triggerX = FIRST_TRIGGER_X + idx * CHAPTER_SPACING;
      const chapterNum = String(idx + 1).padStart(2, "0");

      const slotEl = document.createElement("div");
      slotEl.className = "reminisce-slot";
      slotEl.dataset.index = idx;
      slotEl.dataset.triggerX = triggerX;

      slotEl.innerHTML = `
        <div class="floating-memory-frame">
          <div class="reminisce-aura"></div>
          <div class="memory-ribbon-tag">✨ CHAPTER ${chapterNum}</div>
          <div class="photo-viewport" id="photo-slot-${idx}">
            ${Sprites.renderPictureHTML(item.picture, item.title)}
          </div>
          <div class="greeting-area">
            <div class="memory-title">${item.title}</div>
            <p class="birthday-greeting-text">"${item.message}"</p>
          </div>
        </div>
      `;

      slotEl
        .querySelector(".floating-memory-frame")
        .addEventListener("click", (e) => {
          e.stopPropagation();
          targetWorldX = null;
          onOpenMemory(idx);
        });

      chaptersMount.appendChild(slotEl);
    });

    slots = Array.from(document.querySelectorAll(".reminisce-slot"));
  }

  function syncChapterPositions() {
    const m = getResponsiveMetrics();
    slots.forEach((slot) => {
      const triggerX = Number(slot.dataset.triggerX);
      const frameX = triggerX + m.frameOffsetFromTrigger;
      slot.dataset.frameX = frameX;
      slot.style.left = `${frameX}px`;
    });
  }

  function render() {
    const m = getResponsiveMetrics();
    const maxCam = Math.max(0, WORLD_WIDTH - m.viewportW);
    const momCenterWorld = momWorldX + m.momHalfW;

    cameraX = clamp(momCenterWorld - m.momScreenAnchor, 0, maxCam);

    const u = Atmosphere.computeProgress(momCenterWorld, atmosphereMilestones);
    Atmosphere.apply(outsideEl, u, m.viewportW);

    let currentOpenIdx = -1;

    slots.forEach((slot, idx) => {
      const triggerX = Number(slot.dataset.triggerX);
      const frameWorldX = Number(slot.dataset.frameX);
      const frameScreenX = frameWorldX - cameraX;

      const hasTriggered = momCenterWorld >= triggerX;
      const isBeforeLeftBorder = frameScreenX > m.dissolveLeftThreshold;

      if (hasTriggered && isBeforeLeftBorder) {
        if (!chimedChapters.has(idx)) {
          chimedChapters.add(idx);
          SoundManager.playMemoryChime();
        }
        slot.classList.add("is-open");
        slot.classList.remove("is-dissolving");
        currentOpenIdx = idx;
      } else if (hasTriggered && !isBeforeLeftBorder && frameScreenX > -220) {
        slot.classList.remove("is-open");
        slot.classList.add("is-dissolving");
      } else {
        slot.classList.remove("is-open", "is-dissolving");
      }
    });

    activeSlotIndex = currentOpenIdx;

    const hasReachedHouse = momWorldX >= houseStopX - 70;
    enterHouseBtn.classList.toggle("visible", hasReachedHouse);

    worldTrack.style.transform = `translate3d(${-cameraX}px, 0, 0)`;
    cloudLayerEl.style.transform = `translate3d(${-cameraX * 0.14}px, 0, 0)`;
    mountainsLayerEl.style.transform = `translate3d(${-cameraX * 0.22}px, 0, 0)`;
    hillsLayerEl.style.transform = `translate3d(${-cameraX * 0.38}px, 0, 0)`;
  }

  function update(inputState, isBlocked) {
    let dx = 0;
    const walkSpeed = 4.5;

    if (!isBlocked) {
      const goLeft = inputState.keyLeft || inputState.btnLeft;
      const goRight = inputState.keyRight || inputState.btnRight;

      if (goLeft && !goRight) dx = -walkSpeed;
      else if (goRight && !goLeft) dx = walkSpeed;
      else if (targetWorldX !== null) {
        const diff = targetWorldX - momWorldX;
        if (Math.abs(diff) > 4) {
          dx = Math.sign(diff) * walkSpeed;
        } else {
          momWorldX = targetWorldX;
          targetWorldX = null;
        }
      }
    }

    if (dx !== 0) {
      momWorldX = clamp(momWorldX + dx, 100, houseStopX);
      momSprite.style.left = `${momWorldX}px`;
      momSprite.classList.add("is-walking");
      momSprite.classList.toggle("facing-left", dx < 0);
      SoundManager.playStep();

      if (isCurrentlyFrontPose) {
        isCurrentlyFrontPose = false;
        chibiMount.innerHTML = Sprites.chibiWalkFramesSVG[currentWalkIdx];
      }
      walkCycleTimer += Math.abs(dx);
      if (walkCycleTimer >= 26) {
        walkCycleTimer = 0;
        currentWalkIdx =
          (currentWalkIdx + 1) % Sprites.chibiWalkFramesSVG.length;
        chibiMount.innerHTML = Sprites.chibiWalkFramesSVG[currentWalkIdx];
      }
    } else {
      momSprite.classList.remove("is-walking");
      if (!isCurrentlyFrontPose) {
        isCurrentlyFrontPose = true;
        chibiMount.innerHTML = Sprites.chibiFrontSVG;
      }
    }

    render();
  }

  function resetWalk() {
    targetWorldX = null;
    momWorldX = 160;
    chimedChapters.clear();
    momSprite.style.left = `${momWorldX}px`;
    momSprite.classList.remove("facing-left", "is-walking");
    isCurrentlyFrontPose = true;
    chibiMount.innerHTML = Sprites.chibiFrontSVG;
    render();
  }

  function init(callbacks) {
    stageFrame = document.getElementById("stage-frame");
    outsideEl = document.getElementById("outside-scene");
    worldTrack = document.getElementById("world-track");
    cloudLayerEl = document.getElementById("cloud-layer");
    mountainsLayerEl = document.getElementById("mountains-layer");
    hillsLayerEl = document.getElementById("hills-layer");
    momSprite = document.getElementById("mom-sprite");
    chibiMount = document.getElementById("chibi-sprite-mount");
    enterHouseBtn = document.getElementById("enter-house-btn");

    chibiMount.innerHTML = Sprites.chibiFrontSVG;

    buildWorldProps();
    buildChapters(callbacks.onOpenMemory);
    syncChapterPositions();

    document.getElementById("cement-road").addEventListener("click", (e) => {
      const rect = stageFrame.getBoundingClientRect();
      const clickScreenX = e.clientX - rect.left;
      const m = getResponsiveMetrics();
      targetWorldX = clamp(
        cameraX + clickScreenX - m.momHalfW,
        100,
        houseStopX,
      );
    });

    enterHouseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      targetWorldX = null;
      SoundManager.playDoorEnter();
      callbacks.onEnterHouse();
    });

    window.addEventListener("resize", () => {
      syncChapterPositions();
      render();
    });

    render();
  }

  return {
    init,
    update,
    resetWalk,
    clearTarget: () => {
      targetWorldX = null;
    },
    getActiveSlotIndex: () => activeSlotIndex,
  };
})();
