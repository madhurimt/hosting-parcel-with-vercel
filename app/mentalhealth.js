let data = null;
let appNode = document.querySelector("#app");

function renderData() {
  if (data === null) {
    appNode.innerHTML = "<h2>No data to show</h2>";
  } else if (data === "loading") {
    appNode.innerHTML = "<h2>Loading...</h2>";
  } else {
    appNode.innerHTML = "";
    let articleData = data.Result.Resources.Resource;
    console.log(articleData);
    articleData.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("article");
      articleElement.innerHTML = `
      <a href= ${article.AccessibleVersion}>
        <img src="${article.ImageUrl}" alt="${article.ImageAlt}">
      </a>`;
      const article_data = document.createElement("div");
      article_data.classList.add("article-info");
      article_data.innerHTML = `
      <h3>${article.Title}</h3>`;
      articleElement.appendChild(article_data);
      appNode.appendChild(articleElement);
    });
  }
}

function fetchApiData() {
  data = "loading";
  renderData();
  fetch(
    "https://health.gov/myhealthfinder/api/v3/topicsearch.json?categoryId=109&Lang=en"
  )
    .then((r) => r.json())
    .then((info) => {
      data = info;
      renderData();
    });
}

renderData();
fetchApiData();
