let compteur = 0;

function addone() {
  compteur++;
  document.getElementById("compteur").innerText = compteur;
}

function subtractone() {
  compteur--;
  document.getElementById("compteur").innerText = compteur;
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".add").addEventListener("click", addone);
  document.querySelector(".sub").addEventListener("click", subtractone);
});

/*
* ** Correctif

const button = document.getElementById("button");

if (button) {

function addOne () {
const compteur = document.getElementById("compteur");
if (compteur)
compteur.textContent++;
}

function subtractOne () {
const compteur = document.getElementById("compteur");
if (compteur)
compteur.textContent--;
} 

button.addEventListener("click", addOne); // clic gauche pour incrémenter
button.addEventListener("contextmenu", subtractOne); // clic droit pour décrémenter
}

*/
