const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("#login-form input");
const greetingText = document.querySelector("#greeting__text");
const greetingContainer = document.querySelector("#greeting-container");
const greetingEdit = document.querySelector(".greeting-edit");

const HIDDEN_CLASSNAME = "hidden";
export const USER_NAME_KEY = "username";

function onLoginSubmit(event)
{
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);   
    localStorage.setItem(USER_NAME_KEY, loginInput.value);
    showGreeting();

    document.dispatchEvent(new CustomEvent('loginSuccess'));
}

function editUsername()
{
    greetingContainer.classList.add(HIDDEN_CLASSNAME);
    loginForm.classList.remove(HIDDEN_CLASSNAME);

    loginForm.addEventListener("submit", onLoginSubmit);
}

function showGreeting()
{
    const username = localStorage.getItem(USER_NAME_KEY);

    const date = new Date();
    const hour = date.getHours();

    if(hour >= 5 && hour < 12)
    {
        greetingText.innerText = `Good morning, ${username}`;
    }
    else if(hour >= 12 && hour < 18)
    {
        greetingText.innerText = `Good afternoon, ${username}`;
    }
    else if(hour >= 18 && hour < 22)
    {
        greetingText.innerText = `Good evening, ${username}`;
    }
    else
    {
        greetingText.innerText = `Good night, ${username}`;
    }

    greetingContainer.classList.remove(HIDDEN_CLASSNAME);
    greetingEdit.addEventListener('click', editUsername);
}

const savedUsername = localStorage.getItem(USER_NAME_KEY);
if(savedUsername === null)
{
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
}
else
{
    // show the greeting
    showGreeting();
}