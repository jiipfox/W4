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

    /*recipeResp = await fetch("/recipe/pizza", {})
       .then(response => response.json())
       .then(data => console.log(data)   
       );*/

    let recipeResp = await readRecipe();
    addElement(recipeResp.name, recipeResp.incredients, recipeResp.instructions);
}

async function readRecipe(){
    let response = await fetch("/recipe/pizza");
    let respis2 = await response.json();
    return respis2;
}

function addElement(name, ing, inst) {
    const contentDiv = document.createElement("div");

    // Contents (p)
    const paraName = document.createElement("P");
    paraName.textContent = "name: " + name;
  
    const paraIng = document.createElement("P");
    paraIng.textContent = "incredients: " + ing;

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
