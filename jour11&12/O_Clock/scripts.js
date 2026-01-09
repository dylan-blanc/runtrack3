
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
    const inputTime = document.querySelector("#Reveil input[type='time']");
    const inputText = document.querySelector("#Reveil input[type='text']");
    const ul = document.getElementById("AfficherAlarme");

    const heureAlarme = inputTime.value;
    const messageAlarme = inputText.value;

    if (heureAlarme) {
        // Stocker l'heure et le message séparément
        const alarmeObj = {
            heure: heureAlarme,
            message: messageAlarme,
            declenchee: false
        };
        Alarme.push(alarmeObj);

        // Afficher uniquement l'heure (sans le message)
        const li = document.createElement("li");
        li.textContent = `Alarme n°${Alarme.length} ${heureAlarme}`;
        ul.appendChild(li);

        // Réinitialiser les inputs
        inputTime.value = "";
        inputText.value = "";
    }
}

function verifierAlarmes() {
    const maintenant = new Date();
    const heureActuelle = `${formatNumber(maintenant.getHours())}:${formatNumber(maintenant.getMinutes())}`;

    Alarme.forEach((alarme, index) => {
        if (!alarme.declenchee && alarme.heure === heureActuelle) {
            alarme.declenchee = true;
            if (alarme.message) {
                alert(`🔔 Alarme n°${index + 1} : ${alarme.message}`);
            } else {
                alert(`🔔 Alarme n°${index + 1} !`);
            }
        }
    });
}

// Lancer la vérification des alarmes toutes les secondes
setInterval(verifierAlarmes, 1000);

document.getElementById("btnAjouterAlarme").addEventListener("click", ajouterAlarme);


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


/*
* ************************* Minuteur ***********************************
*/

// Variables du minuteur
let minuteurSecondes = 0;       // Temps total en secondes
let minuteurIntervalId = null;  // ID de l'intervalle
let minuteurEnMarche = false;   // État du minuteur

// Afficher le temps du minuteur au format HH:MM:SS
function afficherMinuteur() {
    const heures = Math.floor(minuteurSecondes / 3600);
    const minutes = Math.floor((minuteurSecondes % 3600) / 60);
    const secondes = minuteurSecondes % 60;

    const elementMinuteur = document.getElementById("AfficherMinuteur");
    if (elementMinuteur) {
        elementMinuteur.innerHTML = `${formatNumber(heures)}:${formatNumber(minutes)}:${formatNumber(secondes)}`;
    }
}

// Mettre à jour l'affichage quand l'utilisateur entre un temps dans les inputs
function mettreAJourDepuisInput() {
    const inputMinutes = document.getElementById("MinuteurMinutes");
    const inputSecondes = document.getElementById("MinuteurSecondes");

    const minutes = parseInt(inputMinutes.value) || 0;
    const secondes = parseInt(inputSecondes.value) || 0;

    minuteurSecondes = (minutes * 60) + secondes;
    afficherMinuteur();
}

// Démarrer le décompte du minuteur
function demarrerMinuteur() {
    if (minuteurSecondes <= 0) return; // Ne pas démarrer si temps à 0

    minuteurEnMarche = true;
    const btnMinuteur = document.getElementById("btnMinuteurMarcheArret");
    btnMinuteur.innerHTML = '<i class="fa-solid fa-rotate"></i>Réinitialiser';

    minuteurIntervalId = setInterval(function () {
        minuteurSecondes--;
        afficherMinuteur();

        if (minuteurSecondes <= 0) {
            arreterMinuteur();
            alert("Temps épuisé");
        }
    }, 1000);
}

// Arrêter le minuteur
function arreterMinuteur() {
    minuteurEnMarche = false;
    clearInterval(minuteurIntervalId);
    minuteurIntervalId = null;
}

// Réinitialiser le minuteur
function reinitialiserMinuteur() {
    arreterMinuteur();
    minuteurSecondes = 0;
    afficherMinuteur();
    document.getElementById("MinuteurMinutes").value = "";
    document.getElementById("MinuteurSecondes").value = "";

    const btnMinuteur = document.getElementById("btnMinuteurMarcheArret");
    btnMinuteur.innerHTML = '<i class="fa-solid fa-play"></i>Demarrer';
}

// Ajouter 1 minute au minuteur
function incrementerMinuteur() {
    minuteurSecondes += 60;
    afficherMinuteur();
}

// Retirer 1 minute du minuteur (minimum 0)
function decrementerMinuteur() {
    minuteurSecondes = Math.max(0, minuteurSecondes - 60);
    afficherMinuteur();
}

// Événements du minuteur
document.getElementById("MinuteurMinutes").addEventListener("input", mettreAJourDepuisInput);
document.getElementById("MinuteurSecondes").addEventListener("input", mettreAJourDepuisInput);

document.getElementById("btnFlecheHaut").addEventListener("click", incrementerMinuteur);

document.getElementById("btnFlecheBas").addEventListener("click", decrementerMinuteur);

document.getElementById("btnMinuteurMarcheArret").addEventListener("click", function () {
    if (minuteurEnMarche) {
        reinitialiserMinuteur();
    } else {
        demarrerMinuteur();
    }
});



// const heureFR = maintenant.toLocaleString("fr-FR", {
//     timezone: "Europe/Paris"
// });

