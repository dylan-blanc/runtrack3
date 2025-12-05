function bisextile(annee) {
  if ((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0) return true;
  else {
    return false;
  }
}

console.log(bisextile(2020)); // true
console.log(bisextile(1900)); // false


/*
* Version correction, autre maniere d'ecrire le true/false
*/

// function bisextile2(annee) {
//   let result = (annee % 4 === 0 && annee % 100 != 0) || annee % 400 === 0
//   ? `${annee} est une année bissextile`
//   : `${annee} n'est pas une année bissextile`;
//   console.log(result);
// }

// bisextile2(2000);

