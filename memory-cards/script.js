const addBtn = document.getElementById("add");
const addCardDialog = document.getElementById("add-card-dialog");
const closeBtn = document.getElementById("close");
const addCardBtn = document.getElementById("add-card");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const cardContainer = document.getElementById("card-container");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const deleteBtn = document.getElementById("delete");
const pagination = document.getElementById("pagination");

const cardList = JSON.parse(localStorage.getItem("cardList")) || [];
let currentCard = 0;
let cardStatus = "question";

function makeCard(cardInfo) {
  const card = document.createElement("div");
  card.style.position = "absolute";
  card.style.width = "500px";
  card.style.height = "280px";
  card.style.boxShadow = "0px 0px 10px #888";
  card.style.opacity = 1;
  card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.alignItems = "center";

  const questionContent = document.createElement("p");
  questionContent.setAttribute("class", "questionContent");
  questionContent.textContent = cardInfo.question;
  questionContent.style.fontSize = "18px";
  questionContent.style.position = "absolute";

  const answerContent = document.createElement("p");
  answerContent.setAttribute("class", "answerContent");
  answerContent.textContent = cardInfo.answer;
  answerContent.style.fontSize = "18px";
  answerContent.style.opacity = 0;
  answerContent.style.transform = "rotateX(180deg)";
  answerContent.style.position = "absolute";

  card.appendChild(questionContent);
  card.appendChild(answerContent);

  return card;
}

function makeCardSet() {
  cardContainer.innerHTML = "";
  if (cardList[currentCard]) {
    const curCard = makeCard(cardList[currentCard]);
    curCard.setAttribute("id", "cur");
    cardContainer.appendChild(curCard);
  }

  if (cardList[currentCard - 1]) {
    const prevCard = makeCard(cardList[currentCard - 1]);
    prevCard.style.transform = "translateX(-100%)";
    prevCard.style.opacity = 0;
    prevCard.setAttribute("id", "prev");
    cardContainer.appendChild(prevCard);
  }

  if (cardList[currentCard + 1]) {
    const nextCard = makeCard(cardList[currentCard + 1]);
    nextCard.style.transform = "translateX(100%)";
    nextCard.style.opacity = 0;
    nextCard.setAttribute("id", "next");
    cardContainer.appendChild(nextCard);
  }
}

function makePage() {
  const page = pagination.querySelector("#page");
  page.innerHTML = `${Math.min(currentCard + 1, cardList.length)}/${
    cardList.length
  }`;
}

addBtn.addEventListener("click", () => {
  addCardDialog.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  addCardDialog.classList.remove("show");
  question.value = "";
  answer.value = "";
});

addCardBtn.addEventListener("click", () => {
  cardList.push({
    question: question.value,
    answer: answer.value,
  });
  localStorage.setItem("cardList", JSON.stringify(cardList));
  addCardDialog.classList.remove("show");
  question.value = "";
  answer.value = "";
  makeCardSet();
  makePage();
});

cardContainer.addEventListener("click", () => {
  const curCard = document.getElementById("cur");
  const questionContent = curCard.querySelector(".questionContent");
  const answerContent = curCard.querySelector(".answerContent");
  if (cardStatus === "question") {
    questionContent.style.opacity = 0;
    answerContent.style.opacity = 1;
    curCard.style.transform = "rotateX(180deg)";
  } else {
    questionContent.style.opacity = 1;
    answerContent.style.opacity = 0;
    curCard.style.transform = "rotateX(0deg)";
  }
  cardStatus = cardStatus === "question" ? "answer" : "question";
});

leftBtn.addEventListener("click", () => {
  if (currentCard > 0) {
    currentCard -= 1;

    const curCard = document.getElementById("cur");
    const prevCard = document.getElementById("prev");

    curCard.style.transform = "translateX(100%)";
    curCard.style.opacity = 0;
    prevCard.style.transform = "translateX(0%)";
    prevCard.style.opacity = 1;
    cardStatus = "question";
    makePage();

    setTimeout(() => {
      makeCardSet();
    }, 300);
  }
});

rightBtn.addEventListener("click", () => {
  if (currentCard < cardList.length - 1) {
    currentCard += 1;

    const curCard = document.getElementById("cur");
    const nextCard = document.getElementById("next");

    curCard.style.transform = "translateX(-100%)";
    curCard.style.opacity = 0;
    nextCard.style.transform = "translateX(0%)";
    nextCard.style.opacity = 1;
    cardStatus = "question";
    makePage();

    setTimeout(() => {
      makeCardSet();
    }, 300);
  }
});

deleteBtn.addEventListener("click", () => {
  cardList.length = 0;
  currentCard = 0;
  localStorage.removeItem("cardList");
  makeCardSet();
  makePage();
});

makeCardSet();
makePage();
