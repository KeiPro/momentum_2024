import { USER_NAME_KEY } from "./greetings.js";

const todoButton = document.querySelector(".stdl__toggle")
const todoListContainer = document.querySelector('.to-do-list__container');
const addListButton = todoListContainer.querySelector('.stdl__add-button');

const TODOS_KEY = "todos";
const HIDDEN_CLASSNAME = "hidden";

let isToggleChanging = false;
let currEditingText = null;
let toDos = [];
let newLITag;

function toggleTodoButton()
{
    if(isToggleChanging)
        return;

    isToggleChanging = true;

    const toggleOn = () => {
        todoListContainer.classList.remove(HIDDEN_CLASSNAME);
        setTimeout(() => {
            todoListContainer.style.opacity = '1';
            todoListContainer.style.transform = 'translateY(0) scale(1)';
            isToggleChanging = false;
        }, 10);
    };

    const toggleOff = () => {
        todoListContainer.style.opacity = '0';
        todoListContainer.style.transform = 'translateY(10px) scale(0.95)';
        setTimeout(() => {
            todoListContainer.classList.add(HIDDEN_CLASSNAME);
            isToggleChanging = false;
        }, 100);
    }

    todoListContainer.classList.contains(HIDDEN_CLASSNAME) ? toggleOn() : toggleOff();
}

function changeCheckBoxState(event)
{
    const liTag = event.target.parentNode;
    const targetIndex = toDos.findIndex(item => item.id === parseInt(liTag.id));
    const todoText = event.target.nextElementSibling;
    const isChecked = event.target.checked;

    todoText.style.textDecoration = isChecked ? 'line-through' : 'none';
    toDos[targetIndex].complete = isChecked.toString();
    saveToDo();
}


function filterToDo(arrayID, liTagID)
{
    return arrayID !== liTagID;
}

function deleteToDo(event)
{
    const liTag = event.target.parentNode;
    liTag.remove();
    toDos = toDos.filter(item => filterToDo(item.id, parseInt(liTag.id)));
    saveToDo();
}

function saveToDo()
{
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function handleOutsideClick(event) {
    if (event.target === currEditingText)
        return; 

    const newTextIsEmpty = currEditingText.textContent === "" && newLITag !== null;
    if(newTextIsEmpty)
    {
        newLITag.remove();
        newLITag = null;

        toDos = toDos.filter(item => filterToDo(item.id, parseInt(currEditingText.parentElement.id)));
    }
    else
    {
        updateToDosArray(currEditingText.parentElement.id, currEditingText.textContent);
    }

    disableEditingMode();
}

function disableEditingMode() {
    if (currEditingText) {
        currEditingText.setAttribute('contenteditable', 'false');
        currEditingText.blur();
        currEditingText = null;
    }
    disableOtherButton(false);
    document.removeEventListener('click', handleOutsideClick);
}

function disableOtherButton(disable)
{
    const buttons = document.querySelectorAll('.stdl__add-button, .check-box, .fa-regular');
    buttons.forEach(button => {
        button.style.pointerEvents = disable ? 'none' : 'auto';
    });
}

function makeEditable(editText) {
    disableOtherButton(true);

    editText.setAttribute('contenteditable', 'true');
    editText.focus();
    document.addEventListener('click', handleOutsideClick);
}

function updateToDosArray(parentId, newTextContent)
{
    const liTagID = parseInt(parentId, 10);
    const index = toDos.findIndex(todo => todo.id === liTagID);
    toDos[index].text = newTextContent;

    saveToDo();
}

function addTodoTextEventListener(todoText)
{
    todoText.addEventListener('dblclick', function(){
        this.setAttribute('contenteditable', 'true');
        this.focus();
        document.addEventListener('click', handleOutsideClick);

        currEditingText = this;
        newLITag = null;
    });

    todoText.addEventListener('keydown', function(event){
        if (event.key === 'Enter') {
            event.preventDefault();

            updateToDosArray(this.parentElement.id, this.textContent);
            disableEditingMode();
            
            newLITag = null;
        }
    });

    todoText.addEventListener('focus', function(){
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(this); // 텍스트 내용을 범위로 선택
        range.collapse(false); // 범위의 끝(텍스트의 끝)으로 collapse

        selection.removeAllRanges(); // 기존 선택 범위 제거
        selection.addRange(range); // 새 범위를 선택 범위로 추가
    });
}

function paintTodo(newToDo)
{
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.id = newToDo.id;
    newLITag = todoItem;

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('check-box');
    checkBox.addEventListener('change', changeCheckBoxState);
    
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.setAttribute('contenteditable', 'false');
    todoText.textContent = newToDo.text;
    currEditingText = todoText;
    
    const isComplete = newToDo.complete === "true";
    checkBox.checked = isComplete;
    if(isComplete)
        todoText.style.textDecoration = 'line-through';
    else
        todoText.style.textDecoration = 'none';

    addTodoTextEventListener(todoText);

    // X 아이콘 (i 태그) 생성
    const xIcon = document.createElement('i');
    xIcon.classList.add('fa-regular', 'fa-x');
    xIcon.addEventListener('click', deleteToDo);

    // li 요소에 자식 요소들 추가
    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(xIcon);

    // ul에 새로운 li 요소 추가
    const todoList = document.getElementById('todo-list');
    todoList.appendChild(todoItem);
}

function addTodoList()
{
    const newTodo = {
        id:Date.now(),
        text:'',
        complete:"false",
    }

    toDos.push(newTodo);
    paintTodo(newTodo);

    setTimeout(() => {
        makeEditable(currEditingText);
    }, 0);
}

function initEventListener()
{
    todoButton.addEventListener('click', toggleTodoButton);
    addListButton.addEventListener('click', addTodoList);
}

function init()
{
    initEventListener();

    const savedTodos = localStorage.getItem(TODOS_KEY);
    if(savedTodos){
        toDos = JSON.parse(savedTodos);
        toDos.forEach(paintTodo);
    }
}

const savedUserName = localStorage.getItem(USER_NAME_KEY);
if(savedUserName === null)
{
    todoButton.classList.add(HIDDEN_CLASSNAME);
    document.addEventListener('loginSuccess', loginSuccess);
}
else
{
    document.addEventListener('DOMContentLoaded', init);
}

function loginSuccess()
{
    init();
    todoButton.classList.remove(HIDDEN_CLASSNAME);
}