
const buttonAddToDo = document.querySelector("#todo .buttonAdd");
const buttonAddInProgress = document.querySelector("#inprogress .buttonAdd");
const buttonAddDone = document.querySelector("#done .buttonAdd");

const tasksToDoObject = document.querySelector("#todo .tasks");
const tasksInProgressObject = document.querySelector("#inprogress .tasks");
const tasksDoneObject = document.querySelector("#done .tasks");



var tasksToDo = [
    {
        "name": "Testing task",
        "isDone": false
    }
]

var tasksInProgress = []
var tasksDone = []

if (localStorage.getItem("tasksToDo") != null) {
    tasksToDo = localStorage.getItem("tasksToDo");
}
if (localStorage.getItem("tasksInProgress") != null) {
    tasksInProgress = localStorage.getItem("tasksInProgress");
}
if (localStorage.getItem("tasksDone") != null) {
    tasksDone = localStorage.getItem("tasksDone");
}

buttonAddToDo.addEventListener("click", () => {
    tasksToDo.push(
        {
            "name":"",
            "isDone": false
        }
    );
updateTasksAll();
})
buttonAddInProgress.addEventListener("click", () => {
    tasksInProgress.push(
        {
            "name":"",
            "isDone": false
        }
    );
updateTasksAll();
})
buttonAddDone.addEventListener("click", () => {
    tasksDone.push(
        {
            "name":"",
            "isDone": false
        }
    );
updateTasksAll();
})


const updateTasks = (tasks, tasksObject, buttonAdd) => {
    let toRemove = tasksObject.querySelectorAll(".task");
    toRemove.forEach(element => {
        tasksObject.removeChild(element);
    });
    for (let i = 0; i < tasks.length; i ++) {
        let task = document.createElement("div");
        task.classList.add("task");
        if (tasks[i].isDone) {
            task.classList.add("done");
        }

        let buttonDone = document.createElement("button");
        buttonDone.innerHTML = "<svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>" +
            "<path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/>" +
            "</svg>";
        buttonDone.classList.add("buttonDone");
        buttonDone.addEventListener("click", () => {
            if (tasks[i].isDone) {
                task.classList.remove("done");
            } else {
                task.classList.add("done");
            }
            tasks[i].isDone = !tasks[i].isDone;
            saveAll();
            
        });

        let textArea = document.createElement("textarea");
        textArea.textContent = tasks[i].name;
        textArea.classList.add("name");
        textArea.maxLength = 40
        textArea.addEventListener("input", () => {
            tasks[i].name = textArea.value;
            saveAll();
        });

        let buttonRemove = document.createElement("button");
        buttonRemove.innerHTML = "<svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>" +
            "<path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/>" +
            "</svg>";
        buttonRemove.classList.add("buttonRemove");
        buttonRemove.addEventListener("click", () => {
            tasks.splice(i, 1);
            updateTasks();
            saveAll();
        });

        task.append(buttonDone);
        task.append(textArea);
        task.append(buttonRemove);


        tasksObject.insertBefore(task, buttonAdd);
    }
}

const updateTasksAll = () => {
    updateTasks(tasksToDo, tasksToDoObject, buttonAddToDo);
    updateTasks(tasksInProgress, tasksInProgressObject, buttonAddInProgress);
    updateTasks(tasksDone, tasksDoneObject, buttonAddDone);
}

const saveAll = () => {
    localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo));
    localStorage.setItem("tasksInProgress", JSON.stringify(tasksInProgress));
    localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
}

updateTasksAll();