// JavaScript for the Connect with Your Code page

// Function to handle copying code snippets
document.addEventListener('DOMContentLoaded', function() {
  // Get all copy buttons
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  // Add click event listener to each button
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the snippet ID from the data attribute
      const snippetId = this.getAttribute('data-snippet');
      
      // Get the code element
      const codeElement = document.getElementById(snippetId);
      
      if (codeElement) {
        // Get the text content of the code element
        const codeText = codeElement.textContent;
        
        // Create a temporary textarea element to copy from
        const textarea = document.createElement('textarea');
        textarea.value = codeText;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        
        // Select and copy the text
        textarea.select();
        document.execCommand('copy');
        
        // Remove the textarea
        document.body.removeChild(textarea);
        
        // Update the button text and class to indicate success
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.classList.add('copied');
        
        // Reset the button after 2 seconds
        setTimeout(() => {
          this.innerHTML = originalText;
          this.classList.remove('copied');
        }, 2000);
      }
    });
  });
});

// Function to initialize project cards
function initializeProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Only handle clicks on the card itself, not on links or buttons
      if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
        // Find the button in this card and click it
        const button = this.querySelector('.code-btn');
        if (button) {
          button.click();
        }
      }
    });
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  initializeProjectCards();
});
