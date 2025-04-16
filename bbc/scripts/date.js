// Date JavaScript for Brain, Body, and Code Website

// Update copyright year and last modified date
document.addEventListener('DOMContentLoaded', () => {
  // Update current year for copyright
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }
  
  // Update last modified date
  const lastModifiedElement = document.getElementById('last-modified');
  if (lastModifiedElement) {
    const lastModified = document.lastModified;
    lastModifiedElement.textContent = lastModified;
  }
});
