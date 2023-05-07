const speech = document.getElementById("speech");

let targetNumber = Math.floor(Math.random() * 100) + 1;
// let targetNumber = 3;

document.body.addEventListener("click", e => {
  if (e.target.id !== "play-again") return;
  targetNumber = Math.floor(Math.random() * 100) + 1;
  speech.innerHTML = "";
});

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "ko-KR";

function validateNumber(text) {
  const num = Number(text);
  if (Number.isNaN(num)) {
    return "<div>That is not a valid number</div>";
  }
  if (num < targetNumber) {
    return "<div>GO HIGHER</div>";
  }
  if (num > targetNumber) {
    return "<div>GO LOWER</div>";
  }
  return `<div>Congrats! You have guessed the number!</div>
  <button class="play-again" id="play-again">Play Again</button>`;
}

recognition.addEventListener("result", e => {
  const { transcript } = e.results[0][0];
  speech.innerHTML = `
    <div>You said: </div>
    <span class="box">${transcript}</span>
    ${validateNumber(transcript)}
  `;
});

recognition.addEventListener("end", recognition.start);

recognition.start();
