<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Job01</title>
  </head>

  <body>
    <header>
      <nav class="">
        <div class="">
          <div class="" id="">
            <ul class="">
              <li class="">
                <a class="" href="index.php">Accueil</a>
              </li>
              <li class="">
                <a class="" href="index.php">Inscription</a>
              </li>
              <li class="">
                <a class="" href="index.php">Connexion</a>
              </li>
              <li class="">
                <a class="" href="index.php">Rechercher</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <section>
      <h2>Créer un compte</h2>
      <form action="index.php" method="post">
        <fieldset>
          <legend>Civilité</legend>
          <label>
            <input type="radio" name="civilite" value="Homme" required />
            Homme
          </label>
          <label>
            <input type="radio" name="civilite" value="Femme" required />
            Femme
          </label>
        </fieldset>
        <label for="prenom">Prénom :</label><br />
        <input type="text" id="prenom" name="prenom" required /><br />
        <label for="nom">Nom :</label><br />
        <input type="text" id="nom" name="nom" required /><br />
        <label for="adresse">Adresse :</label><br />
        <input type="text" id="adresse" name="adresse" required /><br />
        <label for="email">Email :</label><br />
        <input type="email" id="email" name="email" required /><br />
        <label for="password">Mot de passe :</label><br />
        <input type="password" id="password" name="password" required /><br />
        <label for="password2">Confirmer le mot de passe :</label><br />
        <input type="password" id="password2" name="password2" required /><br />
        <fieldset>
          <legend>Passions</legend>
          <label>
            <input type="checkbox" name="passions[]" value="informatique" />
            Informatique
          </label>
          <label>
            <input type="checkbox" name="passions[]" value="voyages" />
            Voyages
          </label>
          <label>
            <input type="checkbox" name="passions[]" value="sport" />
            Sport
          </label>
          <label>
            <input type="checkbox" name="passions[]" value="lecture" />
            Lecture
          </label>
        </fieldset>
        <br />
        <input type="submit" value="Créer le compte" />
      </form>
    </section>

    <footer>
      <ul class="">
        <li class="">
          <a class="" href="index.php">Accueil</a>
        </li>
        <li class="">
          <a class="" href="index.php">Inscription</a>
        </li>
        <li class="">
          <a class="" href="index.php">Connexion</a>
        </li>
        <li class="">
          <a class="" href="index.php">Rechercher</a>
        </li>
      </ul>
    </footer>

    <script src="./script.js"></script>
  </body>
</html>
