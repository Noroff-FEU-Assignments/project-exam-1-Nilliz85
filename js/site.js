/*-------------------- Site --------------------*/

/*---------- Get Element ----------*/
const navList = document.querySelector(".nav-list");
const hamburger = document.querySelector(".hamburger-menu");
const header = document.querySelector(".header");

/*---------- Event Listener ----------*/
hamburger.addEventListener("click", () => {
  navList.classList.toggle("show");
});

/*-- Adds "position: fixed" on header when user scrolls--*/
const navHeight = header.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    header.classList.add("fix");
  } else {
    header.classList.remove("fix");
  }
});
