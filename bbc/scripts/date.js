// Date JavaScript for Brain, Body, and Code Website

// Update current year and last modified date in footer
document.addEventListener('DOMContentLoaded', () => {
  // Update current year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }
  
  // Update last modified date
  const lastModifiedElement = document.getElementById('last-modified');
  if (lastModifiedElement) {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const lastModified = new Date(document.lastModified);
    lastModifiedElement.textContent = lastModified.toLocaleDateString('en-US', options);
  }
});
