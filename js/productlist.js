const productContainer = document.querySelector(".container");
const mealTypeContainer = document.querySelector(".mealType");
const cuisineContainer = document.querySelector(".cuisine");
const mealType = new URLSearchParams(window.location.search).get("mealType");

let mealArray = [];
let cuisineArray = [];

showProducts();

function showProducts() {
  // Fetch products
  let fetchUrl = `https://dummyjson.com/recipes`;
  if (window.location.search.includes(`mealType`)) {
    fetchUrl += `/meal-type/${mealType}`;
  }

  fetch(fetchUrl)
    .then((response) => response.json())
    .then((products) => {
      productContainer.innerHTML = "";

      products.recipes.forEach((data) => {
        // Ensure mealType is an array before using forEach
        if (Array.isArray(data.mealType)) {
          data.mealType.forEach((type) => {
            if (!mealArray.includes(type) && type !== "Snack") {
              mealArray.push(type);
            }
          });
        }

        // Ensure cuisine is an array before using forEach
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

      console.log("Unique meal types:", mealArray);
      console.log("Unique cuisines:", cuisineArray);

      // Display meal types
      mealTypeContainer.innerHTML = mealArray.join(", ");
      cuisineContainer.innerHTML = cuisineArray.join(", ");

      // **Filtering logic - return all items (do nothing)**
      const filteredRecipes = products.recipes.filter((recipe) => recipe.cuisine === "Asian");

      //   console.log("filteredRecipes er ", filteredRecipes);

      // Generate HTML for filtered recipes
      const htmlProducts = filteredRecipes.map((data) => {
        return `
        <div class="box">
          ${data.soldout ? '<h1 class="stock udsolgtskrift"> UDSOLGT</h1>' : ""}
          <img class="img" src="https://cdn.dummyjson.com/recipe-images/${data.id}.webp" alt="${data.name}">
          <a href="product.html?id=${data.id}">Single Recipe</a>
        </div>`;
      });

      productContainer.innerHTML = htmlProducts.join(" ");
    })
    .catch((error) => console.error("Error fetching data:", error));
}
