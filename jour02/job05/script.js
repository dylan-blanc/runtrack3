document.addEventListener("DOMContentLoaded", function () {
  let bouton = document.getElementById("monBouton");

  bouton.addEventListener("click", function () {
    let message = document.getElementById("message");
    message.style.backgroundColor = "black";
    message.textContent = "Clic Clic Clic";
    message.style.color = "gold";
    message.style.fontSize = "3em";
  });
});
