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
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (primaryNav && primaryNav.classList.contains('show') && 
        !event.target.closest('#primary-nav') && 
        !event.target.closest('#hamburger-btn')) {
      primaryNav.classList.remove('show');
    }
  });
  
  // Close mobile menu when window is resized to desktop size
  window.addEventListener('resize', () => {
    if (primaryNav && window.innerWidth > 768 && primaryNav.classList.contains('show')) {
      primaryNav.classList.remove('show');
    }
  });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  for (const link of links) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update URL without page reload
          history.pushState(null, null, href);
        }
      }
    });
  }
});

// Add animation classes when elements come into view
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const animateElements = document.querySelectorAll('.card, .hero-content, .quote-content');
  animateElements.forEach(el => {
    observer.observe(el);
  });
});
