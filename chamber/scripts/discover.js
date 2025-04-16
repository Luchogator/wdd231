// Discover Page JavaScript

// Function to load attractions from JSON
async function loadAttractions() {
  try {
    const response = await fetch("data/attractions.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayAttractions(data.attractions);
  } catch (error) {
    console.error("Error loading attractions:", error);
    document.querySelector(".discover-container").innerHTML = 
      `<p class="error-message">Sorry, we couldn't load the attractions. Please try again later.</p>`;
  }
}

// Function to display attractions
function displayAttractions(attractions) {
  const container = document.querySelector(".discover-container");
  
  attractions.forEach(attraction => {
    const card = document.createElement("article");
    card.className = "discover-card";
    
    card.innerHTML = `
      <figure>
        <img src="images/${attraction.image}" 
             alt="${attraction.name}" 
             width="300" 
             height="250"
             loading="lazy">
      </figure>
      <div class="card-content">
        <h2>${attraction.name}</h2>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <button class="learn-more" data-id="${attraction.id}">Learn More</button>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  // Add event listeners to "Learn More" buttons
  document.querySelectorAll(".learn-more").forEach(button => {
    button.addEventListener("click", () => {
      const attractionId = parseInt(button.getAttribute("data-id"));
      openAttractionModal(attractionId, attractions);
    });
  });
}

// Function to open attraction modal
function openAttractionModal(id, attractions) {
  const attraction = attractions.find(item => item.id === id);
  if (!attraction) return;
  
  const modal = document.getElementById("attraction-modal");
  const modalDetails = document.getElementById("modal-details");
  
  // Create activities list HTML
  const activitiesHTML = attraction.details.activities.map(activity => 
    `<span class="activity-tag">${activity}</span>`
  ).join('');
  
  // Populate modal content
  modalDetails.innerHTML = `
    <h2>${attraction.name}</h2>
    <img src="images/${attraction.image}" 
         alt="${attraction.name}" 
         width="700" 
         height="350">
    <address>${attraction.address}</address>
    <p>${attraction.description}</p>
    
    <div class="details-section">
      <h3>Hours</h3>
      <p>${attraction.details.hours}</p>
      
      <h3>Price</h3>
      <p>${attraction.details.price}</p>
      
      <h3>Activities</h3>
      <div class="activities-list">
        ${activitiesHTML}
      </div>
      
      <div class="tips">
        <h3>Visitor Tips</h3>
        <p>${attraction.details.tips}</p>
      </div>
    </div>
  `;
  
  // Show modal with animation
  modal.classList.add("show");
  
  // Add event listener to close button
  const closeBtn = modal.querySelector(".close-btn");
  closeBtn.addEventListener("click", closeModal);
  
  // Close modal when clicking outside of it
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
  
  // Prevent scrolling on body when modal is open
  document.body.style.overflow = "hidden";
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById("attraction-modal");
  modal.classList.remove("show");
  
  // Remove event listeners to prevent memory leaks
  const closeBtn = modal.querySelector(".close-btn");
  closeBtn.removeEventListener("click", closeModal);
  
  // Re-enable scrolling on body
  document.body.style.overflow = "";
}

// Function to handle last visit message
function handleLastVisit() {
  const visitInfoElement = document.getElementById("visit-info");
  
  // Get the current date in milliseconds
  const currentDate = Date.now();
  
  // Get the last visit date from localStorage
  const lastVisit = localStorage.getItem("lastVisit");
  
  let message = "";
  
  if (!lastVisit) {
    // First visit
    message = "Welcome! Let us know if you have any questions.";
  } else {
    // Calculate the difference in days
    const lastVisitDate = parseInt(lastVisit);
    const timeDifference = currentDate - lastVisitDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    if (daysDifference < 1) {
      // Less than a day
      message = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      // Exactly one day
      message = "You last visited 1 day ago.";
    } else {
      // More than one day
      message = `You last visited ${daysDifference} days ago.`;
    }
  }
  
  // Update the visit info element
  visitInfoElement.textContent = message;
  
  // Store the current visit date in localStorage
  localStorage.setItem("lastVisit", currentDate.toString());
}

// When the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load attractions
  loadAttractions();
  
  // Handle last visit message
  handleLastVisit();
});
