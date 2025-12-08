function keylogger(event) {
  const textarea = document.getElementById("keylogger");
  textarea.value += event.key;
}

function clearLog() {
  const textarea = document.getElementById("keylogger");
  textarea.value = "";
}

window.addEventListener("keydown", keylogger);

const textarea = document.getElementById("keylogger");
textarea.addEventListener("keydown", keylogger);

/*
* ** Correctif

const keylogger = document.getElementById("keylogger");

if (keylogger) {
  function addText(e) {
    e.preventDefault(); // empêche le comportement par défaut et impose ce bloc de code

    console.log(document.activeElement.id); // vérifie quel élément est actif

    keylogger.value = document.activeElement.id // si l'élément actif est le keylogger
      ? keylogger.value + e.key + e.key //  double la saisie
      : keylogger.value + e.key; // sinon, la saisie une fois
  }
}
window.addEventListener("keypress", (e) => addText(e));


*/
