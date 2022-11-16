import { onLogin } from "./login.js";
import { onRegister } from "./register.js";
import { onLogout } from "./logout.js";
import { createMovie, LoadMovies } from "./home.js";
import { editMovie, showMovie } from "./movieDetail.js";

let sections = document.querySelectorAll(`section`);
let users = document.querySelectorAll(`.nav-item.user`);
let guests = document.querySelectorAll(`.nav-item.guest`);
let moviesBtn= document.querySelector(`.navbar-brand.text-light`);
let loginBtn = [...document.querySelectorAll(`.nav-item.guest`)].find(e=>e.outerText===`Login`);
let registerBtn = [...document.querySelectorAll(`.nav-item.guest`)].find(e=>e.outerText===`Register`);
let logoutBtn = [...document.querySelectorAll(`.nav-item.user`)].find(e=>e.outerText===`Logout`);
let formLogin = document.getElementById(`login-form`);
formLogin.addEventListener(`submit`,onLogin)
let formRegister = document.getElementById(`register-form`);
formRegister.addEventListener(`submit`,onRegister);
let welcome = document.getElementById(`welcome-msg`);


function hideAll() {
    sections.forEach(s => s.style.display = `none`);
}

function hideUser() {
    users.forEach(e => e.style.display = `none`);
    guests.forEach(e => e.style.display = `block`);
}

function hideGuest() {
    users.forEach(e => e.style.display = `block`);
    guests.forEach(e => e.style.display = `none`);
}

export function redirect(){
    goHome();
    if(sessionStorage.getItem(`userData`)){
        let userData = JSON.parse(sessionStorage.getItem(`userData`));
        hideGuest();
        welcome.textContent=`Welcome, `+userData.email;
    }
    else{
        hideUser();
    }
    loginBtn.addEventListener(`click`,goLogin);
    registerBtn.addEventListener(`click`,goRegister);
    moviesBtn.addEventListener(`click`,goHome);
    logoutBtn.addEventListener(`click`,onLogout);
    document.querySelector(`#add-movie-button a`).addEventListener(`click`,goAddMovie)

}

export function goToMovie(){
    hideAll();
    document.querySelector(`#movie-example`).style.display = `block`;
    showMovie();
}

function goAddMovie(){
    hideAll();
    let sectionAddMovie = document.querySelector(`#add-movie`);
    sectionAddMovie.style.display = `block`;
    sectionAddMovie.querySelector(`form`).addEventListener(`submit`,createMovie);
    
}

export function goHome() {
    hideAll();
    document.querySelector(`#home-page`).style.display = `block`;
    if(sessionStorage.getItem(`userData`)){
        showUserContent();
    }
}

function showUserContent(){
    document.querySelector(`#add-movie-button`).style.display = `block`;
    LoadMovies();
    document.querySelector(`#movie`).style.display = `block`;
}

export function goLogin(){
    hideAll();
    document.querySelector(`#form-login`).style.display = `block`;
}

export function goRegister(){
    hideAll();
    document.querySelector(`#form-sign-up`).style.display = `block`;
}

export function goEditMovie(movie){
    hideAll();
    let sectionEditMovie =document.getElementById(`edit-movie`);
    sectionEditMovie.style.display=`block`;

    let title = document.getElementById(`title-edit`);
    let img = document.getElementById(`imageUrl-edit`);
    let description = sectionEditMovie.querySelector(`textarea`);

    title.value =movie.title;
    img.value = movie.img;
    description.value = movie.description;

    sectionEditMovie.querySelector(`form`).addEventListener(`submit`,editMovie);
}

