const container = document.querySelector(".container");
let mealArray = [];

fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((products) => {
    container.innerHTML = "";
    console.log("products", products);
    console.log("products.recipes", products.recipes);

    products.recipes.forEach((data) => {
      data.mealType.forEach((type) => {
        if (!mealArray.includes(type) && type !== "Snack") {
          mealArray.push(type);
        }
      });
    });

    console.log("Unique meal types:", mealArray);
  });
