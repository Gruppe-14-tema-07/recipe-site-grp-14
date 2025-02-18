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
