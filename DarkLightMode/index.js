let toggleBtn = document.querySelector(".toggle-btn input");
let body = document.body;

toggleBtn.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});
