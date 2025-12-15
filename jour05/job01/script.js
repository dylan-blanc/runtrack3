// function loadView(view) {
//   fetch(view)
//     .then((response) => response.text())
//     .then((html) => {
//       document.getElementById("view-container").innerHTML = html;
//     });
// }

/*
 * ** bloc en haut, OU, le bloc en bas
 */

// function loadView(view) {
//   fetch(view + ".php")
//     .then((response) => response.text())
//     .then((html) => {
//       document.getElementById("main-content").innerHTML = html;
//     });
// }

/*
 * ** include le loadview
 */

// Détecte le paramètre ?page= dans l’URL

// const params = new URLSearchParams(window.location.search);
// const page = params.get("page") || "index.php";
// loadView(page);

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

/*
 * ************************* SERT A DEBUG, VERIFIE LE FOCUS SUR CHAQUE ELEMENT***********************************
 */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a[data-view]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const view = link.getAttribute("data-view");
      loadView(view);
      // Ajout du console.log de l'événement HTML
      link.blur(); // Retire le focus du lien après le clic
      console.log(e);
    });
  });
});

document.addEventListener("focusin", function (e) {
  console.log(
    "Focus sur l'élément :",
    e.target,
    "Type :",
    e.target.tagName,
    "ID :",
    e.target.id || "(aucun id)",
    "Classes :",
    e.target.className || "(aucune classe)"
  );
});

// Log quand le focus quitte tous les éléments interactifs (retour au fond HTML)
document.addEventListener("focusout", function (e) {
  // Si le focus va  sur body/html
  if (
    !e.relatedTarget ||
    e.relatedTarget === document.body ||
    e.relatedTarget === document.documentElement
  ) {
    console.log("Aucun élément n'a le focus (focus sur le body HTML).");
  }
});

/*
 * ************************ SEPARATION ****************************************************************************************************************
 */

// ======================== VALIDATION DES FORMULAIRES ========================

// Définition des expressions régulières (REGEX) pour valider les champs du formulaire
// Une expression régulière permet de vérifier si une chaîne de caractères respecte un certain format
const REGEX = {
  // Autorise les lettres (majuscules/minuscules), accents, espaces et tirets
  nomPrenom: /^[A-Za-zÀ-ÿ\s\-]+$/,
  // Format d'email classique (ex: exemple@mail.com)
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // Mot de passe : 8 à 30 caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{8,30}$/,
  // Adresse : lettres, chiffres, espaces, tirets
  adresse: /^[A-Za-zÀ-ÿ0-9\s\-]+$/,
  // Code postal : uniquement des chiffres
  codePostal: /^[0-9]+$/,
};

// Expressions régulières pour filtrer les caractères non autorisés à la saisie (empêche l'utilisateur de taper des caractères invalides)
const REGEX_INPUT = {
  nomPrenom: /[^A-Za-zÀ-ÿ\s\-]/g, // tout sauf lettres, accents, espaces, tirets
  adresse: /[^A-Za-zÀ-ÿ0-9\s\-]/g, // tout sauf lettres, chiffres, espaces, tirets
  codePostal: /[^0-9]/g, // tout sauf chiffres
};

// Messages d'erreur personnalisés pour chaque champ
const MESSAGES = {
  nom: "Minimum 2 lettres, maximum 20. Chiffres non autorisés.",
  prenom: "Minimum 2 lettres, maximum 20. Chiffres non autorisés.",
  email: "Merci d'entrer une email valide.",
  password:
    "8-30 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial.",
  passwordConfirm: "Les mots de passe ne correspondent pas.",
  adresse: "Merci d'entrer une adresse valide (lettres, chiffres, tirets).",
  codePostal: "Merci d'entrer un code postal valide (5 chiffres).",
};


// Affiche un message d'erreur sous le champ concerné et change la couleur du champ
// errorId : id de la balise <span> où afficher l'erreur
// message : texte à afficher
// input : champ de saisie à colorer (rouge si erreur, vert si valide)
function afficherErreur(errorId, message, input) {
  const errorSpan = document.getElementById(errorId); // Récupère la balise d'erreur
  if (errorSpan) errorSpan.textContent = message; // Affiche le message
  if (input) {
    // Ajoute ou retire les classes CSS selon la validité
    input.classList.toggle("input-error", !!message); // Rouge si erreur
    input.classList.toggle("input-valid", !message); // Vert si valide
  }
}


// Fonction générique pour valider un champ de formulaire
// input : champ à valider
// errorId : id du <span> pour afficher l'erreur
// options : regex (format), min/max (longueur), message (erreur)
function validerChamp(
  input,
  errorId,
  { regex, min = 0, max = Infinity, message }
) {
  const valeur = input.value.trim(); // On enlève les espaces au début/fin
  // Vérifie la longueur et le format
  if (
    valeur.length < min ||
    valeur.length > max ||
    (regex && !regex.test(valeur))
  ) {
    afficherErreur(errorId, message, input); // Affiche l'erreur
    return false;
  }
  afficherErreur(errorId, "", input); // Pas d'erreur
  return true;
}


// Valide le mot de passe selon les règles définies dans REGEX.password
function validerPassword(input, errorId) {
  return validerChamp(input, errorId, {
    regex: REGEX.password,
    min: 8,
    max: 30,
    message: MESSAGES.password,
  });
}


