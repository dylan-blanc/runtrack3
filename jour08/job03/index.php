<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Job03</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss"> @theme {
        --color-clifford: #da373d;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    </style>
</head>

<body>
    <header>
        <nav class="">
            <div class="">
                <div class="" id="">
                    <nav class="bg-red-900">
                        <ul class="flex flex-row justify-center p-1 space-x-1 gap-3 text-green-600">
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
                    </nav>
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

    <footer class="fixed bottom-0 left-0 w-full text-white">
        <nav class="bg-red-900">
            <ul class="flex flex-row justify-center p-1 space-x-1 gap-3">
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
        </nav>
    </footer>

    <script src="./script.js"></script>
</body>

</html>