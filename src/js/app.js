const heroButton = document.querySelector("#hero-button");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const modalSuccess = document.querySelector("#modal-success");
const optionOne = document.querySelector("#option-one");
const optionTwo = document.querySelector("#option-two");
const optionThree = document.querySelector("#option-three");
const form = document.querySelector(".modal-options");
const bookmark = document.querySelector("#hero-bookmark");
const bookmarkMobile = document.querySelector("#hero-bookmark-mobile");
const bookmarkText = document.querySelector("#bookmark-text");
const bookmark1 = bookmark.childNodes[1].childNodes[0].childNodes[0];
const bookmark2 = bookmark.childNodes[1].childNodes[0].childNodes[1];
const menuIcon = document.querySelector("#menu-mobile");
let backed = 89914;
let backers = 5007;
const formatter = new Intl.NumberFormat("en");

statsShow();

modal.addEventListener("click", (e) => {
  const card = document.querySelectorAll(".modal-options .option");
  const id = e.target.id;
  if (id === "one" || id === "two" || id === "three") {
    card.forEach((option) => {
      option.classList.remove("modal-active");
      e.target.parentElement.parentElement.classList.add("modal-active");
    });
  } else if (id === "continue-modal") {
    const input = document.querySelector(".modal-active .number").value;
    backed += Number(input);
    backers += 1;
    statsShow();
    completeBar();
  }
});

document.addEventListener("click", (e) => {
  console.log(e.target.id);
  switch (e.target.id) {
    case "hero-bookmark":
      if (bookmarkText.innerText === "Bookmarked") {
        console.log("Funciona");
        console.log(bookmark1);
        bookmark.style.width = "180px";
        bookmark1.setAttribute("fill", "#2F2F2F");
        bookmark2.setAttribute("fill", "#B1B1B1");
        bookmarkText.innerText = "Bookmark";
        bookmarkText.style.color = "#7A7A7A";
      } else {
        bookmark.style.width = "195px";
        bookmark1.setAttribute("fill", "#147B74");
        bookmark2.setAttribute("fill", "#fff");
        bookmarkText.innerText = "Bookmarked";
        bookmarkText.style.color = "#147B74";
      }
      break;
    case "hero-bookmark-mobile":
      console.log("Funciona");
      bookmarkm1.setAttribute("fill", "#147B74");
      bookmarkm2.setAttribute("fill", "#fff");
      break;
    case "menu-mobile":
      const menu = document.querySelector(".menu-responsive");
      if (menu.classList.contains("hide")) {
        menu.classList.remove("hide");
        /* menuIcon.style.backgroundImage = 'url("../img/icon-close-menu.svg")'; */
      } else {
        menu.classList.add("hide");
      }
      break;
    case "hero-button":
      openModal();
      scrollTop();
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
        scrollTop();
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

function statsShow() {
  const backedDiv = document.querySelector("#backed");
  const backersDiv = document.querySelector("#backers");
  backedDiv.innerText = formatter.format(backed);
  backersDiv.innerText = formatter.format(backers);
}

function completeBar() {
  const bar = document.querySelector("#bar");
  let complex = ((backed / 100000) * 100).toFixed(2);
  bar.style.width = complex + "%";
}
