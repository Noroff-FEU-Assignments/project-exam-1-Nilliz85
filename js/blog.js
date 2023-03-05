/*-------------- Blog page --------------*/

/*-------------- Select div/container --------------*/
const blogContainer = document.querySelector(".blog-layout");

/*-------------- Get Blog Posts --------------*/
const getBlogPosts = async () => {
  try {
    isLoading = true;

    const response = await fetch(`https://headless-wp.pernilsen.dev/wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage}`);
    const posts = await response.json();

    if (currentPage === 1) {
      totalPages = response.headers.get("X-WP-TotalPages");
    }

    showPosts(posts);

    /*-------------- checks if request is succesfull or not --------------*/
    isLoading = false;
  } catch (error) {
    console.error(error);
    isLoading = false;
  }
};

/*-------------- Show Posts --------------*/
const showPosts = (posts) => {
  posts.forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.classList.add("blog");

    const blogImg = document.createElement("div");
    blogImg.classList.add("blog-img");

    const excerpt = post.excerpt.rendered;

    const imgSrc = post["_embedded"] && post["_embedded"]["wp:featuredmedia"] ? post["_embedded"]["wp:featuredmedia"][0]["source_url"] : "";

    const blogImgHtml = `<a href="#"><img src="${imgSrc}" alt="" /></a>`;
    blogImg.innerHTML = blogImgHtml;

    const blogText = document.createElement("div");
    blogText.classList.add("blog-text");

    const title = post.title.rendered;

    const blogTextHtml = `<h2><a href="#" data-post-id="${post.id}">${title}</a></h2>
    <p>${excerpt}</p>`;
    blogText.innerHTML = blogTextHtml;

    postContainer.appendChild(blogImg);
    postContainer.appendChild(blogText);
    blogContainer.appendChild(postContainer);

    /*-------------- Add eventlistener to anchor tag--------------*/
    const postLink = blogText.querySelector("a");
    postLink.addEventListener("click", (event) => {
      event.preventDefault();
      const postId = event.target.getAttribute("data-post-id");
      window.location.href = `blog-post.html?id=${postId}`;
    });
  });
};

/*-------------- Get Individual Blog Post --------------*/
const getBlogPost = async (postId) => {
  try {
    const response = await fetch(`https://headless-wp.pernilsen.dev/wp-json/wp/v2/posts/${postId}`);
    const post = await response.json();
    showPost(post);
  } catch (error) {
    console.error(error);
  }
};

/*-------------- Show Individual Blog Post --------------*/
const showPost = (post) => {
  blogContainer.innerHTML = "";

  const postContainer = document.createElement("div");
  postContainer.classList.add("blog-post");

  const title = post.title.rendered;
  const content = post.content.rendered;

  const postHtml = `<h1>${title}</h1>
                    ${content}`;
  postContainer.innerHTML = postHtml;

  blogContainer.appendChild(postContainer);
};

/*-------------- Number of posts per page, page number, total pages and multiple request prevention --------------*/
let perPage = 6;
let currentPage = 1;
let totalPages;
let isLoading = false;

/*-------------- Load More Posts --------------*/
const loadMorePosts = () => {
  if (!isLoading && currentPage < totalPages) {
    currentPage++;
    getBlogPosts();
  }

  /*-------------- Remove "Load More" Button --------------*/
  if (currentPage >= totalPages) {
    loadMoreContainer.remove();
  }
};

getBlogPosts();

/*-------------- "Load More" Button --------------*/
const loadMoreContainer = document.createElement("div");
loadMoreContainer.id = "load-more-container";
loadMoreContainer.classList.add("load-button");

const loadMoreButton = document.createElement("button");
loadMoreButton.id = "load-more-btn";
loadMoreButton.classList.add("load");
loadMoreButton.textContent = "Load More";
loadMoreButton.addEventListener("click", loadMorePosts);

loadMoreContainer.appendChild(loadMoreButton);

blogContainer.after(loadMoreContainer);
