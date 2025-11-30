//
// Всё про данные
//

var arrayToDo = [
    {
        "name": "Example task",
        "isDone": false
    }
]
var arrayInProgress = []
var arrayDone = []

var currentTask;
var currentTable;
var currentIndex;

const loadArray = () => {
    arrayToDo = localStorage.getItem("arrayToDo") != null ? JSON.parse(localStorage.getItem("arrayToDo")) : arrayToDo
    arrayInProgress = localStorage.getItem("arrayInProgress") != null ? JSON.parse(localStorage.getItem("arrayInProgress")) : arrayInProgress
    arrayDone = localStorage.getItem("arrayDone") != null ? JSON.parse(localStorage.getItem("arrayDone")) : arrayDone
}

const saveArray = () => {
    localStorage.setItem("arrayToDo", JSON.stringify(arrayToDo));
    localStorage.setItem("arrayInProgress", JSON.stringify(arrayInProgress));
    localStorage.setItem("arrayDone", JSON.stringify(arrayDone));
}

const appendTask = (arrayObject, appendingObject) => {
    arrayObject.push(appendingObject);
    saveArray();
}

const insertTask = (arrayObject, insertingObject, index) => {
    arrayObject.splice(index, 0, insertingObject);
    saveArray();
}

const removeTask = (arrayObject, index) => {
    arrayObject.splice(index, 1);
    saveArray();
}