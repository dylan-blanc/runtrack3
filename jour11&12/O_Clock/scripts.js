
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
    const ElementAlarmeHeure = document.getElementById("AlarmeHeure");
    if (ElementAlarmeHeure) {
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

let tempsEcoule = 0;
let intervalId = null;
let enMarche = false;
let tours = [];
function toggleChrono() {
if (enMarche) {
arreter();
} else {
demarrer();
}
}
function demarrer() {
enMarche = true;
intervalId = setInterval(function() {
tempsEcoule++;
afficherTemps(tempsEcoule);
}, 1000);
document.getElementById("btnMarcheArret").textContent = "Arrêter";
}
function arreter() {
enMarche = false;
clearInterval(intervalId);
document.getElementById("btnMarcheArret").textContent = "Démarrer";
}

function enregistrerTour() {
tours.push(tempsEcoule);
ajouterTour();
}




function afficherTemps() {
    const elementChrono = document.getElementById("AfficherChrono");
    if (elementChrono) {
        elementChrono.innerHTML = `${formatNumber(ChronoHeure)}:${formatNumber(ChronoMinutes)}:${formatNumber(ChronoSecondes)}:${formatNumber(ChronoMilliseconds)}`;
    }
}

document.getElementById("btnMarcheArret").addEventListener("click", function () {
    demarrerChrono();
});

document.getElementById("btnReset").addEventListener("click", function () {
    ChronoHeure = 0;
    ChronoMinutes = 0;
    ChronoSecondes = 0;
    ChronoMilliseconds = 0;
    clearInterval(ChronoInterval);
    ChronoInterval = null;
    updateChronoDisplay();
});



function ajouterTour() {
    const elementTours = document.getElementById("AfficherTour");
    if (elementTours) {
        const li = document.createElement("li");
        li.textContent = `Tour n° ${tours.length} : ${formatNumber(ChronoHeure)}:${formatNumber(ChronoMinutes)}:${formatNumber(ChronoSecondes)}:${formatNumber(ChronoMilliseconds)}`;
        elementTours.appendChild(li);
        NombreTour++;
    }
}

document.addEventListener("DOMContentLoaded", function () {
  toggleChrono();
});



// const heureFR = maintenant.toLocaleString("fr-FR", {
//     timezone: "Europe/Paris"
// });

// const intervalid = setInterval(function () {
//     console.log("tick");
// }, 1000);

