if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}


async function initializeCode() {
    console.log("Fetch the pizza recipe");
    let name = "";
    let incr = "";
    let inst = "";
    let ingrList = [];
    let instList = [];

    let recipeResp = await readRecipe();
    addElement(recipeResp.name, recipeResp.ingredients, recipeResp.instructions);   

    const addRecipeButton = document.getElementById("submit");
    const addIngredientsButton = document.getElementById("add-ingredient");
    const addInstructionsButton = document.getElementById("add-instruction");

    addRecipeButton.addEventListener("click", function() {
        const recipeName = document.getElementById("name-text");
        const recipeIngredients = document.getElementById("ingredients-text");
        const recipeInstructions = document.getElementById("instructions-text");

        console.log(recipeName.value + ", " + ingrList + ", " + instList);

        let something = storeRecipe(recipeName.value, ingrList, instList);
        console.log("something+ " + something);});

    addIngredientsButton.addEventListener("click", function() {
        console.log("huhuu");
        const recipeIngredients = document.getElementById("ingredients-text");
        ingrList.push(recipeIngredients.value);
        recipeIngredients.value = "";
        console.log("list: " + ingrList);
    });

    addInstructionsButton.addEventListener("click", function() {
        console.log("kukkuu");
        const recipeInstructions = document.getElementById("instructions-text");
        instList.push(recipeInstructions.value);
        recipeInstructions.value = "";
        console.log("list: " + instList);
    });


}

function storeRecipe(name, ingredients, instructions){
    let resp = fetch("/recipe/", {
        method: "post",
        headers: {
            "Content-type": "application/json" },
        body: JSON.stringify({ "name": name, "ingredients": ingredients, "instructions": instructions})});
}

async function readRecipe(){
    let response = await fetch("/recipe/pazza")
        .then(response => response.json())
    //let respis2 = await response.json();
    return response;
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


  

