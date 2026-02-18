const content = {
  name: "Kristers Dzenis",
  location: "Riga / Anywhere",
  discipline: "Interdisciplinary • Installation • Sound • Sculpture",
  email: "hello@example.com",
  instagram: { label: "@kristersdzenis", url: "https://instagram.com/kristersdzenis" },
  github: { label: "kristersdzenis", url: "https://github.com/kristersdzenis" },

  // Put your images in /assets and update these filenames.
  // Tip: keep them ~1600px wide for good quality.
  gridImages: [
    { src: "assets/IMG-01.svg", alt: "Untitled sculpture composition", caption: "Untitled (2025)" },
    { src: "assets/img-02.jpg", alt: "Work title 2", caption: "Work title 2 (2025)" },
    { src: "assets/img-03.jpg", alt: "Work title 3", caption: "Work title 3 (2024)" },
    { src: "assets/img-04.jpg", alt: "Work title 4", caption: "Work title 4 (2024)" }
  ],

  bioHtml: `
    <p>BIG LATVIA PAGE PORTFOLIO</p>
  `,

  works: [
    {
      year: "2026",
      title: "Project Title One",
      meta: "Exhibition / Installation",
      description: "One line describing what it is, where it happened, and what it explored.",
      href: "#"
    },
    {
      year: "2025",
      title: "Project Title Two",
      meta: "Sound / Performance",
      description: "Short description. Keep it readable and specific.",
      href: "#"
    },
    {
      year: "2024",
      title: "Project Title Three",
      meta: "Sculpture",
      description: "Short description. Materials or process can go here.",
      href: "#"
    }
  ]
};

function $(id){ return document.getElementById(id); }

function mountHeader(){
  $("nameTop").textContent = content.name;
  $("nameHero").textContent = content.name;
  $("footerName").textContent = content.name;
  $("location").textContent = content.location;
  $("discipline").textContent = content.discipline;

  $("bio").innerHTML = content.bioHtml;

  $("emailLink").textContent = content.email;
  $("emailLink").href = `mailto:${content.email}`;

  $("igLink").textContent = content.instagram.label;
  $("igLink").href = content.instagram.url;

  $("ghLink").textContent = content.github.label;
  $("ghLink").href = content.github.url;

  $("year").textContent = new Date().getFullYear();
}

function mountGrid(){
  const grid = $("grid");
  grid.innerHTML = "";

  content.gridImages.forEach((img, i) => {
    const tile = document.createElement("button");
    tile.className = "tile";
    tile.type = "button";
    tile.setAttribute("aria-label", `Open image ${i + 1}`);

    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.alt || "";

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = img.caption || "";

    tile.appendChild(image);
    tile.appendChild(overlay);
    tile.appendChild(label);

    tile.addEventListener("click", () => openLightbox(img));
    grid.appendChild(tile);
  });
}

function mountWorks(){
  const list = $("workList");
  list.innerHTML = "";

  content.works.forEach((w) => {
    const item = document.createElement("article");
    item.className = "work-item";
    item.setAttribute("role", "listitem");

    const year = document.createElement("div");
    year.className = "year";
    year.textContent = w.year;

    const title = document.createElement("h3");
    title.className = "title";
    title.style.margin = "0";

    const link = document.createElement("a");
    link.href = w.href || "#";
    link.textContent = w.title;
    link.target = w.href && w.href !== "#" ? "_blank" : "_self";
    link.rel = "noreferrer";

    title.appendChild(link);

    const meta = document.createElement("div");
    meta.className = "meta2";
    meta.textContent = w.meta || "";

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = w.description || "";

    item.appendChild(year);
    item.appendChild(title);
    item.appendChild(meta);
    if (w.description) item.appendChild(desc);

    list.appendChild(item);
  });
}

function setupCompactToggle(){
  const btn = $("toggleView");
  btn.addEventListener("click", () => {
    const list = $("workList");
    const next = !list.classList.contains("compact");
    list.classList.toggle("compact", next);
    btn.setAttribute("aria-pressed", String(next));
    btn.textContent = next ? "expanded view" : "compact view";
  });
}

function setupLightbox(){
  const lb = $("lightbox");
  const img = $("lightboxImg");
  const cap = $("lightboxCap");

  function close(){
    lb.setAttribute("aria-hidden", "true");
    img.src = "";
    img.alt = "";
    cap.textContent = "";
    document.body.style.overflow = "";
  }

  window.openLightbox = function(payload){
    lb.setAttribute("aria-hidden", "false");
    img.src = payload.src;
    img.alt = payload.alt || "";
    cap.textContent = payload.caption || "";
    document.body.style.overflow = "hidden";
  };

  lb.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.dataset && target.dataset.close === "true") close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.getAttribute("aria-hidden") === "false") close();
  });
}

mountHeader();
mountGrid();
mountWorks();
setupCompactToggle();
setupLightbox();
