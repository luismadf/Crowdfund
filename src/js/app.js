const heroButton = document.querySelector("#hero-button");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const modalSuccess = document.querySelector("#modal-success");
const optionOne = document.querySelector("#option-one");
const optionTwo = document.querySelector("#option-two");
const optionThree = document.querySelector("#option-three");
const form = document.querySelector(".modal-options");
const bookmark = document.querySelector("#hero-bookmark");
const bookmarkText = document.querySelector("#bookmark-text");
const bookmark1 = bookmark.childNodes[1].childNodes[0].childNodes[0];
const bookmark2 = bookmark.childNodes[1].childNodes[0].childNodes[1];

modal.addEventListener("click", (e) => {
  const card = document.querySelectorAll(".modal-options .option");
  const id = e.target.id;
  if (id) {
    card.forEach((option) => {
      option.classList.remove("modal-active");
      console.log(
        e.target.parentElement.parentElement.classList.add("modal-active")
      );
    });
  }
});

document.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "hero-bookmark":
      if (bookmarkText.innerText === "Bookmarked") {
        console.log("Funciona");
        bookmark.style.width = "185px";
        bookmark1.setAttribute("fill", "#2F2F2F");
        bookmark2.setAttribute("fill", "#B1B1B1");
        bookmarkText.innerText = "Bookmark";
        bookmarkText.style.color = "#7A7A7A";
      } else {
        bookmark.style.width = "200px";
        bookmark1.setAttribute("fill", "#147B74");
        bookmark2.setAttribute("fill", "#fff");
        bookmarkText.innerText = "Bookmarked";
        bookmarkText.style.color = "#147B74";
      }
      break;
    case "hero-button":
      openModal();
      break;
    case "close-modal":
      closeModal();
      break;
    case "continue-modal":
      openModal();
      scrollTop();
      break;
    case "finish":
      closeModal();
      break;
    default:
      if (e.target.classList.contains("open-button")) {
        openModal();
      }
      break;
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

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
