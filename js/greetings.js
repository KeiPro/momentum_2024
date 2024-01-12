const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

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

function showGreeting()
{
    const username = localStorage.getItem(USER_NAME_KEY);

    const date = new Date();
    const hour = date.getHours();

    if(hour >= 5 && hour < 12)
    {
        greeting.innerText = `Good morning, ${username}`;
    }
    else if(hour >= 12 && hour < 18)
    {
        greeting.innerText = `Good afternoon, ${username}`;
    }
    else if(hour >= 18 && hour < 22)
    {
        greeting.innerText = `Good evening, ${username}`;
    }
    else
    {
        greeting.innerText = `Good night, ${username}`;
    }

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