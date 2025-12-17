<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Job04</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
        @theme {
        --color-clifford: #da373d;
    }
    label {
        @apply  bg-clifford align-middle text-white p-1 rounded-md;
    }

    input {
        @apply bg-gray-200;
    }

    @layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
  }
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

    <section class="flex items-center justify-center">
        <form class="w-[350px] shadow-xl/20 flex flex-col items-center bg-white p-8 rounded-lg" action="index.php" method="post">
            <h1 class="text-center w-full mb-4 scale-150">Créer un compte</h1>

            <div class="w-full flex flex-col items-center pb-4">
                <legend class="text-center mb-2">Civilité</legend>
                <div class="flex flex-row gap-10">
                    <label class="flex items-center gap-2">
                        <input type="radio" name="civilite" value="Homme" required />
                        Homme
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="radio" name="civilite" value="Femme" required />
                        Femme
                    </label>
                </div>
            </div>
            <div class=" flex flex-col rounded-lg">
                <label for="prenom" class="">Prénom :</label>
                <input type="text" id="prenom" name="prenom" required class="rounded p-1" />
                <label for="nom" class="">Nom :</label>
                <input type="text" id="nom" name="nom" required class="rounded p-1" />
                <label for="adresse" class="">Adresse :</label>
                <input type="text" id="adresse" name="adresse" required class="rounded p-1" />
                <label for="email" class="">Email :</label>
                <input type="email" id="email" name="email" required class="rounded p-1" />
                <label for="password" class="">Mot de passe :</label>
                <input type="password" id="password" name="password" required class="rounded p-1" />
                <label for="password2" class="">Confirmer le mot de passe :</label>
                <input type="password" id="password2" name="password2" required class="rounded p-1" />
            </div>
            <div class="">
                <div class="text-center">Passions</div>
                <div class="grid grid-cols-2 gap-2">
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
                </div>
            </div>
            <br />
            <button
                class="bg-clifford text-white cursor-pointer p-10"
                type="submit"
                value="Créer le compte">Créer le compte</button>
        </form>
    </section>

    <footer class=" bottom-0 left-0 w-full text-green-600">
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