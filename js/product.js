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
    
    <div class="box1">
              <img src="https://cdn.dummyjson.com/recipe-images/${products.id}.webp" alt="${products.id}">
                <h1>${products.name}</h1>
            </div>
            <div class="box2">
                <ul class="box2_1">
                    <li>
                        <h4>Cuisine: </h4>
                        <p>${products.cuisine}</p>
                    </li>
                    <li>
                        <h4>Difficulty: </h4>
                        <p>${products.difficulty}</p>
                    </li>
                    <li>
                        <h4>Calories pr. servering: </h4>
                        <p>${products.caloriesPerServing}</p>
                    </li>
                    <li>
<div class="tags-container">
    <p>${products.tags.map((tag) => `<h4>#</h4>${tag}`).join(" ")}</p>
</div>

                    </li>
                </ul>

                <div class="box2_2">
                    <div class="box2_b1">
                        <h2>Prep</h2>
                        <h2>${products.prepTimeMinutes} min.</h2>
                    </div>

                    <div class="box2_b2">
                        <h2>Cook</h2>
                        <h2>${products.cookTimeMinutes} min.</h2>
                    </div>

                    <div class="box2_b3">
                        <h3>Ingredients</h3>
                        <ul>
                                ${products.ingredients.map((ingredient) => `<li><p>${ingredient}</p></li>`).join("")}
                        </ul>
                    </div>

                    <div class="box2_b4">
                        <h3>Instructions</h3>
                        <ul>
                                ${products.instructions.map((instruction) => `<li><p>${instruction}</p></li>`).join("")}
                        </ul>
                    </div>
                </div>
            </div>
    `;
  });
