// async function afficherUsers() {
//   const reponse = await fetch("./users.json");
//   const users = await reponse.json();
//   console.log(users);
// }

async function afficherUsers() {
  const reponse = await fetch("./users.json");
  const users = await reponse.json();
  const usersList = document.getElementById("users-list");
  usersList.innerHTML = ""; // Vide le conteneur

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
      <strong>${user.nom}</strong><br>
      Email : ${user.email}<br>
      Âge : ${user.age}<br>
      Ville : ${user.ville}<br>
      Téléphone : ${user.telephone}<br>
      <hr>
    `;
    usersList.appendChild(userDiv);
  });
}

afficherUsers();
