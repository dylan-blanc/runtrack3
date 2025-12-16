document.addEventListener("DOMContentLoaded", () => {
  const citations = [
    "J’ai vu tant de choses, que vous, humains, ne pourriez pas croire… De grands navires en feu surgissant de l’épaule d’Orion, j’ai vu des rayons fabuleux, des rayons C, briller dans l’ombre de la Porte de Tannhaüser. Tous ces moments se perdront dans l’oubli, comme les larmes dans la pluie. Il est temps de mourir.",
    "C'est dommage qu'elle doive mourir, mais c'est ainsi.",
    "Avez-vous déjà désactivé un humain par erreur ?",
    "Étrange sensation que de vivre dans la peur… voila ce que c’est d’être un esclave.",
  ];

  const jumbotron = document.getElementById("jumbotron-blade");
  if (!jumbotron) return;

  const paginationNav = jumbotron.querySelector(
    "nav[aria-label='Page navigation example']"
  );
  if (!paginationNav) return;

  /*
   * * Changement de pages
   */

  function detachNode(node) {
    const parent = node.parentElement;
    const nextSibling = node.nextSibling;
    if (parent) parent.removeChild(node);
    return { parent, nextSibling };
  }

  function reattachNode(node, { parent, nextSibling }) {
    if (parent) {
      parent.insertBefore(node, nextSibling);
      return;
    }
    jumbotron.appendChild(node);
  }

  function getPageIndexFromLink(link) {
    const aria = link.getAttribute("aria-label");
    if (aria === "Previous") return currentPageIdx - 1;
    if (aria === "Next") return currentPageIdx + 1;

    const n = parseInt((link.textContent || "").trim(), 10);
    if (Number.isNaN(n)) return null;
    return n - 1;
  }

  /*
   * * --------------------------------------------------------
   */

  const pages = [
    `
        <h1 class="display-5 fw-bold">Papichien</h1>
        <img src="asset/papichien.jpg" alt="Papichien" class="img-fluid rounded mb-3" style="max-width:300px;">
        <p class="lead mb-1">Un autre type de Papillon</p>
        <p class="mb-3">Ne pas ingerer...</p>
        `,
  ];

  const totalPages = pages.length + 1;
  let currentPageIdx = 0;

  if (!jumbotron.dataset.initialContent) {
    const navSlot = detachNode(paginationNav);
    jumbotron.dataset.initialContent = jumbotron.innerHTML;
    reattachNode(paginationNav, navSlot);
  }

  function render(pageIdx) {
    if (pageIdx < 0 || pageIdx >= totalPages) return;

    currentPageIdx = pageIdx;

    detachNode(paginationNav);

    if (pageIdx === 0) {
      jumbotron.innerHTML = jumbotron.dataset.initialContent;
    } else {
      jumbotron.innerHTML = pages[pageIdx - 1];
    }

    jumbotron.appendChild(paginationNav);
  }

  paginationNav.addEventListener("click", (e) => {
    const link = e.target.closest("a.page-link");
    if (!link) return;
    e.preventDefault();

    const idx = getPageIndexFromLink(link);
    if (idx === null) return;
    if (idx >= 0 && idx < totalPages) render(idx);
  });

  // ✅ Reboot : remplace le contenu de la section par une citation
  jumbotron.addEventListener("click", (e) => {
    const reboot = e.target.closest("#reboot-btn");
    if (!reboot) return;

    const section = jumbotron.querySelector("#TuMeVoisTuMeVoisPlus");
    if (!section) return;

    const random = citations[Math.floor(Math.random() * citations.length)];

    section.innerHTML = `
      <h1 class="display-5 fw-bold">"${random}"</h1>
    `;
  });
});


  /*
   * * --------------------------------------------------------
   * * ----------------------List-GROUP------------------------
   * * --------------------------------------------------------
   */

document.addEventListener("click", (e) => {
  const item = e.target.closest(".list-group-item");
  if (!item) return;

  const listGroup = item.closest(".list-group");
  if (!listGroup) return;

  listGroup.querySelectorAll(".list-group-item").forEach((li) => {
    li.classList.remove("active");
  });

  item.classList.add("active");
});


/*
  * * --------------------------------------------------------
  * * ------------------Progress-BAR-------------------------
  * * --------------------------------------------------------
  */

document.addEventListener("DOMContentLoaded", () => {
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");
  const progressBar = document.querySelector(".progress-bar");

  if (leftArrow && rightArrow && progressBar) {
    function getCurrentWidth() {
      const width = progressBar.style.width.replace("%", "");
      return parseInt(width, 10) || 0;
    }

    function setWidth(val) {
      const newVal = Math.max(0, Math.min(100, val));
      progressBar.style.width = `${newVal}%`;
      progressBar.setAttribute("aria-valuenow", newVal);
    }

    leftArrow.addEventListener("click", () => {
      setWidth(getCurrentWidth() - 25);
    });

    rightArrow.addEventListener("click", () => {
      setWidth(getCurrentWidth() + 25);
    });
  }
});

 
