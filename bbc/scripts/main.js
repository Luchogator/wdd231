// Main JavaScript for Brain, Body, and Code Website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const primaryNav = document.getElementById('primary-nav');
  
  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener('click', () => {
      primaryNav.classList.toggle('show');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#hamburger-btn') && !event.target.closest('#primary-nav')) {
      if (primaryNav && primaryNav.classList.contains('show')) {
        primaryNav.classList.remove('show');
      }
    }
  });
});
