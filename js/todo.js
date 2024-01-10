const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

function filterToDo(arrayID, liTagID)
{
    console.log(arrayID !== liTagID);
    return arrayID !== liTagID;
}

function deleteToDo(event)
{
    const liTag = event.target.parentNode;
    liTag.remove();
    //toDos = toDos.filter((item) => item.id !== parseInt(liTag.id));
    toDos = toDos.filter(item => filterToDo(item.id, parseInt(liTag.id)));
    saveToDo();
}

let toDos = [];

function saveToDo()
{
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function paintToDo(newToDo)
{
    const liTag = document.createElement("li");
    console.dir(liTag);
    liTag.id = newToDo.id;
    const spanTag = document.createElement("span");
    spanTag.innerText = newToDo.text;

    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);

    liTag.appendChild(spanTag);
    liTag.appendChild(button);

    toDoList.appendChild(liTag);
}

function handleToDoSubmit(event)
{
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text:newToDo,
        id: Date.now(),
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDo();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null)
{
    const parseToDos = JSON.parse(savedToDos);
    toDos = parseToDos;
    parseToDos.forEach(paintToDo);
}