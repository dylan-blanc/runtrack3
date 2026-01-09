const seconds = document.querySelector(".seconds");
const minutes = document.querySelector(".minutes");
const minute = document.querySelector(".minute");
const hour = document.querySelector(".hour");

// Mode actuel de l'horloge: 'horloge', 'reveil', 'chronometre', 'minuteur'
let modeHorloge = 'horloge';

// Élément pour l'icône réveil et l'input time
let alarmIcon = null;
let alarmInputContainer = null;

// Create spikes
for (let s = 0; s < 60; s++) {
  let mSpikeEl = document.createElement("i");
  let sSpikeEl = document.createElement("i");
  mSpikeEl.className = "spike";
  sSpikeEl.className = "spike";
  mSpikeEl.style = `--rotate:${6 * s}deg`;
  sSpikeEl.style = `--rotate:${6 * s}deg`;
  mSpikeEl.setAttribute("data-i", s);
  sSpikeEl.setAttribute("data-i", s);

  seconds.append(sSpikeEl);
  minutes.append(mSpikeEl);
}

// Créer l'icône de réveil
function createAlarmIcon() {
  if (!alarmIcon) {
    alarmIcon = document.createElement("div");
    alarmIcon.className = "alarm-icon";
    alarmIcon.innerHTML = '<i class="fa-solid fa-bell" style="font-size: 24px; cursor: pointer; margin-top: 0px;"></i>';
    alarmIcon.style.cssText = "position: absolute; left: 50%; transform: translateX(-50%); top: calc(50% + 50px); z-index: 2000; color: #000000ff;";
    alarmIcon.style.display = "none";

    // Container pour l'input time
    alarmInputContainer = document.createElement("div");
    alarmInputContainer.className = "alarm-input-container";
    alarmInputContainer.innerHTML = '<input type="time" id="clockAlarmInput" style="margin-top: 20px; padding: 5px; border-radius: 5px;">';
    alarmInputContainer.style.cssText = "position: absolute; left: 50%; transform: translateX(-50%); top: calc(50% + 85px); z-index: 20; display: none;";

    const clock = document.querySelector(".clock");
    clock.appendChild(alarmIcon);
    clock.appendChild(alarmInputContainer);

    // Toggle input quand on clique sur l'icône
    alarmIcon.addEventListener("click", function () {
      if (alarmInputContainer.style.display === "none") {
        alarmInputContainer.style.display = "block";
      } else {
        alarmInputContainer.style.display = "none";
      }
    });

    // Écouteur pour la touche "Entrée" sur clockAlarmInput
    const clockAlarmInput = document.getElementById("clockAlarmInput");
    clockAlarmInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (typeof ajouterAlarme === "function") {
          ajouterAlarme("clockAlarmInput");
        }
      }
    });
  }
}

function getTime() {
  let date = new Date();
  let s, m, h;

  if (modeHorloge === 'horloge' || modeHorloge === 'reveil') {
    // Mode horloge ou réveil: afficher l'heure locale
    s = date.getSeconds();
    m = date.getMinutes();
    h = date.getHours();

  } else if (modeHorloge === 'chronometre') {
    // Mode chronomètre: récupérer les données de scripts.js
    if (typeof tempsEcoule !== 'undefined') {
      const totalSecondes = Math.floor(tempsEcoule / 1000);
      h = Math.floor(totalSecondes / 3600);
      m = Math.floor((totalSecondes % 3600) / 60);
      s = totalSecondes % 60;
    } else {
      s = 0; m = 0; h = 0;
    }

  } else if (modeHorloge === 'minuteur') {
    // Mode minuteur: récupérer les données de scripts.js
    if (typeof minuteurSecondes !== 'undefined') {
      h = Math.floor(minuteurSecondes / 3600);
      m = Math.floor((minuteurSecondes % 3600) / 60);
      s = minuteurSecondes % 60;
    } else {
      s = 0; m = 0; h = 0;
    }
  }

  hour.textContent = h;
  minute.textContent = m;

  minutes.style = `--dRotate:${6 * m}deg`;

  if (s == 0) {
    seconds.classList.add("stop-anim");
  } else {
    seconds.classList.remove("stop-anim");
  }
  if (m == 0) {
    minutes.classList.add("stop-anim");
  } else {
    minutes.classList.remove("stop-anim");
  }

  seconds.style = `--dRotate:${6 * s}deg`;

  // Afficher/cacher l'icône réveil selon le mode
  if (alarmIcon) {
    alarmIcon.style.display = (modeHorloge === 'reveil') ? "block" : "none";
    if (modeHorloge !== 'reveil' && alarmInputContainer) {
      alarmInputContainer.style.display = "none";
    }
  }
}

// Initialiser l'icône réveil
document.addEventListener("DOMContentLoaded", function () {
  createAlarmIcon();

  // Écouter les clics sur les boutons de navigation
  document.getElementById("btnHorloge").addEventListener("click", function () {
    modeHorloge = 'horloge';
  });

  document.getElementById("btnReveil").addEventListener("click", function () {
    modeHorloge = 'reveil';
  });

  document.getElementById("btnChronometre").addEventListener("click", function () {
    modeHorloge = 'chronometre';
  });

  document.getElementById("btnMinuteur").addEventListener("click", function () {
    modeHorloge = 'minuteur';
  });
});

setInterval(getTime, 100); // Intervalle plus rapide pour le chrono
getTime();


/*
* ************ Integration avec scripts.js ************
*/

