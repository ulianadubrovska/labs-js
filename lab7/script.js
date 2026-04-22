const content = document.getElementById("content");
const catalogLink = document.getElementById("catalog-link");

catalogLink.addEventListener("click", function (event) {
    event.preventDefault();
    loadCatalog();
});

async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Cannot load file: ${url}`);
    }

    return await response.json();
}

function showLoading() {
    content.innerHTML = `
    <div class="loading-message">
      <h3>Loading...</h3>
      <p>Please wait while data is being loaded.</p>
    </div>
  `;
}

function showError(message) {
    content.innerHTML = `
    <div class="error-message">
      <h3>Error</h3>
      <p>${message}</p>
    </div>
  `;
}

async function loadCatalog() {
    try {
        showLoading();

        const categories = await fetchJSON("./data/categories.json");

        let html = `
      <h2>Catalog Categories</h2>
      <p>Select a category to view menu items.</p>
      <div class="category-list">
    `;

        categories.forEach((category) => {
            html += `
        <a href="#" class="category-link" data-shortname="${category.shortname}">
          ${category.name}
        </a>
      `;
        });

        html += `
      </div>
      <a href="#" class="specials-link" id="specials-link">Specials</a>
    `;

        content.innerHTML = html;

        const categoryLinks = document.querySelectorAll(".category-link");
        categoryLinks.forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const shortname = this.getAttribute("data-shortname");
                loadCategory(shortname);
            });
        });

        document
            .getElementById("specials-link")
            .addEventListener("click", async function (event) {
                event.preventDefault();
                loadSpecials();
            });
    } catch (error) {
        showError(error.message);
    }
}

async function loadCategory(shortname) {
    try {
        showLoading();

        const categories = await fetchJSON("./data/categories.json");
        const category = categories.find((item) => item.shortname === shortname);

        if (!category) {
            showError("Category not found.");
            return;
        }

        const items = await fetchJSON(`./data/${shortname}.json`);

        let html = `
      <h2>${category.name}</h2>
      <p class="notes">${category.notes ? category.notes : "No notes for this category."}</p>
      <div class="cards">
    `;

        items.forEach((item) => {
            html += `
        <div class="card">
          <img src="https://placehold.co/200x200?text=${encodeURIComponent(item.name)}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">Price: ${item.price}</p>
        </div>
      `;
        });

        html += `</div>`;

        content.innerHTML = html;
    } catch (error) {
        showError(error.message);
    }
}

async function loadSpecials() {
    try {
        showLoading();

        const categories = await fetchJSON("./data/categories.json");
        const randomIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomIndex];

        loadCategory(randomCategory.shortname);
    } catch (error) {
        showError(error.message);
    }
}