const relaxer = document.querySelector(".relaxerContainer");
const text = document.querySelector("p");

function interval() {
  relaxer.classList.add("big");
  text.innerText = "Breathe In!";
  setTimeout(() => {
    text.innerText = "Hold";
  }, 3000);
  setTimeout(() => {
    relaxer.classList.remove("big");
    text.innerText = "Breathe Out!";
  }, 5000);
}

interval();
setInterval(interval, 8000);
