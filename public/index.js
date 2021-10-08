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
    let recipeResp = await readRecipe();
    addElement(recipeResp.name, recipeResp.ingredients, recipeResp.instructions);   

    const addRecipeButton = document.getElementById("submit");
    addRecipeButton.addEventListener("click", function() {
        const recipeName = document.getElementById("name-text");
        const recipeIngredients = document.getElementById("ingredients-text");
        const recipeInstructions = document.getElementById("instructions-text");

        console.log(recipeName.value + ", " + recipeIngredients.value + ", " + recipeInstructions.value);

    /*recipeResp = await fetch("/recipe/pizza", {})
       .then(response => response.json())
       .then(data => console.log(data)   
       );*/
       let something = storeRecipe(recipeName.value, recipeIngredients.value, recipeInstructions.value);
       console.log(something);
});
}

function storeRecipe(name, ingredients, instructions){
    let resp = fetch("/recipe/", {
        method: "post",
        headers: {
            "Content-type": "application/json" },
        body: JSON.stringify({ "name": name, "ingredients": ingredients, "instructions": instructions})});
    //let content = resp.json();
    //console.log(content);

    //return response;
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


  

