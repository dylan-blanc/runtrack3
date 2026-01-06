/*
 * ***************************************************************************************************************************
 */

function loadView(view) {
  // Ajoute l'extension .html si ce n'est pas un fichier PHP
  const originalView = view;
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

      // Charge dynamiquement le script associé à la vue
      loadViewScript(originalView);
    });
}

// Charge et exécute le script JS associé à une vue
function loadViewScript(viewName) {
  const scriptPath = `./assets/js/${viewName}.js`;

  // Vérifie si le script existe et le charge
  fetch(scriptPath, { method: 'HEAD' })
    .then((response) => {
      if (response.ok) {
        // Supprime l'ancien script s'il existe
        const existingScript = document.getElementById(`script-${viewName}`);
        if (existingScript) {
          existingScript.remove();
        }

        // Crée et ajoute le nouveau script
        const script = document.createElement('script');
        script.id = `script-${viewName}`;
        script.src = scriptPath;
        script.onload = function () {
          // Appelle la fonction d'initialisation si elle existe
          const initFunctionName = `init${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`;
          if (typeof window[initFunctionName] === 'function') {
            window[initFunctionName]();
          }
        };
        document.body.appendChild(script);
      }
    })
    .catch(() => {
      // Script n'existe pas, on ignore silencieusement
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
