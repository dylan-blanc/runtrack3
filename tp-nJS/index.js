require("dotenv").config();

console.log(process.env.PORT); // 3000

console.log("Hello Node.js !");

const version = process.version;
console.log("Version Node.js:", version);
