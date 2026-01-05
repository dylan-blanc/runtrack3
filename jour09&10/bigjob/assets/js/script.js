/*
 * ***************************************************************************************************************************
 */

function loadView(view) {
  // Ajoute l'extension .html si ce n'est pas un fichier PHP
  if (!view.endsWith(".php")) {
    view = view + ".html";
  }
  fetch(view)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("view-container").innerHTML = html;
      const exclure = document.getElementById("exclure");
      if (exclure) {
        exclure.style.display = "none";
      }
    });
}

// Gestion des clics sur les liens de navigation
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a[data-view]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const view = link.getAttribute("data-view");
      loadView(view);
    });
  });
});



// MutationObserver permet de détecter quand le contenu de la page change (ex: chargement dynamique d'une vue)
// On relance la validation à chaque changement du contenu principal
const observateur = new MutationObserver(function () {
  initValidationInscription();
  initValidationConnexion();
});

// Quand la page est chargée, on observe le conteneur principal pour détecter les changements
document.addEventListener("DOMContentLoaded", function () {
  const viewContainer = document.getElementById("view-container");
  if (viewContainer) {
    observateur.observe(viewContainer, { childList: true, subtree: true });
  }
});
