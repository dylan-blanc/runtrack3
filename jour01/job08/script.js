/*
* Correctif
*/

function isPremier(n) {
  result = true;
  if (n == 0 || n == 1) {
    return false;
  }
  for (i = 2; i <= n - 1; i++) {
    if (n % i == 0) {
      result = false;
    }
  }
  return result;
}

function sommenombrespremiers(nb1, nb2) {
  if (isPremier(nb1) && isPremier(nb2)) {
    return nb1 + nb2;
  } else {
    return false;
  }
}

console.log(sommenombrespremiers(3, 5));
console.log(sommenombrespremiers(4, 5));
console.log(sommenombrespremiers(3, 6));
console.log(sommenombrespremiers(4, 6));
