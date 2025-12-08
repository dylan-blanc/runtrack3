let lastknown_scroll_position = 0;
let ticking = false;

function changefootercolor(scroll_pos) {
  const footer = document.querySelector("footer");

  footer.style.backgroundImage = "";
  footer.style.borderTop = "";

  if (scroll_pos <= 500) {
    footer.style.backgroundColor = "navy";
  } else if (scroll_pos > 500 && scroll_pos <= 1000) {
    footer.style.backgroundColor = "initial";
  } else if (scroll_pos > 1000 && scroll_pos <= 1500) {
    footer.style.backgroundColor = "darkred";
  } else if (scroll_pos > 1500 && scroll_pos <= 2000) {
    footer.style.backgroundColor = "green";
  } else if (scroll_pos > 2000 && scroll_pos <= 2500) {
    footer.style.backgroundColor = "gold";
  } else if (scroll_pos > 2500 && scroll_pos <= 4500) {
    footer.style.backgroundImage =
      "linear-gradient(to right, navy 0% 33%, white 33% 66%, darkred 66% 100%)";
    footer.style.borderTop = "1px solid black";
    footer.style.backgroundColor = "initial";
  } else {
    footer.style.backgroundColor = "initial";
  }
}

function onScroll() {
  lastknown_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      changefootercolor(lastknown_scroll_position);
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", onScroll);
