let count = 0;
let output = document.getElementById("output");

output.textContent = count;
function countClicks() {
  count++;
  output.textContent = count;
  // console.log(count);
}

/*
let btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  count++;
  output.innerHTML = count;
});
*/
