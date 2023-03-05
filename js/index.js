const blogPostContainers = [...document.querySelectorAll(".blog-post-container")];
const rightBtn = [...document.querySelectorAll(".right-btn")];
const leftBtn = [...document.querySelectorAll(".left-btn")];

blogPostContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  rightBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  leftBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});
