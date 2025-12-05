function toggleBWAT() {
  let BWAT = document.getElementById("bwat");

  if (BWAT.style.display === "none") {
    BWAT.style.display = "block";
    BWAT.style.color = "White";
    BWAT.style.backgroundColor = "Black";
  } else {
    BWAT.style.display = "none";
  }
}
