function citation() {
  const citationText = document.getElementById("citation").textContent;
  console.log(citationText);
}

document.getElementById("button").addEventListener("click", citation);

/*
* ** Correctif

const element = document.getElementById("citation");
const button = document.getElementById("button");

// condition de verification de constante non null
if (element && button) {
// arrow function
  const printConsole = () => {
    console.log(element.textContent);
  }

  button.addEventListener("click", printConsole);
}



*/

/*
* * correctif, fonction anonyme

button.AddEventListener("click", function() {
  console.log(element.textContent);
  console.log(element.id);
  console.log(element.className);

  // verifier si la class exist
 if (element.classList.contains("none")) {
console.log("la classe none existe");
}
// retire la class
element.classList.remove("none");
// ajoute une classe
element.classList.add("flex");

console.log(element);
});

*/
