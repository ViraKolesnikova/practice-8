class News {
  constructor(url, API_KEY) {
    this.prevBtn = document.querySelector("#prev");
    this.nextBtn = document.querySelector("#next");
    this.list = document.querySelector(".list");
    this.pageAmount = document.querySelector(".page-amount");
    this.input = document.querySelector("input");
    this.API_KEY = API_KEY;
    this.url = url + this.API_KEY;
    this.counter = 1;
  }

  fetchNews = async () => {
    let urlToFetch = this.url + "&" + "page" + "=" + this.counter;
    try {
      const response = await fetch(urlToFetch, {});
    const data = await response.json();

    if (data) {
      if (data.response.status === "ok") this.renderNews(data.response.results);
      this.renderPagination(data.response);
    }
    } catch (error) {
      console.log(error);
    }
  };

  renderNews = (arrayResults) => {
    this.list.innerHTML = "";
    const liCollection = arrayResults.map(
      ({ webPublicationDate, webTitle, webUrl }) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        let p = document.createElement("p");
        a.setAttribute("href", webUrl);
        a.setAttribute("target", "_blanc");
        a.textContent = webTitle;
        p.textContent = `publication Date: ${webPublicationDate}`;
        a.append(p);
        li.append(a);
        return li;
      }
    );
    this.list.append(...liCollection);
  };

  renderPagination = (response) => {
    if (this.counter === 1) {
      this.prevBtn.disabled = true;
    }
    this.input.value = response.currentPage;
    this.pageAmount.textContent = " of " + response.pages;
  };

  onPrevPage = (event) => {
    if (this.counter === 1) {
      this.prevBtn.disabled = true;
      return;
    }
    this.counter -= 1;
    this.fetchNews();
  };

  onNextPage = (event) => {
    if (this.counter > 1) {
      this.prevBtn.disabled = false;      
    }
    this.counter += 1;
    this.fetchNews();
  };

  onInputChange = (event) => {
    this.counter = event.target.value;

    this.fetchNews();
  };

  addListeners = () => {
    this.prevBtn.addEventListener("click", this.onPrevPage);
    this.nextBtn.addEventListener("click", this.onNextPage);
    this.input.addEventListener("input", this.onInputChange);
    window.addEventListener("load", this.fetchNews);
  };

  init = () => {
    this.addListeners();
  };
}

const API_KEY = "f566a9c9-710b-45ec-8be1-9d3f62d7535a";
const url = `https://content.guardianapis.com/search?q=debate&api-key=`;

new News(url, API_KEY).init();
