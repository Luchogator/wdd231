document.addEventListener('DOMContentLoaded', async function () {
  const memberContainer = document.getElementById('member-container');
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');
  let currentMembers = [];

  async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.members;
    } catch (error) {
      console.error('Error loading members:', error);
      memberContainer.innerHTML = '<p>Error loading member data. Please try again later.</p>';
      return [];
    }
  }

  function displayMembers(members, viewMode = 'grid') {
    if (!members.length) return;

    // Set the view mode class on the container
    memberContainer.className = viewMode + '-view';

    memberContainer.innerHTML = members.map(member => {
      // Try both .jpg and .png extensions
      const imageName = member.image.split('.')[0];
      const imagePathJPG = `images/${imageName}.jpg`;
      const imagePathPNG = `images/${imageName}.png`;

      return `
                <article class="member-card">
                    <div class="member-img">
                        <img src="${imagePathJPG}" 
                             alt="${member.name} logo" 
                             onerror="this.onerror=null; this.src='${imagePathPNG}'"
                             loading="lazy">
                    </div>
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <p class="tagline">${member.tagline}</p>
                        <p class="address"><strong>Address:</strong> ${member.address}</p>
                        <p class="phone"><strong>Phone:</strong> ${member.phone}</p>
                        <p class="email"><strong>Email:</strong> ${member.email}</p>
                        <p class="website"><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${new URL(member.website).hostname}</a></p>
                        <p class="membership-level">${member.membershipLevel} Member</p>
                    </div>
                </article>
            `;
    }).join('');
  }

  // Event listeners for view toggles
  gridBtn.addEventListener('click', function () {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    displayMembers(currentMembers, 'grid');
  });

  listBtn.addEventListener('click', function () {
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    displayMembers(currentMembers, 'list');
  });

  // Initial load
  try {
    currentMembers = await fetchMembers();
    displayMembers(currentMembers, 'grid');
    gridBtn.classList.add('active'); // Set initial active state
  } catch (error) {
    console.error('Error during initial load:', error);
  }
});
