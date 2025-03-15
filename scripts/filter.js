document.addEventListener("DOMContentLoaded", function () {
    const allBtn = document.getElementById("all");
    const cseBtn = document.getElementById("cse");
    const wddBtn = document.getElementById("wdd");
    const filterButtons = [allBtn, cseBtn, wddBtn];
    const courses = document.querySelectorAll(".courses button");
  
    function updateAriaPressed(activeBtn) {
      filterButtons.forEach(btn => btn.setAttribute("aria-pressed", btn === activeBtn ? "true" : "false"));
    }
  
    allBtn.addEventListener("click", function () {
      updateAriaPressed(allBtn);
      courses.forEach(course => course.style.display = "inline-block");
    });
  
    cseBtn.addEventListener("click", function () {
      updateAriaPressed(cseBtn);
      courses.forEach(course => {
        if (course.classList.contains("cse")) {
          course.style.display = "inline-block";
        } else {
          course.style.display = "none";
        }
      });
    });
  
    wddBtn.addEventListener("click", function () {
      updateAriaPressed(wddBtn);
      courses.forEach(course => {
        if (course.classList.contains("wdd")) {
          course.style.display = "inline-block";
        } else {
          course.style.display = "none";
        }
      });
    });
  });
  