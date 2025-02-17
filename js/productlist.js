const productContainer = document.querySelector(".container");
const mealType = new URLSearchParams(window.location.search).get("mealType");

// Fetch products
let fetchUrl = `https://dummyjson.com/recipes`;
if (window.location.search.includes(`mealType`)) {
  fetchUrl += `/meal-type/${mealType}`;
}

fetch(fetchUrl)
  .then((response) => response.json())
  .then((products) => {
    productContainer.innerHTML = "";
    console.log("products", products);
    console.log("products.recipes", products.recipes);
    const htmlProducts = products.recipes.map((data) => {
      let time = data.prepTimeMinutes + data.cookTimeMinutes;

      return `
        <div class="box">
          <h1 class="stock udsolgtskrift"> UDSOLGT</h1>
          <img class="img" src="https://cdn.dummyjson.com/recipe-images/${data.id}.webp" alt="product">
        <a href="product.html?id=${data.id}">Single Recipe</a>
        `;
    });

    const string = htmlProducts.join(" ");
    productContainer.innerHTML = string;
  });
