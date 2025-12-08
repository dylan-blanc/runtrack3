function showhide() {
  let BWAT = document.getElementById("button");

  if (BWAT.style.display === "none") {
    BWAT.style.display = "block";
    BWAT.style.color = "White";
    BWAT.style.backgroundColor = "Black";
  } else {
    BWAT.style.display = "none";
  }
}

/*
* ** Correctif


// cible l'element par ID
const button = document.getElementById("button");

if (button) {
  const showhideBox = () => {
    const element = document.getElementById("citation");

    // condition (verifie si l'element est bien dans le DOM)
    if (element) {
      element.classList.contains("displayNone")
        ? element.classList.remove("displayNone")
        : element.classList.add("displayNone");
    } else {
      const article = document.createElement("article");
      article.setAttribute("id", "citation");
      article.innerText =
        "l'important n'est pas la chute, mais l'atterrissage.";
      document.body.appendChild(article);
    }
  };

  button.addEventListener("click", showhideBox);
}


*/

// cliquer sur le contenu de l'ID <button> pour afficher le texte ((ajouter le style displayNone préalablement pour afficher/masquer))
