const toggleBtn = document.querySelector("#toggle-btn");
const toggleImg = document.querySelector("#toggle-img");

toggleBtn.addEventListener("click", () => {
  // check if the image is currently hidden (state: before user clicks the button)
  const isHidden = toggleImg.classList.contains("hidden");

  if (isHidden) {
    toggleImg.classList.remove("hidden");
    toggleBtn.classList.remove("hidden");
    toggleBtn.textContent = "Hide Image";
  } else {
    toggleImg.classList.add("hidden");
    toggleBtn.classList.add("hidden");
    toggleBtn.textContent = "Show Image";
  }
});
