let toggleBtn = document.querySelector(".toggle-btn input");
let body = document.body;

// When the toggle button is changed, the body class is toggled between dark-mode and light-mode
toggleBtn.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});
