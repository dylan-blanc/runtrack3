function afficherPrenom() {
  let prenom = document.getElementById("prenom").value;

  let resultat = document.getElementById("resultat");
  if (prenom) {
    resultat.textContent = "Bonjour " + prenom;
    resultat.style.color = "blue";
    resultat.style.fontSize = "3em";
  } else {
    resultat.textContent = "";
  }
}
