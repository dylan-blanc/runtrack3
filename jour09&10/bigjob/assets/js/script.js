/*
 * ***************************************************************************************************************************
 */

// Vérifie si l'utilisateur a accès au backoffice
function hasBackofficeAccess() {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user && (user.role === 'admin' || user.role === 'moderator');
  } catch {
    return false;
  }
}

// Met à jour la visibilité du lien Admin dans la navigation
function updateAdminLinkVisibility() {
  const user = hasBackofficeAccess() ? JSON.parse(sessionStorage.getItem('user')) : null;
  const isLoggedIn = sessionStorage.getItem('user') !== null;

  // Gérer le lien Admin
  const adminLink = document.querySelector('a[data-view="backoffice"]');
  if (adminLink) {
    const parentLi = adminLink.closest('li');
    if (parentLi) {
      parentLi.style.display = hasBackofficeAccess() ? '' : 'none';
    }
  }

  // Gérer le bouton de déconnexion
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.style.display = isLoggedIn ? '' : 'none';
  }
}

function loadView(view) {
  // Vérification d'accès pour le backoffice
  if (view === 'backoffice' && !hasBackofficeAccess()) {
    document.getElementById("view-container").innerHTML = `
      <div class="container mt-5">
        <div class="alert alert-danger text-center" role="alert">
          <h4 class="alert-heading">Accès Refusé</h4>
          <p>Seuls les administrateurs et modérateurs peuvent accéder à cette page.</p>
          <hr>
          <p class="mb-0">Veuillez vous <a href="#" data-view="login" onclick="loadView('login'); return false;">connecter</a> avec un compte autorisé.</p>
        </div>
      </div>
    `;
    const exclure = document.getElementById("exclure");
    if (exclure) {
      exclure.style.display = "none";
    }
    return;
  }

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
        script.src = scriptPath + '?t=' + Date.now(); // Cache buster
        script.onload = function () {
          // Appelle la fonction d'initialisation si elle existe
          const initFunctionName = `init${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`;
          console.log('Recherche de la fonction:', initFunctionName);
          if (typeof window[initFunctionName] === 'function') {
            console.log('Appel de', initFunctionName);
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
  // Mettre à jour la visibilité du lien Admin
  updateAdminLinkVisibility();

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
  // Vérifier si les fonctions de validation existent avant de les appeler
  if (typeof initValidationInscription === 'function') {
    initValidationInscription();
  }
  if (typeof initValidationConnexion === 'function') {
    initValidationConnexion();
  }
  // Initialise les formulaires d'authentification (login/register) avec un léger délai
  // pour s'assurer que le DOM est complètement chargé
  setTimeout(function () {
    if (typeof window.authModule !== 'undefined' && typeof window.authModule.initAuthForms === 'function') {
      window.authModule.initAuthForms();
    }
    // Mettre à jour la visibilité du lien Admin après chaque changement
    updateAdminLinkVisibility();
  }, 50);
});

// Quand la page est chargée, on observe le conteneur principal pour détecter les changements
document.addEventListener("DOMContentLoaded", function () {
  const viewContainer = document.getElementById("view-container");
  if (viewContainer) {
    observateur.observe(viewContainer, { childList: true, subtree: true });
  }
});

