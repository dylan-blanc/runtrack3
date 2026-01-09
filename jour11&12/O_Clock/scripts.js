
/*
* *********************** AFFICHER / CACHER Element HTML *********************************
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
* ************************ Horloge et formatage affichage ***********************************
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
        ElementAlarmeHeure.innerHTML = heureFormatee;
    }
}

function demarrerHorloge() {
    AfficherHeure();
    setInterval(AfficherHeure, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    demarrerHorloge();
    afficherTemps();
});

/*
* **************************** REVEIL *************************************
*/
let Alarme = [];

function ajouterAlarme() {
    const inputs = document.querySelectorAll("#Reveil input");
    const ul = document.getElementById("AfficherAlarme");

    // Récupérer les valeurs de tous les inputs
    let valeurs = [];
    inputs.forEach(input => {
        if (input.value) valeurs.push(input.value);
    });

    if (valeurs.length > 0) {
        const alarmeTexte = valeurs.join(" - ");
        Alarme.push(alarmeTexte);
        const li = document.createElement("li");
        li.textContent = `Alarme n° ${Alarme.length} : ${alarmeTexte}`;
        ul.appendChild(li);

        // Réinitialiser tous les inputs
        inputs.forEach(input => input.value = "");
    }
}

function initFormatageTempsReel() {
    const inputText = document.querySelector("#Reveil input[type='text']");
    if (inputText) {
        inputText.placeholder = "HH:MM";
        inputText.maxLength = 5; // "HH:MM" = 5 caractères

        inputText.addEventListener("input", function (e) {
            // Garder uniquement les chiffres
            let chiffres = this.value.replace(/\D/g, "");

            // Limiter à 4 chiffres max
            chiffres = chiffres.substring(0, 4);

            // Formater en HH:MM
            if (chiffres.length > 2) {
                this.value = chiffres.substring(0, 2) + ":" + chiffres.substring(2);
            } else {
                this.value = chiffres;
            }
        });
    }
}

document.getElementById("btnAjouterAlarme").addEventListener("click", ajouterAlarme);

document.addEventListener("DOMContentLoaded", function () {
    initFormatageTempsReel();
});

/*
* ************************* Chronometre ***********************************
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
    intervalId = setInterval(function () {
        tempsEcoule += 10; // Ajoute 10ms à chaque tick
        afficherTemps();
    }, 10); // Intervalle de 10ms pour les centièmes
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
    const totalSecondes = Math.floor(tempsEcoule / 1000);
    const heures = Math.floor(totalSecondes / 3600);
    const minutes = Math.floor((totalSecondes % 3600) / 60);
    const secondes = totalSecondes % 60;
    const millisecondes = Math.floor((tempsEcoule % 1000) / 10); // Centièmes de seconde

    const elementChrono = document.getElementById("AfficherChrono");
    if (elementChrono) {
        elementChrono.innerHTML = `${formatNumber(heures)}:${formatNumber(minutes)}:${formatNumber(secondes)}:${formatNumber(millisecondes)}`;
    }
}

document.getElementById("btnReset").addEventListener("click", function () {
    tempsEcoule = 0;
    enMarche = false;
    clearInterval(intervalId);
    intervalId = null;
    afficherTemps();
    document.getElementById("btnMarcheArret").textContent = "Démarrer";
    tours = [];
    const elementTours = document.getElementById("AfficherTour");
    if (elementTours) {
        elementTours.innerHTML = "";
    }
});


function ajouterTour() {
    const totalSecondes = Math.floor(tempsEcoule / 1000);
    const heures = Math.floor(totalSecondes / 3600);
    const minutes = Math.floor((totalSecondes % 3600) / 60);
    const secondes = totalSecondes % 60;
    const millisecondes = Math.floor((tempsEcoule % 1000) / 10);

    const elementTours = document.getElementById("AfficherTour");
    if (elementTours) {
        const li = document.createElement("li");
        li.textContent = `Tour n° ${tours.length} : ${formatNumber(heures)}:${formatNumber(minutes)}:${formatNumber(secondes)}:${formatNumber(millisecondes)}`;
        elementTours.appendChild(li);
    }
}

document.getElementById("btnTour").addEventListener("click", function () {
    enregistrerTour();
});

document.getElementById("btnMarcheArret").addEventListener("click", function () {
    toggleChrono();
});







// const heureFR = maintenant.toLocaleString("fr-FR", {
//     timezone: "Europe/Paris"
// });

// const intervalid = setInterval(function () {
//     console.log("tick");
// }, 1000);

