document.addEventListener("DOMContentLoaded", async function () {
  const memberContainer = document.getElementById("member-container");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  let members = [];

  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      members = await response.json();
      displayMembers();
    } catch (error) {
      console.error("Error fetching members:", error);
      memberContainer.innerHTML = "<p>Error loading member data.</p>";
    }
  }

  function displayMembers() {
    memberContainer.innerHTML = "";
    members.forEach(member => {
      const card = document.createElement("div");
      card.className = "member-card";
      card.innerHTML = `
        <div class="member-img">
          <img src="images/${member.image}" alt="${member.name} logo" />
        </div>
        <div class="member-info">
          <h3>${member.name}</h3>
          <p class="tagline">${member.tagline}</p>
          <hr>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p><strong>Membership:</strong> ${member.membership}</p>
        </div>
      `;
      memberContainer.appendChild(card);
    });
  }

  // Buttons: Grid / List
  gridBtn.addEventListener("click", function () {
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
    memberContainer.className = "grid-view";
  });

  listBtn.addEventListener("click", function () {
    gridBtn.setAttribute("aria-pressed", "false");
    listBtn.setAttribute("aria-pressed", "true");
    memberContainer.className = "list-view";
  });

  fetchMembers();
});
