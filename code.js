
const buttonAdd = document.querySelector("#todo .buttonAdd");

const todoTasks = document.querySelector("#todo .tasks");




var tasks = [
    {
        "name": "Testing task",
        "isDone": false
    }
]


buttonAdd.addEventListener("click", () => {

    tasks.push(
        {
            "name":"",
            "isDone": false
        }
    );
    updateTasks();
})

const updateTasks = () => {
    let toRemove = todoTasks.querySelectorAll(".task");
    toRemove.forEach(element => {
        todoTasks.removeChild(element);
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
            
        });

        let textArea = document.createElement("textarea");
        textArea.textContent = tasks[i].name;
        textArea.classList.add("name");
        textArea.addEventListener("input", () => {
            tasks[i].name = textArea.value;
        });

        let buttonRemove = document.createElement("button");
        buttonRemove.innerHTML = "<svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>" +
            "<path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/>" +
            "</svg>";
        buttonRemove.classList.add("buttonRemove");
        buttonRemove.addEventListener("click", () => {
            tasks.splice(i, 1);
            updateTasks();
        });

        task.append(buttonDone);
        task.append(textArea);
        task.append(buttonRemove);


        todoTasks.insertBefore(task, buttonAdd);
    }
}

updateTasks();