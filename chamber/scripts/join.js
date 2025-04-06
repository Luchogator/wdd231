document.addEventListener('DOMContentLoaded', function () {
    // Set current timestamp in hidden field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.getTime(); // Usar getTime para obtener la marca de tiempo en milisegundos
    }

    // Membership level info for the modals
    const membershipDetails = {
        nonprofit: {
            title: "Non Profit Membership",
            price: "Free",
            benefits: [
                "Basic listing in the business directory",
                "Monthly newsletter subscription",
                "Invitation to networking events (entry fees may apply)",
                "Access to community resources"
            ],
            description: "Designed for educational institutions, charities, and community organizations serving Tarapoto and the San Martín region. This level provides essential visibility and networking opportunities at no cost to qualifying organizations."
        },
        bronze: {
            title: "Bronze Membership",
            price: "$75 per year",
            benefits: [
                "Enhanced listing in the business directory",
                "Monthly newsletter subscription",
                "Discounted entry to networking events",
                "Social media mention (quarterly)",
                "Access to chamber workshops and training",
                "Basic business consulting (2 hours per year)"
            ],
            description: "Perfect for small businesses and startups looking to establish their presence in the Tarapoto business community. Bronze membership offers essential marketing visibility and networking opportunities at an affordable price."
        },
        silver: {
            title: "Silver Membership",
            price: "$180 per year",
            benefits: [
                "Premium listing in the business directory with logo",
                "Featured in Business Spotlight section (once per year)",
                "Monthly newsletter subscription with option to submit content",
                "Free entry to most networking events",
                "Social media features (monthly)",
                "Chamber event sponsorship opportunities (additional fees)",
                "Business consulting services (5 hours per year)",
                "Participation in chamber committees"
            ],
            description: "Ideal for established businesses seeking increased visibility and marketing opportunities. Silver membership provides substantial promotional benefits and opportunities to shape chamber initiatives."
        },
        gold: {
            title: "Gold Membership",
            price: "$350 per year",
            benefits: [
                "Premium featured listing in business directory",
                "Regular rotation in Business Spotlight section",
                "Monthly newsletter subscription with dedicated space for announcements",
                "Free entry to all chamber events",
                "Premium social media promotion (bi-weekly)",
                "One free booth at annual Tarapoto Business Expo",
                "Logo featured on chamber website homepage",
                "Priority sponsorship opportunities",
                "Comprehensive business consulting (10 hours per year)",
                "Leadership role eligibility in chamber committees",
                "Advocacy support for relevant business issues"
            ],
            description: "Our premier membership level for businesses committed to maximum visibility and influence in the Tarapoto business community. Gold members receive the highest level of promotion, services, and leadership opportunities."
        }
    };

    // Animate membership cards on page load
    function animateMembershipCards() {
        const cards = document.querySelectorAll('.membership-card');

        cards.forEach((card, index) => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            // Trigger animation with delay based on index
            setTimeout(() => {
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 500 + (index * 300)); // Aumentar el retraso para cada tarjeta (300ms entre cada una)
        });
    }

    // Run animation on page load
    setTimeout(animateMembershipCards, 500);

    // Modal functionality
    const modal = document.getElementById('membership-modal');
    const modalDetails = document.getElementById('modal-details');
    const closeBtn = document.querySelector('.close-btn');
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

    // Open modal with specific membership details
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const level = this.getAttribute('data-level');
            const details = membershipDetails[level];

            if (details) {
                // Populate modal with membership details
                let benefitsList = details.benefits.map(benefit => `<li>${benefit}</li>`).join('');

                modalDetails.innerHTML = `
                    <h3>${details.title}</h3>
                    <p class="price"><strong>Price:</strong> ${details.price}</p>
                    <p class="description">${details.description}</p>
                    <h4>Benefits:</h4>
                    <ul class="benefits-list">
                        ${benefitsList}
                    </ul>
                `;

                // Show modal with animation
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            }
        });
    });

    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Form validation
    const form = document.getElementById('membershipForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            // Basic validation is handled by HTML5 required attributes
            console.log('Form submitted with timestamp:', timestampField.value);

            // Additional validation can be added here if needed

            // Form submits to thankyou.html as specified in the form action
        });
    }

    // Re-run animation when scrolling to the membership section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMembershipCards();
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the element is visible
    });

    const membershipSection = document.querySelector('.membership-section');
    if (membershipSection) {
        observer.observe(membershipSection);
    }
}); 