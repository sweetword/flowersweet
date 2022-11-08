const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDos = document.querySelector("#toDos");

const TODOLIST = "toDoList";
let toDoList = [];

function saveToDoList() {
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function saveToDo(toDo) {
  const toDoObj = {
    text: toDo,
    id: toDoList.length + 1,
  };
  toDoList.push(toDoObj);
  saveToDoList();
}

function delToDo(event) {
  const { target: button } = event;
  const li = button.parentNode;
  toDos.removeChild(li);
  toDoList = toDoList.filter((toDo) => toDo.id !== Number(li.id));
  saveToDoList();
}

function paintToDo(toDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delButton = document.createElement("button");
  delButton.innerText = "[x]";
  delButton.addEventListener("click", delToDo);
  span.innerHTML = toDo;
  li.appendChild(span);
  li.appendChild(delButton);
  li.id = toDoList.length + 1;
  toDos.appendChild(li);
}

function createToDo(event) {
  event.preventDefault();
  const toDo = toDoInput.value;
  paintToDo(toDo);
  saveToDo(toDo);
  toDoInput.value = "";
}

function loadToDoList() {
  const loadedToDoList = localStorage.getItem(TODOLIST);
  if (loadedToDoList !== null) {
    const parsedToDoList = JSON.parse(loadedToDoList);
    for (let toDo of parsedToDoList) {
      const { text } = toDo;
      paintToDo(text);
      saveToDo(text);
    }
  }
}

function init() {
  loadToDoList();
  toDoForm.addEventListener("submit", createToDo);
}
init();

// const randomValue = toDoList[Math.floor(Math.random() * toDoList.length)];
// 클래스비누 선생님이 알려주신 코드
function randomChoice(array) {
  const max = toDoList.length;
  const rand = Math.floor(Math.random() * max);
  const transLate = toDoList[rand].text;
  alert(transLate);
}
