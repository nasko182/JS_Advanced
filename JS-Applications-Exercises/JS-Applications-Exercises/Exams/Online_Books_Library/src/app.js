import { html,page,render } from "../src/lib.js";
import { showEdit } from "./views/edit.js";
import { getUserData } from "./util.js";
import { showAddBook } from "./views/addBook.js";
import { showCatalog } from "./views/catalog.js";
import { showDetails } from "./views/details.js";
import { showLogin } from "./views/login.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/register.js";
import { showMyBooks } from "./views/myBook.js";

const main = document.querySelector(`main`);

page(decorateCtx);
// page(`/`,()=>console.log(`home`));
page(`/catalog`,showCatalog);
page(`/catalog/:id`,showDetails);
page(`/edit/:id`,showEdit);
page(`/login`,showLogin);
page(`/register`,showRegister);
page(`/myBooks`,showMyBooks);
page(`/addBook`,showAddBook);
updateNav();
page.start();

function renderMain(content){
    render(content,main);
}

function decorateCtx(ctx,next){
    ctx.render=renderMain;
    ctx.updateNav=updateNav;

    let user = getUserData();

    if(user){
        ctx.user = user;
    }
    next();
}