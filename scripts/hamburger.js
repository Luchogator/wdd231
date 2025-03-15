document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    
    hamburgerBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
      hamburgerBtn.setAttribute("aria-expanded", !expanded);
    });
  });
  