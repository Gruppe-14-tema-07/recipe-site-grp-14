const productContainer = document.querySelector(".container");
const id = new URLSearchParams(window.location.search).get("id");

// Fetch products
let fetchUrl = `https://dummyjson.com/recipes`;
if (window.location.search.includes(`id`)) {
  fetchUrl += `/${id}`;
}

fetch(fetchUrl)
  .then((response) => response.json())
  .then((products) => {
    console.log("noget sker");
    productContainer.innerHTML = "";
    console.log("products", products);
    let time = products.prepTimeMinutes + products.cookTimeMinutes;

    productContainer.innerHTML = `
        <div class="box">
          <h1 class="stock udsolgtskrift"> UDSOLGT</h1>
          <img class="img" src="https://cdn.dummyjson.com/recipe-images/${products.id}.webp" alt="product">
          <div class="flexcol boxinfo">
              <h2 class="name"></h2>
              <p class="productType"></p>
              <div class="flexrow">
                  <p class="price">Dkk</p>
              </div>
          </div>
        </div>`;
  });
