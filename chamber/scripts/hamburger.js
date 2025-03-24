document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("chamber-nav");

  hamburgerBtn.addEventListener("click", function () {
    // Toggle 'active' class en <nav> para animación en mobile
    navMenu.classList.toggle("active");

    // ARIA expanded
    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    hamburgerBtn.setAttribute("aria-expanded", !expanded);
  });
});
