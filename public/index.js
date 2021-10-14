if(document.readyState !== "loading"){
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        initializeCode();
    })
}

function initializeCode() {
    let name = "";
    let incr = "";
    let inst = "";
    let ingrList = [];
    let instList = [];

    const addRecipeButton = document.getElementById("submit");
    const addIngredientsButton = document.getElementById("add-ingredient");
    const addInstructionsButton = document.getElementById("add-instruction");
    const searchBar = document.getElementById("search");
    const d1 = "Vegan";
    const d2 = "Meat";


    storeDiet("Vegan"); // Some testing
    storeDiet("Meat");

    readDiets();

    addRecipeButton.addEventListener("click", function() {
        const recipeName = document.getElementById("name-text");
        const recipeIngredients = document.getElementById("ingredients-text");
        const recipeInstructions = document.getElementById("instructions-text");
        let something = storeRecipe(recipeName.value, ingrList, instList);
        //console.log("something+ " + something);});
    });

    addIngredientsButton.addEventListener("click", function() {
        const recipeIngredients = document.getElementById("ingredients-text");
        ingrList.push(recipeIngredients.value);
        recipeIngredients.value = "";
        //console.log("list: " + ingrList);
    });

    addInstructionsButton.addEventListener("click", function() {
        const recipeInstructions = document.getElementById("instructions-text");
        instList.push(recipeInstructions.value);
        recipeInstructions.value = "";
        //console.log("list: " + instList);
    });

    searchBar.addEventListener("keydown", function (e) {
        if (e.code === "Enter") { 
            console.log(e.target.value);
            readRecipe(e.target.value);
        }
    });
}

function storeRecipe(name, ingredients, instructions){
    let resp = fetch("/recipe/", {
        method: "post",
        headers: {
            "Content-type": "application/json" },
        body: JSON.stringify({ "name": name, "ingredients": ingredients, "instructions": instructions})});
}

function storeDiet(name){
    console.log("Store diet");
    let resp = fetch("/test/", {
        method: "post",
        headers: {
            "Content-type": "application/json" },
        body: JSON.stringify({"name": name})
    } );
}

async function readRecipe(recipeName){
    let url = "/recipe/" + recipeName;
    console.log(url);

    let response = await fetch(url);
    let recipe = await response.json();
    addElement(recipe.name, recipe.ingredients, recipe.instructions);

    console.log(recipe);
}

async function readDiets(){
    let url = "/diets/";
    console.log("READ DIETS");

    let response = await fetch(url);
    let dietsrecipes = await response.json();

    if (dietsrecipes) {
        dietsrecipes.forEach(function(recipe) {
            console.log(recipe.name);
            addDiets(recipe.name);
          });    
    } 
}

function addElement(name, ing, inst) {
    const contentDiv = document.createElement("div");

    // Contents (p)
    const paraName = document.createElement("P");
    paraName.textContent = "name: " + name;
  
    const paraIng = document.createElement("P");
    paraIng.textContent = "ingredients: " + ing;

    const paraInst = document.createElement("P");
    paraInst.textContent = "instructions: " + inst;

      // Append to divs
    contentDiv.appendChild(paraName);
    contentDiv.appendChild(paraIng);
    contentDiv.appendChild(paraInst);
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("recipe");
    currentDiv.appendChild(contentDiv);
  }

  function addDiets(name){
      const dietDiv = document.createElement("div");
      const dietPara = document.createElement("P");
      dietPara.textContent = name;
      dietDiv.appendChild(dietPara);

      const currentDiv = document.getElementById("diets");
      currentDiv.appendChild(dietDiv);
  }
