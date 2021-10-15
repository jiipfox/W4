if(document.readyState !== "loading"){
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        initializeCode();
    })
}


let dietJson ="";

function initializeCode() {
    let name = "";
    let incr = "";
    let inst = "";
    let ingrList = [];
    let instList = [];
    let dietList = [];

    const addRecipeButton = document.getElementById("submit");
    const addIngredientsButton = document.getElementById("add-ingredient");
    const addInstructionsButton = document.getElementById("add-instruction");
    const searchBar = document.getElementById("search");
    const d1 = "Vegan";
    const d2 = "Meat";
    
    //storeDiet("Vegan"); // Some testing
    //storeDiet("Meat");

    readDiets();

    addRecipeButton.addEventListener("click", function() {
        const maxElementCount = 1000; // todo get size of collection?
        dietList = [];
        let id = "";

        const recipeName = document.getElementById("name-text");
        const recipeIngredients = document.getElementById("ingredients-text");
        const recipeInstructions = document.getElementById("instructions-text");

        for (let i = 0; i < maxElementCount; i++) {
            // Input check box checked?
            let cb = document.getElementById("cb-" + i);
            if (cb) {
                if (cb.checked){
                    // Read the label, assume one exists
                    let spanName = document.getElementById("span-"+i);

                    // get id of the recipe that has the name
                    console.log(dietJson);
                    if (dietJson.length > 0){
                        id = getIdByName(dietJson, spanName.innerHTML);
                        console.log("id to the list = " + id);
                        dietList.push(id);
                    }
                }
            }
        } 
        console.log(dietList);
        let something = storeRecipe(recipeName.value, ingrList, instList, dietList);
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

function storeRecipe(name, ingredients, instructions, dietList){
    let resp = fetch("/recipe/", {
        method: "post",
        headers: {
            "Content-type": "application/json" },
        body: JSON.stringify({ "name": name, "ingredients": ingredients, "instructions": instructions, "categories": dietList})});
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
    let counter = 0;
    console.log("READ DIETS");

    let response = await fetch(url);
    let dietsrecipes = await response.json();
    
    dietJson = dietsrecipes;
    
    console.log("Json of categories: ");
    console.log(dietJson);

    if (dietsrecipes) {
        dietsrecipes.forEach(function(recipe) {
            console.log(recipe.name);
            addDiets(recipe.name, counter);
            counter = counter + 1;
          });    
    } 
}

function getIdByName(jsonList, name) {
    console.log("Get id by name:\nJSON list:\n");
    console.log(jsonList);
    console.log("Name to search: " + name);
    for(var i = 0; i < jsonList.length; i++) {
        if (jsonList[i].name == name){
            console.log(jsonList[i]._id);
            return jsonList[i]._id;
        }
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

  function addDiets(name, count){
      const newDiv = document.createElement("div");
      const laapeli = document.createElement("label");
      const dietCheckBox = document.createElement("input");
      dietCheckBox.className = 'check';
      dietCheckBox.type = 'checkbox';
      dietCheckBox.id = "cb-" + count;
      const spani = document.createElement("span");
      spani.id = "span-" + count;
      spani.textContent = name;

      laapeli.appendChild(dietCheckBox);
      laapeli.appendChild(spani);
      newDiv.appendChild(laapeli);

      const currentDiv = document.getElementById("diets");
      currentDiv.appendChild(newDiv);
  }
