function keylogger(event) {
  const textarea = document.getElementById("keylogger");
  textarea.value += event.key;
}

window.addEventListener("keydown", keylogger);

const textarea = document.getElementById("keylogger");
textarea.addEventListener("keydown", keylogger);


let konamiIndex = 0;
function konamiCodeListener(callback) {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  
  window.addEventListener("keydown", function (event) {
    if (event.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        callback();

        document.body.style.backgroundImage =
          "linear-gradient(to bottom, #ffffff 0% 10%, #0062ff 10% 65%, #333333 65% 90%, #000000 95% 100%)";

        const konami = document.getElementById("konami");
        const keylogger = document.getElementById("keylogger");
        const button = document.getElementById("button");
        konami.style.display = "none";
        keylogger.style.display = "none";
        button.style.display = "none";
      }
    } else {
      konamiIndex = 0;
    }
  });
}

function clearLog() {
  const textarea = document.getElementById("keylogger");
  textarea.value = "";
  konamiIndex = 0;
}

konamiCodeListener(function () {
  alert("Konami Code activé !");
});

