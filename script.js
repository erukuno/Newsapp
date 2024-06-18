const apiKey = "cf5db05c22dc408c9f3d7612e50294cf";

const blogContainer = document.querySelector(".blog-row");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random News", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card", "col");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    img.classList.add("card-img-top", "img-fluid");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.textContent = article.title;
    title.classList.add("card-title");

    const description = document.createElement("p");
    description.textContent = article.description;
    description.classList.add("card-text");

    const link = document.createElement("a");
    link.href = article.url;
    link.target = "_blank";
    link.textContent = "Read More";
    link.classList.add("btn", "btn-primary");

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(link);

    card.appendChild(img);
    card.appendChild(cardBody);
    blogCard.appendChild(card);
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
