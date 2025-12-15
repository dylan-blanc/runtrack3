<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job02</title>
    <link href="./asset/bootstrap-5.3.8/css/bootstrap.min.css" rel="stylesheet">


    <style>
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>

</head>



<body class="d-flex flex-column min-vh-100 bg-secondary bg-opacity-25">

    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">LPTF</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="https://laplateforme.io/">Accueil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-opacity-75" href="#">Units</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-opacity-50" href="#">Jobs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-opacity-25" href="#">Skills</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <div class="container-lg">
        <h1 class="text-xl-center">LaPlateforme_</h1>




        <div class="container text-center row-cols-1">
            <div class="row align-items-center">
                <div class="col-2">
                    <div class="card" style="width: 12rem;">
                        <img src="asset/papillon.jpg" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">Un Papillon</h5>
                            <p class="card-text">Un Papillon c'est un peu comme une chenille mais avec des ailes<br>Ne pas ingerer.</p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Commander votre propre papillon
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div id="jumbotron-blade" class="px-4 py-5 my-5 bg-secondary bg-opacity-10 text-start">
                        <h1 class="display-5 fw-bold">Bonjour, monde!</h1>
                        <p class="lead mb-1">Il existe plusieurs visions du terme :</p>
                        <p class="mb-1">le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.</p>
                        <p class="mb-3">Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.</p>
                        <hr>
                        <p class="fw-semibold mb-3">Le sens étendu désigne l'univers dans son ensemble.</p>
                        <div class="d-flex align-items-center gap-3">
                            <button id="reboot-btn" type="button" class="btn btn-danger btn-lg px-4">Rebooter le Monde</button>
                            <div class="spinner-border text-secondary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <nav aria-label="Page navigation example" class="mt-4 pe-0 d-flex justify-content-end">
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item disabled"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-2">
                    <ul class="list-group">
                        <li class="list-group-item active" aria-current="true">Limbes</li>
                        <li class="list-group-item">Luxure</li>
                        <li class="list-group-item">Gourmandise</li>
                        <li class="list-group-item">Avarice</li>
                        <li class="list-group-item">Colere</li>
                        <li class="list-group-item">Heresie</li>
                        <li class="list-group-item">Violence</li>
                        <li class="list-group-item">Ruse et Tromperie</li>
                        <li class="list-group-item">Trahison</li>
                        <li class="list-group-item">Internet Explorer</li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="position-relative mb-1" style="height: 40px;">
            <span class="fw-semibold text-secondary position-absolute top-0 end-0" style="margin-top: -5px; margin-right: 25%">Installation de AI 9000</span>
            <div class="position-absolute start-50 translate-middle-x w-50" style="top: 24px;">
                <div class="progress" role="progressbar" aria-label="Warning striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped bg-warning" style="width: 75%"></div>
                </div>
            </div>
        </div>

        <div class="container text-center">
            <div class="row align-items-start">
                <div class="col-5 p-5">
                    <label for="basic-url" class="form-label">Recevez gratuitement votre copie d'internet 2</label>

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">@</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Recipient’s username" aria-label="Recipient’s username" aria-describedby="basic-addon2">
                        <span class="input-group-text" id="basic-addon2">@example.com</span>
                    </div>

                    <div class="input-group mb-3">
                        <label for="basic-url" class="form-label">URL des internets 2 et 2.1 Beta</label>

                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                            <span class="input-group-text">.00</span>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
                        </div>
                    </div>
                </div>
                <div class="col-3"></div>
                <div class="col-lg-4 p-5">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>







    </div>

    <!-- MODALS -->

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-white">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Commande</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Papillon commandé ! Merci de votre achat !
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>

    <!-- FIN MODAL -->

    <script src="./script.js"></script>
    <script src="./asset/bootstrap-5.3.8/js/bootstrap.bundle.min.js"></script>
</body>



</html>