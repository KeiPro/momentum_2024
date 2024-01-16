import { USER_NAME_KEY } from "./greetings.js";

const MAIN_GOAL_KEY = "main_goal";
const COMPLETE_GOAL_KEY = "main_goal_complete";

const mainGoalContainer = document.querySelector(".main-goal-container");
const mainGoalForm = document.getElementById("main-goal-form");
const mainGoalInput = mainGoalForm.querySelector("input");
const textMeasure = mainGoalForm.querySelector("#text-measure");

const mainGoalTitle = document.querySelector(".main-goal-title");
const mainGoalText = document.querySelector(".main-goal");

const mainGoalItem = mainGoalContainer.querySelector(".main-goal-item");
const mainGoalCheckBox = mainGoalItem.querySelector(".check-box");
const mainGoalEditButton = mainGoalItem.querySelector(".main-goal-edit");

const HIDDEN_CLASSNAME = "hidden";

function handleMainGoalSubmit(event)
{
    //새로고침 초기화.
    event.preventDefault();

    //main-goal-title의 문구 변경.
    showMainGoalTitle(true);
    toggleMainGoalDisplay(true);

    //main-goal 변경.
    const newMainGoal = mainGoalInput.value;
    mainGoalText.innerText = newMainGoal;
    prevMainGoal = newMainGoal;
    
    //main-goal 데이터 저장.
    localStorage.setItem(MAIN_GOAL_KEY, newMainGoal);
    localStorage.setItem(COMPLETE_GOAL_KEY, 'false');

    refreshMainGoalCheckBox();
}

let prevMainGoal = "";

function toggleMainGoalDisplay(hasMainGoal)
{
    if(hasMainGoal)
    {
        mainGoalForm.classList.add(HIDDEN_CLASSNAME);
        mainGoalText.classList.remove(HIDDEN_CLASSNAME);
        mainGoalItem.classList.remove(HIDDEN_CLASSNAME);
    }
    else
    {
        mainGoalForm.classList.remove(HIDDEN_CLASSNAME);
        mainGoalInput.value = prevMainGoal;

        mainGoalText.classList.add(HIDDEN_CLASSNAME);
        mainGoalItem.classList.add(HIDDEN_CLASSNAME);
    }
}

function showMainGoalTitle(hasMainGoal)
{
    if(hasMainGoal)
    {
        mainGoalTitle.innerText = "Today";
    }
    else
    {
        mainGoalTitle.innerText = "What is your main goal for today?";
    }
}

function updateInputWidth()
{
    const baseWidth = 400; // 기본 너비
    textMeasure.textContent = mainGoalInput.value;
    const newWidth = textMeasure.offsetWidth < baseWidth ? baseWidth : textMeasure.offsetWidth; // 여백 추가
    mainGoalInput.style.width = newWidth + 'px';
}

function editMainGoal()
{
    showMainGoalTitle(false);
    toggleMainGoalDisplay(false);

    mainGoalInput.focus();
    updateInputWidth();
    mainGoalInput.addEventListener('input', updateInputWidth);
    mainGoalForm.addEventListener("submit", handleMainGoalSubmit);
}

function refreshMainGoalCheckBox()
{
    const isChecked = localStorage.getItem(COMPLETE_GOAL_KEY) === 'true';
    mainGoalCheckBox.checked = isChecked;
    mainGoalCheckBox.nextElementSibling.style.textDecoration = isChecked ? 'line-through' : 'none';
}

function changeCheckBoxState()
{
    const todoText = mainGoalCheckBox.nextElementSibling;
    if(this.checked) {
        todoText.style.textDecoration = 'line-through';
        localStorage.setItem(COMPLETE_GOAL_KEY, 'true');
    }else {
        todoText.style.textDecoration = 'none';
        localStorage.setItem(COMPLETE_GOAL_KEY, 'false');
    }
}

function loginSuccess()
{
    mainGoalContainer.classList.remove(HIDDEN_CLASSNAME);
    editMainGoal();

    mainGoalCheckBox.addEventListener('change', changeCheckBoxState);
    mainGoalEditButton.addEventListener('click', editMainGoal);
}

//---------------------------------------------------------------------------------//

const savedUserName = localStorage.getItem(USER_NAME_KEY);
if(savedUserName !== null)
{
    const savedMainGoal = localStorage.getItem(MAIN_GOAL_KEY);
    if(savedMainGoal !== null)
    {
        showMainGoalTitle(true);
        toggleMainGoalDisplay(true);

        mainGoalText.innerText = savedMainGoal;
        prevMainGoal = savedMainGoal;

        refreshMainGoalCheckBox();
    }
    else
    {
        editMainGoal();
    }

    mainGoalCheckBox.addEventListener('change', changeCheckBoxState)
    mainGoalEditButton.addEventListener('click', editMainGoal);
}
else
{
    mainGoalContainer.classList.add(HIDDEN_CLASSNAME);
    document.addEventListener('loginSuccess', loginSuccess);
}

