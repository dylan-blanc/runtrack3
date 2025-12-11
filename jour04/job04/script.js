function createRow(user) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${user.id}</td>
    <td>${user.nom}</td>
    <td>${user.prenom}</td>
    <td>${user.email}</td>
  `;
  return tr;
}

document.getElementById("button").addEventListener("click", function () {
  fetch("users.php")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("table");
      tbody.innerHTML = "";
      data.forEach((user) => tbody.appendChild(createRow(user)));
    });
});
