// JavaScript for the Create from the Soul page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery lightbox functionality
  initGallery();
  
  // Add animation to inspiration quotes
  animateQuotes();
});

// Function to initialize gallery lightbox
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      // Get the image source and description
      const imgSrc = this.querySelector('img').src;
      const imgAlt = this.querySelector('img').alt;
      
      // Create lightbox elements
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      
      const lightboxContent = document.createElement('div');
      lightboxContent.className = 'lightbox-content';
      
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = imgAlt;
      
      const caption = document.createElement('p');
      caption.textContent = imgAlt;
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'lightbox-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.setAttribute('aria-label', 'Close lightbox');
      
      // Add click event to close lightbox
      closeBtn.addEventListener('click', function() {
        document.body.removeChild(lightbox);
      });
      
      // Add click event to close lightbox when clicking outside the image
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          document.body.removeChild(lightbox);
        }
      });
      
      // Append elements to the DOM
      lightboxContent.appendChild(img);
      lightboxContent.appendChild(caption);
      lightboxContent.appendChild(closeBtn);
      lightbox.appendChild(lightboxContent);
      document.body.appendChild(lightbox);
    });
  });
}

// Function to animate inspiration quotes
function animateQuotes() {
  const quotes = document.querySelectorAll('.inspiration-quote');
  
  if (quotes.length === 0) return;
  
  // Add fade-in effect to quotes when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  quotes.forEach(quote => {
    observer.observe(quote);
  });
}
