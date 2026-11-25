window.App = window.App || {};

window.App.Controls = (() => {
  const state = {
    keyLeft: false,
    keyRight: false,
    btnLeft: false,
    btnRight: false,
  };

  function bindDirectionalButton(btnEl, dirKey, onManualInput) {
    const startMove = (e) => {
      e.preventDefault();
      e.stopPropagation();
      state[dirKey] = true;
      btnEl.classList.add("pressed");
      if (onManualInput) onManualInput();
    };
    const endMove = (e) => {
      if (e) e.stopPropagation();
      state[dirKey] = false;
      btnEl.classList.remove("pressed");
    };

    btnEl.addEventListener("pointerdown", startMove);
    btnEl.addEventListener("pointerup", endMove);
    btnEl.addEventListener("pointerleave", endMove);
    btnEl.addEventListener("pointercancel", endMove);
    btnEl.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  function init(callbacks) {
    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");

    bindDirectionalButton(btnLeft, "btnLeft", callbacks.onManualInput);
    bindDirectionalButton(btnRight, "btnRight", callbacks.onManualInput);

    window.addEventListener("keydown", (e) => {
      if (callbacks.isModalOpen && callbacks.isModalOpen()) {
        if (e.key === "Escape" || e.key === "Enter" || e.code === "Space") {
          e.preventDefault();
          if (callbacks.onCloseModal) callbacks.onCloseModal();
        }
        return;
      }

      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        state.keyLeft = true;
        btnLeft.classList.add("pressed");
        if (callbacks.onManualInput) callbacks.onManualInput();
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        state.keyRight = true;
        btnRight.classList.add("pressed");
        if (callbacks.onManualInput) callbacks.onManualInput();
      }
      if ((e.key === "Enter" || e.code === "Space") && callbacks.onActionKey) {
        e.preventDefault();
        callbacks.onActionKey();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        state.keyLeft = false;
        btnLeft.classList.remove("pressed");
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        state.keyRight = false;
        btnRight.classList.remove("pressed");
      }
    });

    window.addEventListener("blur", () => {
      state.keyLeft = false;
      state.keyRight = false;
      state.btnLeft = false;
      state.btnRight = false;
      btnLeft.classList.remove("pressed");
      btnRight.classList.remove("pressed");
    });
  }

  return {
    state,
    init,
  };
})();
