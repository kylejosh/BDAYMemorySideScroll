window.App = window.App || {};

window.App.OutsideScene = (() => {
  const { PICTURES_DATA, Sprites, Atmosphere, SoundManager } = window.App;

  /* ========================================================================
     1. WORLD CONSTANTS & DERIVED POSITIONS
     ======================================================================== */
  const CHAPTER_SPACING = 1200;
  const FIRST_TRIGGER_X = 620;
  const HOUSE_WORLD_X =
    FIRST_TRIGGER_X + PICTURES_DATA.length * CHAPTER_SPACING - 600;
  const HOUSE_STOP_X = HOUSE_WORLD_X + 290;
  const WORLD_WIDTH = HOUSE_WORLD_X + 830;

  const WALK_SPEED = 4.5;
  const WALK_FRAME_DISTANCE = 26;

  const ATMOSPHERE_MILESTONES = [
    ...PICTURES_DATA.map(
      (_, idx) => FIRST_TRIGGER_X + idx * CHAPTER_SPACING + 160,
    ),
    HOUSE_STOP_X,
  ];

  /* ========================================================================
     2. DOM REFERENCES & RUNTIME STATE
     ======================================================================== */
  let stageFrame;
  let outsideEl;
  let worldTrack;
  let cloudLayerEl;
  let mountainsLayerEl;
  let hillsLayerEl;
  let momSprite;
  let chibiMount;
  let enterHouseBtn;

  let chapters = []; // [{ el, triggerX, frameX, state }]
  let metrics = null;

  let momWorldX = 160;
  let cameraX = 0;
  let targetWorldX = null;
  let activeSlotIndex = -1;
  let walkCycleTimer = 0;
  let currentWalkIdx = 0;
  let isCurrentlyFrontPose = true;
  let houseBtnVisible = false;
  let needsRender = true;
  const chimedChapters = new Set();

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  /* ========================================================================
     3. CACHED VIEWPORT METRICS
     ======================================================================== */
  function updateMetrics() {
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

    metrics = {
      viewportW,
      momHalfW,
      momScreenAnchor,
      frameOffsetFromTrigger,
      dissolveLeftThreshold,
    };
  }

  function syncChapterPositions() {
    chapters.forEach((chapter) => {
      chapter.frameX = chapter.triggerX + metrics.frameOffsetFromTrigger;
      chapter.el.style.left = `${chapter.frameX}px`;
    });
  }

  /* ========================================================================
     4. WORLD SCENERY & CHAPTER BUILDERS
     ======================================================================== */
  function buildWorldProps() {
    worldTrack.style.width = `${WORLD_WIDTH}px`;

    const houseWrapper = document.getElementById("house-wrapper");
    const houseDriveway = document.getElementById("house-driveway");
    houseWrapper.style.left = `${HOUSE_WORLD_X}px`;
    houseWrapper.innerHTML = Sprites.GREEN_HOUSE_EXTERIOR_SVG;
    houseDriveway.style.left = `${HOUSE_WORLD_X + 8}px`;

    // Clouds
    const cloudFrag = document.createDocumentFragment();
    for (let cx = 95; cx < WORLD_WIDTH * 0.45; cx += 380) {
      const cloud = document.createElement("div");
      cloud.className = "cloud-2d";
      cloud.style.top = `${38 + (cx % 44)}px`;
      cloud.style.left = `${cx}px`;
      cloud.style.transform = `scale(${0.88 + ((cx / 190) % 3) * 0.12})`;
      cloudFrag.appendChild(cloud);
    }
    cloudLayerEl.appendChild(cloudFrag);

    // Trees, Streetlamps & Fences
    const sceneryFrag = document.createDocumentFragment();
    const treeTypes = ["oak", "sakura", "pine", "citrus", "willow"];
    let treeIdx = 0;

    for (let tx = 40; tx < HOUSE_WORLD_X - 150; tx += 235) {
      const type = treeTypes[treeIdx % treeTypes.length];
      const scale = 0.9 + (treeIdx % 3) * 0.07;
      const el = document.createElement("div");
      el.className = "scenic-tree";
      el.style.left = `${tx}px`;
      el.style.zIndex = treeIdx % 2 === 0 ? 2 : 3;
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = "bottom center";
      el.innerHTML = Sprites.TREES[type];
      sceneryFrag.appendChild(el);
      treeIdx++;
    }

    for (let lx = 440; lx < HOUSE_WORLD_X - 240; lx += 1500) {
      const lamp = document.createElement("div");
      lamp.className = "lamp-2d";
      lamp.style.left = `${lx}px`;
      lamp.innerHTML = `<div class="lamp-2d-halo"></div><div class="lamp-2d-bulb"></div><div class="lamp-2d-pole"></div>`;
      sceneryFrag.appendChild(lamp);
    }

    const homeLamp = document.createElement("div");
    homeLamp.className = "lamp-2d";
    homeLamp.style.left = `${HOUSE_WORLD_X + 728}px`;
    homeLamp.style.height = "298px";
    homeLamp.innerHTML = `<div class="lamp-2d-halo" style="width:165px;height:165px;top:-58px;"></div><div class="lamp-2d-bulb" style="width:38px;height:38px;"></div><div class="lamp-2d-pole"></div>`;
    sceneryFrag.appendChild(homeLamp);

    for (let fx = 185; fx < HOUSE_WORLD_X - 220; fx += 1400) {
      const fence = document.createElement("div");
      fence.className = "wooden-fence";
      fence.style.left = `${fx}px`;
      fence.innerHTML = Sprites.WOODEN_FENCE_SVG;
      sceneryFrag.appendChild(fence);
    }

    document.getElementById("scenery-prop-layer").appendChild(sceneryFrag);
  }

  function buildChapters(onOpenMemory) {
    const chaptersMount = document.getElementById("chapters-mount");
    const frag = document.createDocumentFragment();
    chapters = [];

    PICTURES_DATA.forEach((item, idx) => {
      const triggerX = FIRST_TRIGGER_X + idx * CHAPTER_SPACING;
      const chapterNum = String(idx + 1).padStart(2, "0");

      const slotEl = document.createElement("div");
      slotEl.className = "reminisce-slot";

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

      frag.appendChild(slotEl);
      chapters.push({
        el: slotEl,
        triggerX,
        frameX: 0,
        state: "hidden",
      });
    });

    chaptersMount.appendChild(frag);
  }

  /* ========================================================================
     5. CAMERA, PROXIMITY & PARALLAX RENDER
     ======================================================================== */
  function render() {
    if (!needsRender) return;
    needsRender = false;

    const maxCam = Math.max(0, WORLD_WIDTH - metrics.viewportW);
    const momCenterWorld = momWorldX + metrics.momHalfW;

    cameraX = clamp(momCenterWorld - metrics.momScreenAnchor, 0, maxCam);

    const u = Atmosphere.computeProgress(momCenterWorld, ATMOSPHERE_MILESTONES);
    Atmosphere.apply(outsideEl, u, metrics.viewportW);

    let currentOpenIdx = -1;

    for (let idx = 0; idx < chapters.length; idx++) {
      const chapter = chapters[idx];
      const frameScreenX = chapter.frameX - cameraX;
      const hasTriggered = momCenterWorld >= chapter.triggerX;
      const isBeforeLeftBorder = frameScreenX > metrics.dissolveLeftThreshold;

      let nextState = "hidden";
      if (hasTriggered && isBeforeLeftBorder) {
        nextState = "open";
        currentOpenIdx = idx;
        if (!chimedChapters.has(idx)) {
          chimedChapters.add(idx);
          SoundManager.playMemoryChime();
        }
      } else if (hasTriggered && !isBeforeLeftBorder && frameScreenX > -220) {
        nextState = "dissolving";
      }

      if (nextState !== chapter.state) {
        chapter.state = nextState;
        chapter.el.classList.toggle("is-open", nextState === "open");
        chapter.el.classList.toggle(
          "is-dissolving",
          nextState === "dissolving",
        );
      }
    }

    activeSlotIndex = currentOpenIdx;

    const hasReachedHouse = momWorldX >= HOUSE_STOP_X - 70;
    if (hasReachedHouse !== houseBtnVisible) {
      houseBtnVisible = hasReachedHouse;
      enterHouseBtn.classList.toggle("visible", houseBtnVisible);
    }

    worldTrack.style.transform = `translate3d(${-cameraX}px, 0, 0)`;
    cloudLayerEl.style.transform = `translate3d(${-cameraX * 0.14}px, 0, 0)`;
    mountainsLayerEl.style.transform = `translate3d(${-cameraX * 0.22}px, 0, 0)`;
    hillsLayerEl.style.transform = `translate3d(${-cameraX * 0.38}px, 0, 0)`;
  }

  /* ========================================================================
     6. CHARACTER MOVEMENT & WALK ANIMATION LOOP
     ======================================================================== */
  function update(inputState, isBlocked) {
    let dx = 0;

    if (!isBlocked) {
      const goLeft = inputState.keyLeft || inputState.btnLeft;
      const goRight = inputState.keyRight || inputState.btnRight;

      if (goLeft && !goRight) dx = -WALK_SPEED;
      else if (goRight && !goLeft) dx = WALK_SPEED;
      else if (targetWorldX !== null) {
        const diff = targetWorldX - momWorldX;
        if (Math.abs(diff) > 4) {
          dx = Math.sign(diff) * WALK_SPEED;
        } else {
          momWorldX = targetWorldX;
          targetWorldX = null;
          momSprite.style.left = `${momWorldX}px`;
          needsRender = true;
        }
      }
    }

    if (dx !== 0) {
      momWorldX = clamp(momWorldX + dx, 100, HOUSE_STOP_X);
      momSprite.style.left = `${momWorldX}px`;
      momSprite.classList.add("is-walking");
      momSprite.classList.toggle("facing-left", dx < 0);
      SoundManager.playStep();

      if (isCurrentlyFrontPose) {
        isCurrentlyFrontPose = false;
        chibiMount.innerHTML = Sprites.chibiWalkFramesSVG[currentWalkIdx];
      }
      walkCycleTimer += Math.abs(dx);
      if (walkCycleTimer >= WALK_FRAME_DISTANCE) {
        walkCycleTimer = 0;
        currentWalkIdx =
          (currentWalkIdx + 1) % Sprites.chibiWalkFramesSVG.length;
        chibiMount.innerHTML = Sprites.chibiWalkFramesSVG[currentWalkIdx];
      }

      needsRender = true;
    } else if (!isCurrentlyFrontPose) {
      momSprite.classList.remove("is-walking");
      isCurrentlyFrontPose = true;
      chibiMount.innerHTML = Sprites.chibiFrontSVG;
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
    needsRender = true;
    render();
  }

  /* ========================================================================
     7. INITIALIZATION & PUBLIC API
     ======================================================================== */
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

    updateMetrics();
    buildWorldProps();
    buildChapters(callbacks.onOpenMemory);
    syncChapterPositions();

    document.getElementById("cement-road").addEventListener("click", (e) => {
      const rect = stageFrame.getBoundingClientRect();
      const clickScreenX = e.clientX - rect.left;
      targetWorldX = clamp(
        cameraX + clickScreenX - metrics.momHalfW,
        100,
        HOUSE_STOP_X,
      );
    });

    enterHouseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      targetWorldX = null;
      SoundManager.playDoorEnter();
      callbacks.onEnterHouse();
    });

    window.addEventListener("resize", () => {
      updateMetrics();
      syncChapterPositions();
      needsRender = true;
      render();
    });

    needsRender = true;
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
