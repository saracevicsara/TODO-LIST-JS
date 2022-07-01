//SELECTORS
const todoinput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");
const filteroption = document.querySelector(".filter-todo");
//EVENT LISTENERS
window.addEventListener("DOMContentLoaded", gettodos);
todobutton.addEventListener("click", addTodo);
todolist.addEventListener("click", deletecheck);
filteroption.addEventListener("click", filtertodo);
//FUNCTIONS
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //todo div
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo");
  //create li
  const newtodo = document.createElement("li");
  newtodo.innerText = todoinput.value;
  newtodo.classList.add("todo-item");
  tododiv.appendChild(newtodo);
  //add tod to local storeg
  savelocaltodos(todoinput.value);
  //check mark button
  const completedbutton = document.createElement("button");
  completedbutton.innerHTML = "<i class='fas fa-check'></i>";
  completedbutton.classList.add("complete-btn");
  tododiv.appendChild(completedbutton);
  //check trash button
  const trashbutton = document.createElement("button");
  trashbutton.innerHTML = "<i class='fas fa-trash '></i>";
  trashbutton.classList.add("trash-btn");
  tododiv.appendChild(trashbutton);
  //Append to list
  todolist.appendChild(tododiv);
  //clear input
  todoinput.value = "";
}
function deletecheck(e) {
  const item = e.target;

  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //COMPLETE TODO
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
//FILTER TODO
function filtertodo(e) {
  const todos = todolist.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}
//local todos

function savelocaltodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function gettodos() {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //todo div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    //create li
    const newtodo = document.createElement("li");
    newtodo.innerText = todo;
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);
    //check mark button
    const completedbutton = document.createElement("button");
    completedbutton.innerHTML = "<i class='fas fa-check'></i>";
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);
    //check trash button
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = "<i class='fas fa-trash '></i>";
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);
    //Append to list
    todolist.appendChild(tododiv);
  });
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoindex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoindex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// localStorage.clear();
