const toggleButton = document.getElementById("toggle-button");
const closeButton = document.getElementById("close");
const textBox = document.getElementById("text-box");
const readButton = document.getElementById("read-text");
const textArea = document.getElementById("textarea");
const select = document.getElementById("select");

window.speechSynthesis.onvoiceschanged = function getVoice() {
  const voiceList = window.speechSynthesis.getVoices();
  for (let i = 0; i < voiceList.length; i += 1) {
    const option = document.createElement("option");
    option.text = voiceList[i].lang;
    select.appendChild(option);
  }
};

const images = [
  { src: "img/drink.jpg", caption: "I'm thirsty" },
  { src: "img/food.jpg", caption: "I'm hungry" },
  { src: "img/tired.jpg", caption: "I'm tired" },
  { src: "img/hurt.jpg", caption: "I'm hurt" },
  { src: "img/happy.jpg", caption: "I'm happy" },
  { src: "img/angry.jpg", caption: "I'm angry" },
  { src: "img/sad.jpg", caption: "I'm sad" },
  { src: "img/scared.jpg", caption: "I'm scared" },
  { src: "img/outside.jpg", caption: "I want to go outside" },
  { src: "img/home.jpg", caption: "I want to go home" },
  { src: "img/school.jpg", caption: "I want to go school" },
  { src: "img/grandma.jpg", caption: "I want to go to grandmas" },
];

const speakUtterance = text => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = select.value;
  speechSynthesis.speak(utterance);
};

readButton.addEventListener("click", () => {
  speakUtterance(textArea.value);
});

const list = document.getElementById("image-list");

images.forEach(image => {
  const container = document.createElement("div");
  container.classList.add("image-container");

  const img = document.createElement("img");
  img.src = image.src;

  const caption = document.createElement("p");
  caption.textContent = image.caption;

  container.appendChild(img);
  container.appendChild(caption);
  container.addEventListener("click", () => {
    speakUtterance(image.caption);
  });
  list.appendChild(container);
});

toggleButton.addEventListener("click", () => {
  textBox.classList.toggle("show");
});

closeButton.addEventListener("click", () => {
  textBox.classList.remove("show");
});
