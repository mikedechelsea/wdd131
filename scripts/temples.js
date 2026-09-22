
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

// Toggle the mobile navigation menu
menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("open");

    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the mobile menu after selecting a navigation link
const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    });
});

// Dynamic copyright year
document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

// Last modified date
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;