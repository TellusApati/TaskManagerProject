
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
    todoTasks.innerHTML = "";
    for (let i = 0; i < tasks.length; i ++) {
        let element = tasks[i];
        todoTasks.innerHTML += "<div class='task'>" +
                    "<button class='buttonDone'>k</button>" +
                    "<textarea class='name'>" + element.name + "</textarea>" +
                    "<button class='buttonDelete'>x</button>" +
                    "</div>";
        let buttonDelete = todoTasks.querySelector(".buttonDelete");
        buttonDelete.addEventListener("click", () => {
            tasks.splice(i, 1);
            updateTasks();
        });
    }
}

updateTasks();