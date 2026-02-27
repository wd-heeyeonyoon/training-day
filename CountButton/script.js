let count = 0;
/*
let output = document.getElementById("output");

function countClicks() {
  count++;
  output.innerHTML = count;
  // console.log(count);
}
*/

let btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  count++;
  output.innerHTML = count;
});
