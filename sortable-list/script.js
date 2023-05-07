const table = document.getElementById("table");
const check = document.getElementById("check");

let draggingElement = null;

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const items = [...richestPeople].sort(() => Math.random() - 0.5);

items.forEach((item, index) => {
  const li = document.createElement("li");
  const numberSpan = document.createElement("span");
  const draggable = document.createElement("div");
  const nameSpan = document.createElement("span");
  const icon = document.createElement("i");

  li.classList.add("item");

  numberSpan.textContent = index + 1;
  numberSpan.classList.add("number");

  draggable.classList.add("draggable");
  draggable.draggable = true;

  nameSpan.classList.add("name");
  nameSpan.textContent = item;

  icon.classList.add("fas", "fa-grip-lines");

  draggable.appendChild(nameSpan);
  draggable.appendChild(icon);
  li.appendChild(numberSpan);
  li.appendChild(draggable);
  table.appendChild(li);

  li.id = index;
});

function checkOrder() {
  richestPeople.forEach((item, index) => {
    const compare = document.getElementById(`${index}`).querySelector(".name");
    if (compare.textContent === item) {
      compare.classList.add("correct");
      compare.classList.remove("different");
    } else {
      compare.classList.add("different");
      compare.classList.remove("correct");
    }
  });
}

function swapItem(item1, item2) {
  const temp = item1.querySelector(".name").textContent;
  item1.querySelector(".name").textContent =
    item2.querySelector(".name").textContent;
  item2.querySelector(".name").textContent = temp;
}

table.addEventListener("dragstart", e => {
  draggingElement = e.target.closest("li");
});

table.addEventListener("dragend", () => {
  draggingElement.classList.remove("dragging");
  draggingElement = null;
});

table.addEventListener("dragover", e => {
  e.preventDefault();
  const selected = e.target.closest("li");
  if (selected) selected.classList.add("over");
});

table.addEventListener("dragleave", e => {
  const selected = e.target.closest("li");
  if (selected) selected.classList.remove("over");
});

table.addEventListener("drop", e => {
  const selected = e.target.closest("li");
  swapItem(draggingElement, selected);
  selected.classList.remove("over");
});

check.addEventListener("click", () => {
  checkOrder();
});
