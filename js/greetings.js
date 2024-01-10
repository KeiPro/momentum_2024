const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USER_NAME_KEY = "username";

function onLoginSubmit(event)
{
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);   
    localStorage.setItem(USER_NAME_KEY, loginInput.value);
    showGreeting();
}

function showGreeting()
{
    const username = localStorage.getItem(USER_NAME_KEY);
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
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