/*
 * Correctif
 */

function asc(a, b) {
  return a - b;
}

function dsc(a, b) {
  return b - a;
}

function tri(numbers, order) {
  if (order === "asc") {
    numbers.sort(asc);
  } else {
    numbers.sort(dsc);
  }
}

numbers = [5, 3, 2, 8, 1, 4];
tri(numbers, "asc");
console.log(numbers);
tri(numbers, "dsc");
console.log(numbers);
