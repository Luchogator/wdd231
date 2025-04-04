// Function to shuffle array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fetch members data
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Members data loaded:', data); // Debug log
        return data.members;
    } catch (error) {
        console.error('Error fetching members:', error);
        // Log more detailed error information
        console.error('Fetch error details:', {
            message: error.message,
            stack: error.stack
        });
        return [];
    }
}

// Filter and randomly select spotlight members
function getSpotlightMembers(members) {
    console.log('Total members loaded:', members.length); // Debug log

    // Filter for Gold and Silver members
    const eligibleMembers = members.filter(member =>
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
    );

    console.log('Eligible members (Gold/Silver):', eligibleMembers.length); // Debug log

    // If no eligible members, use all members as fallback
    if (eligibleMembers.length === 0) {
        console.warn('No Gold/Silver members found, using all members');
        return shuffleArray([...members]).slice(0, 3);
    }

    // Shuffle array and take first 3 members (or fewer if not enough)
    const count = Math.min(eligibleMembers.length, 3);
    return shuffleArray([...eligibleMembers]).slice(0, count);
}

// Update spotlight section
function updateSpotlight(spotlightMembers) {
    const container = document.querySelector('.business-cards');

    if (!container) {
        console.error('Business cards container not found in the DOM');
        return;
    }

    console.log('Updating spotlight with members:', spotlightMembers.length);

    if (spotlightMembers.length === 0) {
        container.innerHTML = '<p>No featured businesses available at this time.</p>';
        return;
    }

    container.innerHTML = spotlightMembers.map(member => {
        // Try both .jpg and .png extensions
        const imageName = member.image.split('.')[0];
        const imagePathJPG = `images/${imageName}.jpg`;
        const imagePathPNG = `images/${imageName}.png`;

        return `
        <div class="business-card">
            <div class="member-img">
                <img src="${imagePathJPG}" 
                     alt="${member.name} logo" 
                     onerror="this.onerror=null; this.src='${imagePathPNG}'; this.onerror=null;"
                     loading="lazy">
            </div>
            <h4>${member.name}</h4>
            <p class="tagline">${member.tagline}</p>
            <p><strong>Email:</strong> ${member.email}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${new URL(member.website).hostname}</a></p>
            <p class="membership-level">${member.membershipLevel} Member</p>
        </div>
        `;
    }).join('');
}

// Initialize spotlight section
async function initSpotlight() {
    try {
        console.log('Initializing business spotlight...'); // Debug log
        const members = await fetchMembers();
        if (members.length === 0) {
            throw new Error('No members data available');
        }
        const spotlightMembers = getSpotlightMembers(members);
        updateSpotlight(spotlightMembers);
        console.log('Business spotlight initialized successfully'); // Debug log
    } catch (error) {
        console.error('Error initializing spotlight:', error);
        const container = document.querySelector('.business-cards');
        if (container) {
            container.innerHTML = '<p>Error loading business spotlights. Please try again later.</p>';
        }
    }
}

// Run only once on page load
document.addEventListener('DOMContentLoaded', initSpotlight); 