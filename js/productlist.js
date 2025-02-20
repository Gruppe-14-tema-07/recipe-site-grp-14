const productContainer = document.querySelector(".container");
const mealTypeContainer = document.querySelector(".mealType");
const cuisineContainer = document.querySelector(".cuisine");
const mealType = new URLSearchParams(window.location.search).get("mealType");

let mealArray = [];
let cuisineArray = [];
let cuisine = "";

// Fetch all products (to get meal types)
fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then((products) => {
    products.recipes.forEach((data) => {
      if (Array.isArray(data.mealType)) {
        data.mealType.forEach((type) => {
          if (!mealArray.includes(type) && type !== "Snack") {
            mealArray.push(type);
          }
        });
      }
    });

    // Display meal types
    mealTypeContainer.innerHTML = mealArray
      .map((data) => {
        return `
          <a href="productlist.html?mealType=${data}">
            <div class="flexcol">
              <img src="img/${data}.png" alt="${data}">
              <p>${data}</p>
            </div>
          </a>`;
      })
      .join(" ");

    // Extract unique cuisines
    products.recipes.forEach((data) => {
      if (Array.isArray(data.cuisine)) {
        data.cuisine.forEach((type) => {
          if (!cuisineArray.includes(type)) {
            cuisineArray.push(type);
          }
        });
      } else if (typeof data.cuisine === "string" && !cuisineArray.includes(data.cuisine)) {
        cuisineArray.push(data.cuisine);
      }
    });

    // Generate select dropdown for cuisines
    const selectorHTML = `
    <select class="cuisineSelect" id="filter">
      <option value="all_items" selected>All Cuisines</option>
      ${cuisineArray.map((data) => `<option value="${data}">${data} Recipes</option>`).join("")}
    </select>
  `;

    console.log("Unique cuisines:", cuisineArray);
    cuisineContainer.innerHTML = selectorHTML;

    // Add event listener to track changes
    document.getElementById("filter").addEventListener("change", (event) => {
      cuisine = event.target.value === "all_items" ? "" : event.target.value;
      console.log("Selected cuisine:", cuisine);
      showProducts(); // Re-filter products when cuisine is changed
    });

    showProducts(); // Initial load
  });

// Fetch filtered products
function showProducts() {
  let fetchUrl = "https://dummyjson.com/recipes";
  if (mealType) {
    fetchUrl += `/meal-type/${mealType}`;
  }

  fetch(fetchUrl)
    .then((response) => response.json())
    .then((products) => {
      productContainer.innerHTML = "";

      // Apply cuisine filter if selected
      const filteredRecipes = cuisine ? products.recipes.filter((recipe) => recipe.cuisine === cuisine) : products.recipes;

      // Generate HTML for filtered recipes
      const htmlProducts = filteredRecipes.map((data) => {
        let time = data.prepTimeMinutes + data.cookTimeMinutes;
        return `<a href="product.html?id=${data.id}"> 
                  <div class="recipeBox">
                    <div class="recipeImg">
                      <img class="recipeInnerImg" src="https://cdn.dummyjson.com/recipe-images/${data.id}.webp" alt="${data.name}">
                    </div>
                    <div class="info">
                      <h2 class="time">${time} mins</h2>
                      <h2 class="recipeBoxName">${data.name}</h2>
                      <p class="tags">${data.tags ? data.tags.join(", ") : ""}</p>
                      <div class="flexrow iconbox" style="justify-content: space-around;">
                        <div class="flexrow">
                          <img class="star" src="svg/Star.svg" alt="Rating star">
                          <h2 class="rating">${data.rating}</h2>
                        </div>
                        <div class="flexrow">
                          <img class="serving" src="svg/Servings.svg" alt="Servings icon">
                          <h2 class="servingsText">${data.servings} Servings</h2>
                        </div>
                      </div>
                    </div>
                  </div> 
                </a>`;
      });

      productContainer.innerHTML = htmlProducts.join(" ");
    })
    .catch((error) => console.error("Error fetching filtered recipes:", error));
}
