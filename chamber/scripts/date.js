document.addEventListener("DOMContentLoaded", function () {
  const lastModified = document.lastModified;
  const modifiedElem = document.getElementById("lastModifiedDate");
  if (modifiedElem) {
    modifiedElem.textContent = lastModified;
  }
});
