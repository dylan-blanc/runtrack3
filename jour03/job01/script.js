$(function () {
  const button = $("<button>FadeIn/FadeOut</button>");
  $("body").prepend(button); // ajoute le bouton au début du body

  const resultat = $('<div id="resultat" style="display:none;"></div>');
  $("body").prepend(resultat); // ajoute le div resultat au début du body

  /*
  * * prepend au lieu de append
  * * Evite que l'element HTML aparait AVANT les scripts.js et Jquery.js
  */

  const texte =
    "Les logiciels et les cathédrales, c'est un peu la même chose - d'abord on les construit, ensuite on prie.";

  const deleteButton = $("<button>Supprimer le HTML</button>");

  button.on("click", function () {
    if ($("#resultat").is(":visible")) {
      $("#resultat").fadeOut(); // fait disparaître le div resultat et son contenu
      deleteButton.detach(); // retire le bouton Supprimer si visible
    } else {
      $("#resultat").html(`
        <section>
        citation :
        <article>
        <p>"${texte}"</p>
        </article>
        </section>
      `);

      $("#resultat").fadeIn(function () {
        // fait apparaître le div resultat et son contenu
        if ($("#resultat").css("opacity") === "1") { // si l'opacité est à 1 (visible) :
          $("body").append(deleteButton); // ajoute le bouton Supprimer à la fin du body
        }
      });
    }
  });

  deleteButton.on("click", function () {
    document.querySelector("html").remove();
  });
});
