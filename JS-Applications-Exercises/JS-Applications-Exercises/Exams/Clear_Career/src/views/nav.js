import { logout } from "../api/user.js";
import { html,render,page } from "../lib.js"
import { getUserData } from "../util.js";

const nav = document.querySelector(`header`);

const navTemplate = (hasUser) =>html`
    <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.jpg" alt=""
        /></a>

        <nav>
          <div>
            <a href="/catalog">Dashboard</a>
          </div>

    ${navControl(hasUser)}
</nav>`;

function navControl(hasUser){
    if(hasUser){
    return  html`
    <div class="user">
            <a href="/create">Create Offer</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
          </div>
          `
    }
    else{
        return html`
         <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        `
    }
}

export function updateNav(){
    const user = getUserData();

    render(navTemplate(user),nav);
}

function onLogout(){
    logout();
    updateNav();
    page.redirect(`/`);
}