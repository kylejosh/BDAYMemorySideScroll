window.App = window.App || {};

(() => {
  const { PICTURES_DATA, OutsideScene, InsideScene, Controls } = window.App;

  const outsideEl = document.getElementById("outside-scene");
  const insideEl = document.getElementById("inside-scene");
  const walkPad = document.getElementById("walk-pad");

  const memoryModal = document.getElementById("memory-modal");
  const modalPhotoBox = document.getElementById("modal-photo-box");
  const modalTitle = document.getElementById("modal-title");
  const modalNote = document.getElementById("modal-note");
  const closeModalBtn = document.getElementById("close-modal-btn");

  let activeScene = "outside"; // 'outside' | 'inside'

  function switchScene(sceneName) {
    activeScene = sceneName;
    const isOutside = sceneName === "outside";
    outsideEl.classList.toggle("active", isOutside);
    insideEl.classList.toggle("active", !isOutside);
    walkPad.style.display = isOutside ? "flex" : "none";
  }

  function openMemoryModal(idx) {
    if (idx < 0 || idx >= PICTURES_DATA.length) return;
    const sourceViewport = document.getElementById(`photo-slot-${idx}`);
    modalPhotoBox.innerHTML = sourceViewport.innerHTML;
    modalTitle.textContent = PICTURES_DATA[idx].title;
    modalNote.textContent = PICTURES_DATA[idx].message;
    memoryModal.classList.add("open");
  }

  function closeMemoryModal() {
    memoryModal.classList.remove("open");
  }

  closeModalBtn.addEventListener("click", closeMemoryModal);
  memoryModal.addEventListener("click", (e) => {
    if (e.target === memoryModal) closeMemoryModal();
  });

  // Initialize Scenes & Controls
  OutsideScene.init({
    onOpenMemory: openMemoryModal,
    onEnterHouse: () => switchScene("inside"),
  });

  InsideScene.init({
    onExitHouse: (shouldResetWalk) => {
      switchScene("outside");
      if (shouldResetWalk) OutsideScene.resetWalk();
    },
  });

  Controls.init({
    onManualInput: () => {
      if (activeScene === "outside") OutsideScene.clearTarget();
    },
    isModalOpen: () => memoryModal.classList.contains("open"),
    onCloseModal: closeMemoryModal,
    onActionKey: () => {
      if (activeScene === "outside") {
        const idx = OutsideScene.getActiveSlotIndex();
        if (idx !== -1) openMemoryModal(idx);
      }
    },
  });

  // Main Animation Loop
  function tick() {
    if (activeScene === "outside") {
      OutsideScene.update(
        Controls.state,
        memoryModal.classList.contains("open"),
      );
    } else {
      InsideScene.update(Controls.state);
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
