let count = 0;
const likeCountLabel = document.getElementById("like-count");
const checkboxes = document.querySelectorAll(".like-switch input");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      count++;
      console.log("checked");
      likeCountLabel.textContent = count;
    } else {
      count--;
      console.log("unchecked");
      likeCountLabel.textContent = count;
    }
  });
});
