
/*
* *********************** AFFICHER / CACHER *********************************
*/

function afficherSection(sectionId) {
    const sections = ["Horloge", "Reveil", "Chronometre", "Minuteur"];

    sections.forEach(function (id) {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = "none";
        }
    });

    const sectionCible = document.getElementById(sectionId);
    if (sectionCible) {
        sectionCible.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnHorloge").addEventListener("click", function () {
        afficherSection("Horloge");
    });

    document.getElementById("btnReveil").addEventListener("click", function () {
        afficherSection("Reveil");
    });

    document.getElementById("btnChronometre").addEventListener("click", function () {
        afficherSection("Chronometre");
    });

    document.getElementById("btnMinuteur").addEventListener("click", function () {
        afficherSection("Minuteur");
    });
});



/*
* ***********************************************************
*/


function formatNumber(num) {
    return num < 10 ? "0" + num : num;
}

function AfficherHeure() {
    const maintenant = new Date();

    const heures = maintenant.getHours();
    const minutes = maintenant.getMinutes();
    const secondes = maintenant.getSeconds();

    const heureFormatee = `${formatNumber(heures)}:${formatNumber(minutes)}:${formatNumber(secondes)}`;

    const ElementHorloge = document.getElementById("Horloge");
    if (ElementHorloge) {
        ElementHorloge.innerHTML = heureFormatee;
    }
    const ElementAllarmeHeure = document.getElementById("AllarmeHeure");
    if (ElementAllarmeHeure) {
        ElementAllarmeHeure.innerHTML = heureFormatee;
    }
}

function demarrerHorloge() {
    AfficherHeure();
    setInterval(AfficherHeure, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    demarrerHorloge();
});

/*
* ***********************************************************
*/




/*
* ***********************************************************
*/

let NombreTour = 1;
let ChronoInterval = null;
let ChronoHeure = 0;
let ChronoMinutes = 0;
let ChronoSecondes = 0;
let ChronoMilliseconds = 0;

function ajouterTour() {
    const elementTours = document.getElementById("AfficherTour");
    if (elementTours) {
        const li = document.createElement("li");
        li.textContent = `Tour n° ${NombreTour} : ${formatNumber(ChronoHeure)}:${formatNumber(ChronoMinutes)}:${formatNumber(ChronoSecondes)}:${formatNumber(ChronoMilliseconds)}`;
        elementTours.appendChild(li);
        NombreTour++;
    }
}



// const heureFR = maintenant.toLocaleString("fr-FR", {
//     timezone: "Europe/Paris"
// });

// const intervalid = setInterval(function () {
//     console.log("tick");
// }, 1000);

