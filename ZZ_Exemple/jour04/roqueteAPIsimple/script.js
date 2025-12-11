async function afficherUsers() {
  const reponse = await fetch("./users.json");
  const users = await reponse.json();

  return users;
}

async function filterUsers() {
  const users = await afficherUsers();

  const filter = users.filter((users) => users);
  console.log(filter);
  console.log(filter[0].nom);
  console.log(filter[0].email);
  console.log(filter[0].age);
  console.log(filter[0].telephone);

  filter[0].age = 40;
}

filterUsers();

// AFFICHER UN SEUL RESULTAT
// users.then((result) => console.log(result));

// AFFICHER PLUSIEURS RESULTATS via accolade
// users.then((result) => {
//   console.log("plusieurs resultats via l'accolade");
//   console.log(result);
// });

/*
 * * Sous format HTML, remettre la div dans le HTML
 */

// async function afficherUsers() {
//   const reponse = await fetch("./users.json");
//   const users = await reponse.json();
//   const usersList = document.getElementById("users-list");
//   usersList.innerHTML = ""; // Vide le conteneur

//   users.forEach((user) => {
//     const userDiv = document.createElement("div");
//     userDiv.innerHTML = `
//       <strong>${user.nom}</strong><br>
//       Email : ${user.email}<br>
//       Âge : ${user.age}<br>
//       Ville : ${user.ville}<br>
//       Téléphone : ${user.telephone}<br>
//       <hr>
//     `;
//     usersList.appendChild(userDiv);
//   });
// }
