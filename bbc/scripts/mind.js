// JavaScript for the Feed Your Mind page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize form validation
  initFormValidation();
  
  // Fetch and display a random quote
  fetchRandomQuote();
});

// Function to fetch a random quote from the Quotable API
function fetchRandomQuote() {
  const quoteContainer = document.getElementById('daily-quote');
  
  if (!quoteContainer) return;
  
  // Show loading state
  quoteContainer.innerHTML = '<p class="loading">Loading your daily inspiration...</p>';
  
  // Use a try-catch block for better error handling
  try {
    // Fetch from the Quotable API (free, no API key required)
    fetch('https://api.quotable.io/random?tags=inspirational,wisdom,success')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Create quote HTML
        const quoteHTML = `
          <blockquote class="quote">
            <p class="quote-text">"${data.content}"</p>
            <footer class="quote-author">— ${data.author}</footer>
          </blockquote>
          <button id="new-quote-btn" class="btn mind-btn">
            <i class="fas fa-sync-alt"></i> New Quote
          </button>
        `;
        
        // Update the container
        quoteContainer.innerHTML = quoteHTML;
        
        // Add event listener to the new quote button
        document.getElementById('new-quote-btn').addEventListener('click', fetchRandomQuote);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        handleQuoteError();
      });
  } catch (error) {
    console.error('Error in fetch operation:', error);
    handleQuoteError();
  }
}

// Function to handle errors and display a fallback quote
function handleQuoteError() {
  const quoteContainer = document.getElementById('daily-quote');
  
  // Display a fallback quote when API fails
  const fallbackQuotes = [
    {
      content: "The best way to predict the future is to invent it.",
      author: "Alan Kay"
    },
    {
      content: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci"
    },
    {
      content: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House"
    },
    {
      content: "The most powerful tool we have as developers is automation.",
      author: "Scott Hanselman"
    },
    {
      content: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      author: "Martin Fowler"
    }
  ];
  
  // Select a random fallback quote
  const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  
  const quoteHTML = `
    <blockquote class="quote">
      <p class="quote-text">"${randomQuote.content}"</p>
      <footer class="quote-author">— ${randomQuote.author}</footer>
    </blockquote>
    <p class="api-note">Using offline quote (API connection failed)</p>
    <button id="retry-quote-btn" class="btn mind-btn">
      <i class="fas fa-sync-alt"></i> Try Again
    </button>
  `;
  
  quoteContainer.innerHTML = quoteHTML;
  
  // Add event listener to retry button
  document.getElementById('retry-quote-btn').addEventListener('click', fetchRandomQuote);
}

// Function to initialize form validation
function initFormValidation() {
  const snackForm = document.getElementById('snack-form');
  
  if (!snackForm) return;
  
  snackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const name = document.getElementById('name').value.trim();
    const hours = document.getElementById('coding-hours').value;
    const diet = document.getElementById('dietary-preference').value;
    
    if (!name || !hours || !diet) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Show success message
    const resultDiv = document.getElementById('snack-plan-result');
    resultDiv.innerHTML = `
      <h3>Your Personalized Snack Plan</h3>
      <p>Thank you, ${name}! Based on your ${hours} hours of coding and ${diet} diet preference, 
      here are some recommended snacks to keep your energy levels optimal:</p>
      <ul class="snack-recommendations">
        <li>Morning: Trail mix with nuts, seeds, and dried fruits</li>
        <li>Mid-day: Greek yogurt with honey and berries</li>
        <li>Afternoon: Dark chocolate (70%+ cocoa) and almonds</li>
        <li>Evening: Herbal tea and whole grain crackers</li>
      </ul>
      <p>Remember to stay hydrated and take regular breaks for optimal brain function!</p>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  });
}
