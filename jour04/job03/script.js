document.addEventListener("DOMContentLoaded", async () => {
  let pokemons = [];
  try {
    const res = await fetch("pokemon.json");
    pokemons = await res.json();
  } catch (e) {
    console.error("Erreur chargement pokémons:", e);
    return;
  }

  const types = [...new Set(pokemons.flatMap((p) => p.type))]; // combine tous les types (flatMap) et supprime les doublons (set)
  const select = document.getElementById("type");
  select.innerHTML =
    '<option value="">Tous les types</option>' +
    types.map((t) => `<option value="${t}">${t}</option>`).join(""); // ajout le contenu "type" JSON au select en version HTML

  // Filtrer et afficher
  document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const nom = document.getElementById("nom").value.toLowerCase(); // majuscule/minuscule ignorée
    const type = select.value; // valeur du type sélectionné

    const resultats = pokemons.filter(
      (p) =>
        (!id || p.id == id) &&
        (!nom || p.name.french.toLowerCase().includes(nom)) &&
        (!type || p.type.includes(type))
    );

    const resultatDiv = document.getElementById("resultat");
    if (resultats.length === 0) {
      resultatDiv.textContent = "Aucun Pokémon trouvé.";
    } else {
      resultatDiv.innerHTML =
        "<ul>" +
        resultats
          .map( // map pour parcourir chaque élément du tableau (resultats) et le transformer en STRING HTML
            (p) =>
              `<li>ID: ${p.id} - Nom: ${p.name.french} - Type: ${p.type.join(
                ", " // join pour afficher tous les types séparés par une virgule et en STRING plutôt que ARRAY
              )}</li>`
          )
          .join("") // join pour concaténer tous les éléments du tableau en une seule STRING
        +
        "</ul>";
    }
  });
});
