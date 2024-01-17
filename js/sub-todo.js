const todoButton = document.querySelector(".sub-to-do-list > span")
const todoListContainer = document.querySelector('.to-do-list__container');

const HIDDEN_CLASSNAME = "hidden";
let isToggleChanging = false;

function toggleToDoList()
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

todoButton.addEventListener('click', toggleToDoList);