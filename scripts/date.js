document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
    document.getElementById("lastModifiedDate").textContent = document.lastModified;
  });
  