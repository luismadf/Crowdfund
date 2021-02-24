const heroButton = document.querySelector("#hero-button");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const modalSuccess = document.querySelector("#modal-success");

document.addEventListener("click", (e) => {
  if (e.target.id === "hero-button") {
    openModal();
  } else if (e.target.id === "close-modal") {
    closeModal();
  } else if (e.target.id === "continue-modal") {
    openModal();
  } else if (e.target.id === "finish") {
    closeModal();
  }
});

function openModal() {
  if (overlay.classList.contains("hide")) {
    overlay.classList.remove("hide");
    modal.classList.remove("hide");
  } else {
    modal.classList.add("hide");
    modalSuccess.classList.remove("hide");
  }
}

function closeModal() {
  if (!modalSuccess.classList.contains("hide")) {
    overlay.classList.add("hide");
    modalSuccess.classList.add("hide");
  } else {
    overlay.classList.add("hide");
    modal.classList.add("hide");
  }
}
