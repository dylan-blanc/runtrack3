function citation() {
  const citationText = document.getElementById("citation").textContent;
  console.log(citationText);
}

document.getElementById("button").addEventListener("click", citation);
