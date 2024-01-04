'use strict'
//<span>помыть посуду </span><button id = "done">done</button> <button id = "del">del</button>
let form = document.querySelector("#form");
let task = document.querySelector("#entertask");
let dataSwitch = document.querySelector("#switchStatus");

form.addEventListener("submit", addNewTaskToHTML );
document.onclick = workWithButtons;
dataSwitch.addEventListener("change", updateStatus);
let tasks = []; 

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(taskMas => {
        addTaskFromMassive(taskMas);
    });
}
//функции
function workWithButtons (event) {
    if (event.target.id == "done" ) {
        event.target.parentNode.dataset.todoStatus = "done";
        changeStatus (event, "done");
        
    }
    if (event.target.id == "removeTask" ) {
        if (event.target.parentNode.dataset.todoStatus == "deleted") {
            event.target.parentNode.dataset.todoStatus = "done";
            changeStatus (event, "done");
            addToLS();
            return;
        }
        event.target.parentNode.dataset.todoStatus = "active";
        changeStatus (event, "active");
        
    }
    if (event.target.id == "del" ) {
        if (event.target.parentNode.dataset.todoStatus == "deleted") {
            event.target.parentNode.remove();
            deleteFromMassive(event);
            addToLS();
            return ;
        }
        event.target.parentNode.dataset.todoStatus = "deleted";
        changeStatus (event, "deleted");
    
    }
}

function updateStatus () {
    taskList.dataset.switchValue = dataSwitch.value;
    if(dataSwitch.value == "done" || dataSwitch.value == "deleted") {
        entertask.setAttribute("disabled", "");
        plus.setAttribute("disabled", "");
    }
    else {
        entertask.removeAttribute("disabled");
        plus.removeAttribute("disabled");
    }
}

function addNewTaskToHTML (e) {
    e.preventDefault();
    let taskMas = {
        id : Date.now(),
        text : task.value,
        status : "active",
    }
    tasks.push(taskMas);
    addTaskFromMassive(taskMas); 
    task.focus();
    addToLS();
    
}

function changeStatus (event,nextStatus) {
    let id = event.target.parentNode.id;
    let currentTask = tasks.find((task) => task.id==id)
    currentTask.status = nextStatus;
    addToLS();
}

function deleteFromMassive (event) {
    let id = event.target.parentNode.id;
    let currentTask = tasks.findIndex((task) => task.id==id);
    tasks.splice(currentTask, 1);
    addToLS();
}

function addToLS () {
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}

function addTaskFromMassive (taskMas) {
    let taskValue=taskMas.text;
    if (taskValue == "") return;
    let taskHTML = `<div class = "tasks" id=${taskMas.id} data-todo-status=${taskMas.status}>
    <span>${taskValue}</span><button id = "del"></button><button id = "done"></button><button id = "removeTask"></button>
    </div>`;
    taskList.insertAdjacentHTML("beforeend", taskHTML)
    task.value = "";
}