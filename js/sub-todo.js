const todoButton = document.querySelector(".stdl__toggle")
const todoListContainer = document.querySelector('.to-do-list__container');

const addListButton = todoListContainer.querySelector('.stdl__add-button');

const HIDDEN_CLASSNAME = "hidden";
let isToggleChanging = false;
let currEditingText = null;

function toggleTodoButton()
{
    if(isToggleChanging)
        return;

    isToggleChanging = true;

    if(todoListContainer.classList.contains(HIDDEN_CLASSNAME))
    {
        todoListContainer.classList.remove(HIDDEN_CLASSNAME);
        setTimeout(() => {
            todoListContainer.style.opacity = '1';
            todoListContainer.style.transform = 'translateY(0) scale(1)';
            isToggleChanging = false;
        }, 10); // display: none을 해제한 후 약간의 지연을 줍니다.
    }
    else
    {
        todoListContainer.style.opacity = '0';
        todoListContainer.style.transform = 'translateY(10px) scale(0.95)';
        setTimeout(() => {
            todoListContainer.classList.add(HIDDEN_CLASSNAME);
            isToggleChanging = false;
        }, 100); // 500ms는 transition 시간과 일치해야 합니다.
    }
}

function handleOutsideClick(event) {
    
    if (event.target !== currEditingText) {
        currEditingText.setAttribute('contenteditable', 'false');
        currEditingText.blur();
        document.removeEventListener('click', handleOutsideClick); // 포커스 해제 시 리스너 제거
        
        currEditingText = null;
    }
    
}

function addTodoList()
{
    // 새로운 li 요소 생성
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    // 체크박스 (input 태그) 생성
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('check-box');

    // 텍스트 (span 태그) 생성
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.setAttribute('contenteditable', 'false');
    todoText.textContent = 'fasdfadsfasdf';

    todoText.addEventListener('dblclick', function(){
        this.setAttribute('contenteditable', 'true');
        this.focus();
        document.addEventListener('click', handleOutsideClick);

        currEditingText = this;
    });

    todoText.addEventListener('keydown', function(event){
        if (event.key === 'Enter') { // 엔터 키의 키 코드는 13
            this.setAttribute('contenteditable', 'false');
            this.blur(); // 포커스 해제
            document.removeEventListener('click', handleOutsideClick);
            event.preventDefault(); // 엔터 키 기본 동작(줄바꿈 등) 방지

            currEditingText = null;
        }
    });

    todoText.addEventListener('focus', function(){
        const range = document.createRange();
        const selection = window.getSelection();
        console.log(selection);

        range.selectNodeContents(this); // 텍스트 내용을 범위로 선택
        range.collapse(false); // 범위의 끝(텍스트의 끝)으로 collapse

        selection.removeAllRanges(); // 기존 선택 범위 제거
        selection.addRange(range); // 새 범위를 선택 범위로 추가
    });

    // X 아이콘 (i 태그) 생성
    const xIcon = document.createElement('i');
    xIcon.classList.add('fa-regular', 'fa-x');

    // li 요소에 자식 요소들 추가
    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoText);
    // todoItem.appendChild(penIcon);
    todoItem.appendChild(xIcon);

    // ul에 새로운 li 요소 추가
    const todoList = document.getElementById('todo-list');
    todoList.appendChild(todoItem);
}

toggleTodoButton(); // 테스트를 위해 임시로 호출해주고 있음.
todoButton.addEventListener('click', toggleTodoButton);

addListButton.addEventListener('click', addTodoList);