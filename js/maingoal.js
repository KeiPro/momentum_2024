import { USER_NAME_KEY } from "./greetings.js";

const MAIN_GOAL_KEY = "main_goal";

const mainGoalContainer = document.querySelector(".main-goal-container");
const mainGoalForm = document.getElementById("main-goal-form");
const mainGoalInput = mainGoalForm.querySelector("input");
const mainGoalTitle = document.querySelector(".main-goal-title");
const mainGoalText = document.querySelector(".main-goal");

const HIDDEN_CLASSNAME = "hidden";

function handleMainGoalSubmit(event)
{
    //새로고침 초기화.
    event.preventDefault();

    //main-goal-title의 문구 변경.
    showMainGoalTitle(true);
    switchMainGoalState(true);

    //main-goal 변경.
    const newMainGoal = mainGoalInput.value;
    mainGoalText.innerText = newMainGoal;

    //main-goal 데이터 저장.
    localStorage.setItem(MAIN_GOAL_KEY, newMainGoal);
}

function switchMainGoalState(hasMainGoal)
{
    if(hasMainGoal)
    {
        mainGoalForm.classList.add(HIDDEN_CLASSNAME);
        mainGoalText.classList.remove(HIDDEN_CLASSNAME);
    }
    else
    {
        mainGoalForm.classList.remove(HIDDEN_CLASSNAME);
        mainGoalText.classList.add(HIDDEN_CLASSNAME);
    }
}

function showMainGoalTitle(hasMainGoal)
{
    if(hasMainGoal)
    {
        mainGoalTitle.innerText = "You've got this in the bag!";
    }
    else
    {
        mainGoalTitle.innerText = "What is your main goal for today?";
    }
}

const savedUserName = localStorage.getItem(USER_NAME_KEY);
if(savedUserName === null)
{
    mainGoalContainer.classList.add(HIDDEN_CLASSNAME);

    document.addEventListener('loginSuccess', function() {
        mainGoalContainer.classList.remove(HIDDEN_CLASSNAME);
        
        showMainGoalTitle(false);
        switchMainGoalState(false);
    });
}

const savedMainGoal = localStorage.getItem(MAIN_GOAL_KEY);
if(savedMainGoal !== null)
{
    showMainGoalTitle(true);
    switchMainGoalState(true);

    mainGoalText.innerText = savedMainGoal;
}
else
{
    mainGoalForm.addEventListener("submit", handleMainGoalSubmit);
}