const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const progressList = document.getElementById("progressList");
const doneList = document.getElementById("doneList");

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = createTask(taskText);
  todoList.appendChild(task);
  taskInput.value = "";
});

function createTask(text) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");
  task.innerText = text;

  // drag events
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);

  return task;
}

// drag events for columns
const columns = document.querySelectorAll(".task-list");

columns.forEach((col) => {
  col.addEventListener("dragover", dragOver);
  col.addEventListener("drop", drop);
});

let draggedTask = null;

function dragStart(e) {
  draggedTask = this;
  setTimeout(() => (this.style.display = "none"), 0);
}

function dragEnd() {
  this.style.display = "block";
  draggedTask = null;
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  if (draggedTask) {
    this.appendChild(draggedTask);
  }
}
