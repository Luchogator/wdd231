document.addEventListener("DOMContentLoaded", function() {
    const coursesContainer = document.getElementById("courses");
    const totalCredits = document.getElementById("total-credits");
  
    const courses = [
      { name: "CSE 110 - Introduction to Programming", category: "CSE", credits: 2, completed: true },
      { name: "CSE 111 - Programming with Functions", category: "CSE", credits: 2, completed: true },
      { name: "CSE 210 - Programming with Classes", category: "CSE", credits: 2, completed: true },
      { name: "WDD 130 - Web Fundamentals", category: "WDD", credits: 2, completed: true },
      { name: "WDD 131 - Dynamic Web Fundamentals", category: "WDD", credits: 2, completed: true },
      { name: "WDD 231 - Web Frontend Development", category: "WDD", credits: 2, completed: false }
    ];
  
    function updateCourses(category = "All") {
      const filteredCourses = courses.filter(course => category === "All" || course.category === category);
      coursesContainer.innerHTML = "";
      filteredCourses.forEach(course => {
        const btn = document.createElement("button");
        btn.textContent = course.name;
        btn.classList.add(course.completed ? "completed" : "incomplete");
        coursesContainer.appendChild(btn);
      });
      const total = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
      totalCredits.textContent = `Total Credits: ${total}`;
    }
  
    document.getElementById("all").addEventListener("click", () => updateCourses("All"));
    document.getElementById("cse").addEventListener("click", () => updateCourses("CSE"));
    document.getElementById("wdd").addEventListener("click", () => updateCourses("WDD"));
    updateCourses();
  });
  