// Vérifie que la confirmation du mot de passe correspond bien au mot de passe
function validerPasswordConfirm(inputPassword, inputConfirm, errorId) {
  if (inputPassword.value !== inputConfirm.value || inputConfirm.value === "") {
    afficherErreur(errorId, MESSAGES.passwordConfirm, inputConfirm);
    return false;
  }
  afficherErreur(errorId, "", inputConfirm);
  return true;
}


// Empêche l'utilisateur de saisir des caractères non autorisés dans un champ
// Par exemple, interdit les chiffres dans le nom/prénom
function filtrerSaisie(input, regexFiltre) {
  input.addEventListener("input", function () {
    this.value = this.value.replace(regexFiltre, ""); // Remplace les caractères interdits par rien
  });
}


// Initialise la validation du formulaire d'inscription
// Ajoute les filtres de saisie et les vérifications à chaque champ
function initValidationInscription() {
  // On récupère chaque champ du formulaire par son id
  const nom = document.getElementById("Inscription-Nom");
  const prenom = document.getElementById("Inscription-Prenom");
  const email = document.getElementById("inscription-Email");
  const password = document.getElementById("inscription-Password");
  const passwordConfirm = document.getElementById("inscription-Password-confirm");
  const adresse = document.getElementById("inscription-Adresse");
  const codePostal = document.getElementById("inscription-Postal");
  const form = document.getElementById("form-inscription");
  if (!nom) return; // Si le formulaire n'est pas présent, on arrête

  // Empêche la saisie de caractères interdits dans chaque champ
  filtrerSaisie(nom, REGEX_INPUT.nomPrenom);
  filtrerSaisie(prenom, REGEX_INPUT.nomPrenom);
  filtrerSaisie(adresse, REGEX_INPUT.adresse);
  filtrerSaisie(codePostal, REGEX_INPUT.codePostal);

  // Ajoute la validation au moment où l'utilisateur quitte le champ (blur)
  nom.addEventListener("blur", function () {
    validerChamp(this, "error-nom", {
      regex: REGEX.nomPrenom,
      min: 2,
      max: 20,
      message: MESSAGES.nom,
    });
  });
  prenom.addEventListener("blur", function () {
    validerChamp(this, "error-prenom", {
      regex: REGEX.nomPrenom,
      min: 2,
      max: 20,
      message: MESSAGES.prenom,
    });
  });
  email.addEventListener("blur", function () {
    validerChamp(this, "error-email-inscription", {
      regex: REGEX.email,
      message: MESSAGES.email,
    });
  });
  password.addEventListener("blur", function () {
    validerPassword(this, "error-password-inscription");
  });
  passwordConfirm.addEventListener("blur", function () {
    validerPasswordConfirm(password, this, "error-password-confirm");
  });
  adresse.addEventListener("blur", function () {
    validerChamp(this, "error-adresse", {
      regex: REGEX.adresse,
      min: 5,
      message: MESSAGES.adresse,
    });
  });
  codePostal.addEventListener("blur", function () {
    validerChamp(this, "error-postal", {
      regex: REGEX.codePostal,
      min: 5,
      max: 5,
      message: MESSAGES.codePostal,
    });
  });

  // Quand on soumet le formulaire, on vérifie tous les champs
  form.addEventListener("submit", function (e) {
    // On stocke le résultat de chaque validation dans un tableau
    const champs = [
      validerChamp(nom, "error-nom", {
        regex: REGEX.nomPrenom,
        min: 2,
        max: 20,
        message: MESSAGES.nom,
      }),
      validerChamp(prenom, "error-prenom", {
        regex: REGEX.nomPrenom,
        min: 2,
        max: 20,
        message: MESSAGES.prenom,
      }),
      validerChamp(email, "error-email-inscription", {
        regex: REGEX.email,
        message: MESSAGES.email,
      }),
      validerPassword(password, "error-password-inscription"),
      validerPasswordConfirm(
        password,
        passwordConfirm,
        "error-password-confirm"
      ),
      validerChamp(adresse, "error-adresse", {
        regex: REGEX.adresse,
        min: 5,
        message: MESSAGES.adresse,
      }),
      validerChamp(codePostal, "error-postal", {
        regex: REGEX.codePostal,
        min: 5,
        max: 5,
        message: MESSAGES.codePostal,
      }),
    ];
    // Si au moins une validation échoue, on empêche l'envoi du formulaire
    if (champs.includes(false)) {
      e.preventDefault();
      console.log("Formulaire inscription invalide");
    }
  });
}


// Initialise la validation du formulaire de connexion
function initValidationConnexion() {
  // On récupère les champs email et mot de passe
  const email = document.getElementById("connexion-Email");
  const password = document.getElementById("connexion-Password");
  const form = document.getElementById("form-connexion");
  if (!email) return; // Si le formulaire n'est pas présent, on arrête

  // Ajoute la validation au moment où l'utilisateur quitte le champ
  email.addEventListener("blur", function () {
    validerChamp(this, "error-email-connexion", {
      regex: REGEX.email,
      message: MESSAGES.email,
    });
  });
  password.addEventListener("blur", function () {
    validerPassword(this, "error-password-connexion");
  });

  // Quand on soumet le formulaire, on vérifie les deux champs
  form.addEventListener("submit", function (e) {
    const champs = [
      validerChamp(email, "error-email-connexion", {
        regex: REGEX.email,
        message: MESSAGES.email,
      }),
      validerPassword(password, "error-password-connexion"),
    ];
    // Si une validation échoue, on empêche l'envoi
    if (champs.includes(false)) {
      e.preventDefault();
      console.log("Formulaire connexion invalide");
    }
  });
}


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
