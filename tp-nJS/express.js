const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1> Hello Express.js !</h1>");
});

app.get("/signin", (req, res) => {
  const signIn = `
    <form method="post">
    <input type="text" placeholder="Votre identifiant" name="username">
    <button type="submit">Se Connecter</button>
  </form>`;
  res.send(signIn);
});

app.post("/signin", (req, res) => {
  console.log(req.body);
  res.send(`Bienvenue ${req.body.username}`);
});

app.get("/profil/:userName", (req, res) => {
  console.log(req);
  res.send(`<h1> Bonsoir ${req.params.userName}</h1>`);
});

app.get("/users", (req, res) => {
  const users = [
    {
      userName: "alice",
      age: 25,
    },
    {
      userName: "bob",
      age: 30,
    },
    {
      userName: "charlie",
      age: 35,
    },
  ];
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
