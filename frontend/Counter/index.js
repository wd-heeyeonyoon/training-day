// Counter Program
let count = 0;
let countLabel = document.getElementById("countLabel");
//let increseButton = document.getElementById("incrementButton");
let decreaseButton = document.getElementById("decreaseButton");
let resetButton = document.getElementById("resetButton");

document.getElementById("increaseButton").addEventListener("click", () => {
  count++;
  countLabel.innerHTML = count;
});

decreaseButton.addEventListener("click", () => {
  count--;
  countLabel.innerHTML = count;
});

resetButton.addEventListener("click", () => {
  count = 0;
  countLabel.innerHTML = count;
});
