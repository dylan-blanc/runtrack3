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
