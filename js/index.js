const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const productId = searchParams.get("id");

const mealTypeContainer = document.querySelector(".mealType");
const cuisineContainer = document.querySelector(".cuisine");
const mealType = new URLSearchParams(window.location.search).get("mealType");

const container = document.querySelector(".Mycontainer");
let mealArray = [];
let cuisineArray = [];

fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((products) => {
    container.innerHTML = "";

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
        // If cuisine is a string, add it directly
        cuisineArray.push(data.cuisine);
      }
    });

    console.log("Unique meal types:", mealArray);
    console.log("Unique cuisines:", cuisineArray);
  });

const minutescontainer = document.getElementById("box1-2");
fetch("https://dummyjson.com/recipes") //fetch daten som bliver filtrered til et nyt array og kalder
  .then((response) => response.json()) //sikre at responsen er i json format
  .then((data) => {
    return data.recipes.filter((recipe) => recipe.prepTimeMinutes + recipe.cookTimeMinutes <= 25); //brug filter()at loop igennem recipes og gem dem under 25 min in Arrayet
  })
  .then((quickRecipes) => {
    showProduct(quickRecipes);
  });

function showProduct(quickRecipes) {
  const markup = quickRecipes
    .map(
      (recipe) => `
                    
                         <a href="product.html?id=${recipe.id}">
                        <div>
                            <p>${recipe.name}</p>

                            <p class="pClass">&#x2197;</p>
                        </div>
                        </a>
                        
 `
    )
    .join(" ");

  minutescontainer.innerHTML = markup;
}

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
  });

fetch("https://dummyjson.com/recipes?limit=4")
  .then((response) => response.json())
  .then((data) => {
    return data.recipes.sort((a, b) => b.reviewCount - a.reviewCount); // Sorter reviewCount fra Største til mindst
  })
  .then((topRecipes) => {
    showProducts(topRecipes);
    console.log("These are the top recipes: ", topRecipes);
  });

function showProducts(topRecipes) {
  const markup = topRecipes
    .map(
      (data) => `
    
      <div class="recipeBox">
                  <div class="recipeImg">
                    <img class="recipeInnerImg" src="https://cdn.dummyjson.com/recipe-images/${data.id}.webp" alt="${data.name}">
                  </div>
                  <div class="info">
                    <h2 class="time">${data.time} mins</h2>
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
                </div> `
    )
    .join(" ");

  container.innerHTML = markup;
}
