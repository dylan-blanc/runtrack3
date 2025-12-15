document.addEventListener("DOMContentLoaded", function () {
  const citations = [
    "J’ai vu tant de choses, que vous, humains, ne pourriez pas croire… De grands navires en feu surgissant de l’épaule d’Orion, j’ai vu des rayons fabuleux, des rayons C, briller dans l’ombre de la Porte de Tannhaüser. Tous ces moments se perdront dans l’oubli, comme les larmes dans la pluie. Il est temps de mourir.",
    "C'est dommage qu'elle doive mourir, mais c'est ainsi.",
    "Avez-vous déjà désactivé un humain par erreur ?",
    "Étrange sensation que de vivre dans la peur… voila ce que c’est d’être un esclave.",
  ];
  const btn = document.getElementById("reboot-btn");
  const jumbotron = document.getElementById("jumbotron-blade");

  btn.addEventListener("click", function () {
    const random = citations[Math.floor(Math.random() * citations.length)];
    jumbotron.innerHTML = `<h1 class="display-5 fw-bold">"${random}"</h1>`;
  });
});


/*
* ** PAGINATION changement de contenu jumbotron **
*/

document.addEventListener("DOMContentLoaded", () => {
  const jumbotron = document.getElementById("jumbotron-blade");

  const pages = [
    // Page 1
    `
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
        `,
    // Page 2
    `
        <h1 class="display-5 fw-bold">Papichien</h1>
        <img src="asset/papichien.jpg" alt="Papichien" class="img-fluid rounded mb-3" style="max-width:300px;">
        <p class="lead mb-1">Voici Papichien, le meilleur ami de Papillon !</p>
        <p class="mb-3">Il adore les caresses et les promenades.</p>
        `,
  ];

  function render(pageIdx) {
    jumbotron.innerHTML = pages[pageIdx] + paginationHTML(pageIdx);
    bindPagination();
  }

  function paginationHTML(activeIdx) {
    return `
        <nav aria-label="Page navigation example" class="mt-4 pe-0 d-flex justify-content-end">
            <ul class="pagination mb-0">
                <li class="page-item${activeIdx === 0 ? " disabled" : ""}">
                    <a class="page-link" href="#" data-page="${
                      activeIdx - 1
                    }" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                ${pages
                  .map(
                    (_, i) =>
                      `<li class="page-item${
                        activeIdx === i ? " disabled" : ""
                      }">
                        <a class="page-link" href="#" data-page="${i}">${
                        i + 1
                      }</a>
                    </li>`
                  )
                  .join("")}
                <li class="page-item${
                  activeIdx === pages.length - 1 ? " disabled" : ""
                }">
                    <a class="page-link" href="#" data-page="${
                      activeIdx + 1
                    }" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
        `;
  }

  function bindPagination() {
    jumbotron.querySelectorAll(".page-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute("data-page"));
        if (!isNaN(page) && page >= 0 && page < pages.length) {
          render(page);
        }
      });
    });
  }

  render(0);
});
