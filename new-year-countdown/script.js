const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const year = document.getElementById("year");
const spinner = document.getElementById("spinner");
const countdown = document.getElementById("countdown");

const now = new Date();
const newYear = new Date(now.getFullYear() + 1, 0, 1);
year.innerHTML = newYear.getFullYear();
spinner.style.display = "block";

function updateCountdown() {
  const current = new Date();
  const diff = newYear - current;

  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

  days.innerHTML = daysLeft;
  hours.innerHTML = hoursLeft;
  minutes.innerHTML = minutesLeft;
  seconds.innerHTML = secondsLeft;
  spinner.style.display = "none";
  countdown.style.display = "flex";
}

setInterval(updateCountdown, 1000);
