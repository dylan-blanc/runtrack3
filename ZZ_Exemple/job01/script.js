let compteur = 0;

function incrementer() {
compteur++;
document.getElementById("compteur").innerText = compteur;}

function decrementer() {
compteur--;
document.getElementById("compteur").innerText = compteur;
}

function reset() {
    compteur = 0;
    document.getElementById("compteur").innerText = compteur;
}