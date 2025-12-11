document.getElementById("button").addEventListener("click", function () {
  fetch("users.php")
    .then((Response) => Response.json())
    .then((data) => {
      const tbody = document.getElementById("table");
      tbody.innerHTML = ""; // vide le contenu du tableau
      data.forEach((users) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${users.id}</td>
                    <td>${users.nom}</td>
                    <td>${users.prenom}</td>
                    <td>${users.email}</td>
                `;
        tbody.appendChild(tr);
      });
    });
});


/*
* ** version 2 **
*/

function createRow(user) {
  const tr = document.createElement("tr"); // creation d'une ligne du tableau
  tr.innerHTML = `
    <td>${user.id}</td>
    <td>${user.nom}</td>
    <td>${user.prenom}</td>
    <td>${user.email}</td>
  `;
  return tr; // fermeture d'une ligne du tableau, avec les données insérées
}

document.getElementById("button").addEventListener("click", function () {
  fetch("users.php")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("table");
      tbody.innerHTML = ""; // vide le tableau
      data.forEach((user) => tbody.appendChild(createRow(user)));
    });
});
