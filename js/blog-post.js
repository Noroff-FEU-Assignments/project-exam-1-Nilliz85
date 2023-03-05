/*---------------- Individual Blog Posts ----------------*/

/*---------------- Fetch post id from url ----------------*/
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

/*---------------- Select the post container ----------------*/
const postContainer = document.querySelector(".blog-post-container");
const topContainer = postContainer.querySelector(".top");
const featuredImage = postContainer.querySelector(".featured-image");
const contentContainer = postContainer.querySelector(".content");

/*---------------- Create and show modal ----------------*/
const modal = document.createElement("div");
modal.className = "modal";
const modalImg = document.createElement("img");
modalImg.className = "modal-content";
modal.appendChild(modalImg);
document.body.appendChild(modal);

function showModal(src) {
  modal.style.display = "block";
  modalImg.src = src;
}

function closeModal() {
  modal.style.display = "none";
}

/*---------------- Fetch and show posts ----------------*/
async function getPost() {
  try {
    const response = await fetch(`https://headless-wp.pernilsen.dev/wp-json/wp/v2/posts/${postId}`);
    const post = await response.json();
    console.log(postId);

    topContainer.querySelector("h1").textContent = post.title.rendered;
    topContainer.querySelectorAll(".info span")[1].textContent = new Date(post.date).toLocaleDateString();
    featuredImage.querySelector("img").setAttribute("src", post.featured_media_src_url);

    const content = document.createElement("div");
    content.innerHTML = post.content.rendered;
    content.querySelectorAll("img").forEach((img) => {
      img.setAttribute("src", img.dataset.src);
      img.addEventListener("click", (e) => {
        e.preventDefault();
        showModal(img.dataset.src);
      });
    });
    contentContainer.appendChild(content);

    modal.addEventListener("click", closeModal);
    modalImg.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  } catch (error) {
    console.error(error);
  }
}

getPost();
