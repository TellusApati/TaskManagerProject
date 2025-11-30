
// Константы
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BUTTON_DONE_ICON = "<svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>" +
    "<path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/>" +
    "</svg>";
const BUTTON_REMOVE_ICON = "<svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>" +
    "<path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/>" +
    "</svg>";

const buttonAddToDo = document.querySelector("#todo .buttonAdd");
const buttonAddInProgress = document.querySelector("#inprogress .buttonAdd");
const buttonAddDone = document.querySelector("#done .buttonAdd");

const toDoContainer = document.querySelector("#todo-tasks");
const inProgressContainer = document.querySelector("#inprogress-tasks");
const doneContainer = document.querySelector("#done-tasks");

const tableToDo = document.querySelector("#todo");
const tableInProgress = document.querySelector("#inprogress");
const tableDone = document.querySelector("#done");

// Дроп конкретно на столбец
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let tableDropEvent = (event, targetArray) => {
    event.preventDefault();
    if (!event.target.closest(".task")) {
        removeTask(currentTable, currentIndex);
        appendTask(targetArray, currentTask);
        renderAllTasks();
    }
};

tableToDo.addEventListener("dragover", (event) => {event.preventDefault();});
tableToDo.addEventListener("drop", (event) => {tableDropEvent(event, arrayToDo)});

tableInProgress.addEventListener("dragover", (event) => {event.preventDefault();});
tableInProgress.addEventListener("drop", (event) => {tableDropEvent(event, arrayInProgress)});

tableDone.addEventListener("dragover", (event) => {event.preventDefault();});
tableDone.addEventListener("drop", (event) => {tableDropEvent(event, arrayDone)});


// Рендер на страницу
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const renderArray = (array, container, buttonAdd) => {
    let toRemove = container.querySelectorAll(".task");
    toRemove.forEach(element => {
        container.removeChild(element);
    });

    let createTask = (index) => {
        let task = document.createElement("div");
        task.draggable = true;
        task.classList.add("task");
        task.classList.add(index);
        if (array[index].isDone) {task.classList.add("done");}
        
        task.addEventListener("dragstart", (event) => {
            event.target.style.opacity = 0.3;
            currentTable = array;
            currentIndex = index;
            currentTask = array[index];
        });
        task.addEventListener("dragend", (event) => {
            event.target.style.opacity = 1;
            renderAllTasks();
        });
        task.addEventListener("dragover", (event) => {event.preventDefault();});
        task.addEventListener("drop", (event) => {
            event.preventDefault();
            removeTask(currentTable, currentIndex);
            insertTask(array, currentTask, index);
        });

        let buttonDone = document.createElement("button");
        buttonDone.innerHTML = BUTTON_DONE_ICON;
        buttonDone.classList.add("buttonDone");
        buttonDone.addEventListener("click", () => {
            task.classList.remove("done");
            if (!array[index].isDone) {task.classList.add("done");}
            array[index].isDone = !array[index].isDone;
            saveArray();
        });
        task.append(buttonDone);

        let textArea = document.createElement("textarea");
        textArea.textContent = array[index].name;
        textArea.classList.add("name");
        textArea.maxLength = 40
        textArea.addEventListener("input", () => {
            array[index].name = textArea.value;
            saveArray();
        });
        task.append(textArea);

        let buttonRemove = document.createElement("button");
        buttonRemove.innerHTML = BUTTON_REMOVE_ICON;
        buttonRemove.classList.add("buttonRemove");
        buttonRemove.addEventListener("click", () => {
            removeTask(array, index);
            renderAllTasks();
        });
        task.append(buttonRemove);

        return task;
    }

    for (let i = 0; i < array.length; i ++) {
        container.insertBefore(createTask(i), buttonAdd);
    }
}

const renderAllTasks = () => {
    renderArray(arrayToDo, toDoContainer, buttonAddToDo);
    renderArray(arrayInProgress, inProgressContainer, buttonAddInProgress);
    renderArray(arrayDone, doneContainer, buttonAddDone);
}

// Кнопки добавления
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let buttonAddEvent = (targetTask) => {
    appendTask(targetTask, {
            "name":"",
            "isDone": false
        });
    renderAllTasks();
}
buttonAddToDo.addEventListener("click", () => {buttonAddEvent(arrayToDo)});
buttonAddInProgress.addEventListener("click", () => {buttonAddEvent(arrayInProgress)});
buttonAddDone.addEventListener("click", () => {buttonAddEvent(arrayDone)});

// Инициализация
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

loadArray();
renderAllTasks();