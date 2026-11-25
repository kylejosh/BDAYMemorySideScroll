window.App = window.App || {};

(() => {
  const { PICTURES_DATA, OutsideScene, InsideScene, Controls } = window.App;

  const walkPad = document.getElementById("walk-pad");

  const memoryModal = document.getElementById("memory-modal");
  const modalPhotoBox = document.getElementById("modal-photo-box");
  const modalTitle = document.getElementById("modal-title");
  const modalNote = document.getElementById("modal-note");
  const closeModalBtn = document.getElementById("close-modal-btn");

  const houseModal = document.getElementById("house-modal");

  function syncHudVisibility() {
    const anyModalOpen =
      memoryModal.classList.contains("open") ||
      houseModal.classList.contains("open");
    walkPad.style.display = anyModalOpen ? "none" : "flex";
  }

  function openMemoryModal(idx) {
    if (idx < 0 || idx >= PICTURES_DATA.length) return;
    const sourceViewport = document.getElementById(`photo-slot-${idx}`);
    modalPhotoBox.innerHTML = sourceViewport.innerHTML;
    modalTitle.textContent = PICTURES_DATA[idx].title;
    modalNote.textContent = PICTURES_DATA[idx].message;
    memoryModal.classList.add("open");
    syncHudVisibility();
  }

  function closeMemoryModal() {
    memoryModal.classList.remove("open");
    syncHudVisibility();
  }

  function openHouseModal() {
    InsideScene.open();
    houseModal.classList.add("open");
    syncHudVisibility();
  }

  function closeHouseModal() {
    houseModal.classList.remove("open");
    syncHudVisibility();
  }

  closeModalBtn.addEventListener("click", closeMemoryModal);
  memoryModal.addEventListener("click", (e) => {
    if (e.target === memoryModal) closeMemoryModal();
  });

  houseModal.addEventListener("click", (e) => {
    if (e.target === houseModal) closeHouseModal();
  });

  // Initialize Outside Scene, Inside Celebration Modal & Controls
  OutsideScene.init({
    onOpenMemory: openMemoryModal,
    onEnterHouse: openHouseModal,
  });

  InsideScene.init({
    onExitHouse: closeHouseModal,
  });

  Controls.init({
    onManualInput: () => {
      OutsideScene.clearTarget();
    },
    isModalOpen: () =>
      memoryModal.classList.contains("open") ||
      houseModal.classList.contains("open"),
    onCloseModal: () => {
      if (houseModal.classList.contains("open")) {
        // Spacebar blows/relights candles when inside the house; Escape/Enter exits
        if (window.event && window.event.code === "Space") {
          InsideScene.toggleCandles();
          return;
        }
        closeHouseModal();
      } else if (memoryModal.classList.contains("open")) {
        closeMemoryModal();
      }
    },
    onActionKey: () => {
      const idx = OutsideScene.getActiveSlotIndex();
      if (idx !== -1) openMemoryModal(idx);
    },
  });

  // Main Animation Loop
  function tick() {
    const isBlocked =
      memoryModal.classList.contains("open") ||
      houseModal.classList.contains("open");
    OutsideScene.update(Controls.state, isBlocked);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
