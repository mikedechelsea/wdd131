const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Hong Kong China",
    location: "Kowloon, Hong Kong",
    dedicated: "1996, May, 26",
    area: 21208,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/hong-kong-china/400x250/hong-kong-china-temple-exterior-1500696-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-exterior-1518649-wallpaper.jpg"
  }
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getDedicationYear(dedicated) {
  return parseInt(dedicated.split(",")[0].trim(), 10);
}

function createTempleCard(temple) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = "lazy";
  img.width = 400;
  img.height = 250;

  const caption = document.createElement("figcaption");

  const name = document.createElement("h3");
  name.textContent = temple.templeName;

  const location = document.createElement("p");
  location.innerHTML = `<span>Location:</span> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML = `<span>Dedicated:</span> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML = `<span>Size:</span> ${temple.area.toLocaleString()} sq ft`;

  caption.append(name, location, dedicated, area);
  figure.append(img, caption);
  return figure;
}

function displayTemples(list) {
  const grid = document.getElementById("temple-grid");
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  list.forEach(t => fragment.appendChild(createTempleCard(t)));
  grid.appendChild(fragment);
}

// ── Filter definitions ────────────────────────────────────────────────────────

const filters = {
  home:  () => temples,
  old:   () => temples.filter(t => getDedicationYear(t.dedicated) < 1900),
  new:   () => temples.filter(t => getDedicationYear(t.dedicated) > 2000),
  large: () => temples.filter(t => t.area > 90000),
  small: () => temples.filter(t => t.area < 10000)
};

const headings = {
  home:  "All Temples",
  old:   "Old Temples (Before 1900)",
  new:   "New Temples (After 2000)",
  large: "Large Temples (Over 90,000 sq ft)",
  small: "Small Temples (Under 10,000 sq ft)"
};

// ── Navigation ────────────────────────────────────────────────────────────────

const navLinks = document.querySelectorAll(".navigation a[data-filter]");

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Update active state
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");

    // Close mobile menu
    const navigation = document.querySelector(".navigation");
    const menuButton = document.querySelector(".menu-toggle");
    navigation.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    // Filter and render
    const filter = this.dataset.filter;
    document.getElementById("filter-heading").textContent = headings[filter];
    displayTemples(filters[filter]());
  });
});

// ── Mobile hamburger menu ─────────────────────────────────────────────────────

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", function () {
  const isOpen = navigation.classList.toggle("open");
  this.textContent = isOpen ? "✕" : "☰";
  this.setAttribute("aria-expanded", isOpen);
  this.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// ── Footer ────────────────────────────────────────────────────────────────────

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modification: ${document.lastModified}`;

// ── Initial render ────────────────────────────────────────────────────────────

displayTemples(temples);
