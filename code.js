
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

        let buttonDone = document.createElement("button");
        buttonDone.textContent = "k";
        buttonDone.classList.add("buttonDone");
        buttonDone.addEventListener("click", () => {
            tasks[i].isDone = !tasks[i].isDone;
        });

        let textArea = document.createElement("textarea");
        textArea.textContent = tasks[i].name;
        textArea.classList.add("name");
        textArea.addEventListener("input", () => {
            tasks[i].name = textArea.value;
            console.log(textArea.value);
        });

        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "x";
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