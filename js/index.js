const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const productId = searchParams.get("id");

const container = document.querySelector(".container");
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
