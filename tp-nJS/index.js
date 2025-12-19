require("dotenv").config();

console.log(process.env.PORT); // 3000

console.log("Hello Node.js !");

const version = process.version;
console.log("Version Node.js:", version);

const versionAll = process.versions;

console.log("Version", versionAll);
console.log("Plateforme:", process.platform);

console.log("=== TEST MATH ===");
// index.js
const nombres = [1, 2, 3, 4, 5, 9, 100];
// Somme
const somme = nombres.reduce((acc, n) => acc + n, 0);
console.log("Somme:", somme);

// Moyenne
const moyenne = somme / nombres.length;
console.log("Moyenne:", moyenne);

// Filtrer > 3
const plusDeTrois = nombres.filter((n) => n > 3);
console.log("Nombres > 3:", plusDeTrois);
