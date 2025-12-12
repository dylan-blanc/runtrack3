function loadView(view) {
  fetch(view + ".php")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("main-content").innerHTML = html;
    });
}

// Détecte le paramètre ?page= dans l’URL
const params = new URLSearchParams(window.location.search);
const page = params.get("page") || "index";
loadView(page);
