$(function () {
  const button = $("<button id='button'>clic clic</button>");
  $("body").prepend(button); // ajoute le bouton au debut du body

  const resultat = $('<div id="resultat" style="display:none;"></div>');
  $("body").prepend(resultat); // ajoute le div resultat au debut du body

  button.on("click", function () {
    Promise.all([fetch("expression.txt").then((x) => x.text())]).then(
      ([contenuDuTxt]) => {
        if ($("#resultat").is(":visible")) {
          $("#resultat").fadeOut(); // fait disparaître le div resultat et son contenu
        } else {
          $("#resultat").html(`
            <p>"${contenuDuTxt}"</p>
          `);

          $("#resultat").fadeIn(function () {
            // fait apparaître le div resultat et son contenu
          });
        }
      }
    );
  });
});
