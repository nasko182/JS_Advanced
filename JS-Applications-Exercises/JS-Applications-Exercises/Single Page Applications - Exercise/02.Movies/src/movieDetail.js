import { goEditMovie, goToMovie, goHome } from "./redirect.js";

let section = document.getElementById(`movie-example`);
section.innerHTML = ``;
let userData = JSON.parse(sessionStorage.getItem(`userData`));
let movie = JSON.parse(sessionStorage.getItem(`movie`));

export async function showMovie() {
    let movie = JSON.parse(sessionStorage.getItem(`movie`));
    section.innerHTML = `<div class="container">
    <div class="row bg-light text-dark">
      <h1>Movie title: ${movie.title}</h1>

      <div class="col-md-8">
        <img
          class="img-thumbnail"
          src="${movie.img}"Movie"
        />
      </div>
      <div class="col-md-4 text-center">
        <h3 class="my-3">Movie Description</h3>
        <p>
         ${movie.description}
        </p>
      </div>
    </div>
  </div>`
    if (movie._ownerId === userData._id) {

        let deleteA = document.createElement(`a`);
        deleteA.classList.add(`btn`);
        deleteA.classList.add(`btn-danger`);
        deleteA.setAttribute(`href`, `javascript:void(0)`)
        deleteA.innerHTML = `Delete`;
        deleteA.addEventListener(`click`, deleteMovie)

        let editA = document.createElement(`a`);
        editA.classList.add(`btn`);
        editA.classList.add(`btn-warning`);
        editA.setAttribute(`href`, `javascript:void(0)`)
        editA.innerHTML = `Edit`;
        editA.addEventListener(`click`, () => {
            goEditMovie(movie);
        })

        let likeA = document.createElement(`a`);
        likeA.classList.add(`btn`);
        likeA.classList.add(`btn-primary`);
        likeA.setAttribute(`href`, `javascript:void(0)`)
        likeA.innerHTML = `Like`;
        likeA.addEventListener(`click`, () => {
            giveLike();
        });

        let span = document.createElement(`span`);
        span.classList.add(`enrolled-span`);
        span.innerHTML = `Liked ${await getLikes()}`;

        section.querySelector(`div.col-md-4`).appendChild(deleteA);
        section.querySelector(`div.col-md-4`).appendChild(editA);
        section.querySelector(`div.col-md-4`).appendChild(likeA);
        section.querySelector(`div.col-md-4`).appendChild(span);
    }
    else {
        let likeA = document.createElement(`a`);
        likeA.classList.add(`btn`);
        likeA.classList.add(`btn-primary`);
        likeA.setAttribute(`href`, `javascript:void(0)`)
        likeA.innerHTML = `Like`;
        likeA.addEventListener(`click`, () => {
            giveLike(userData._id);
        });
        section.querySelector(`div.col-md-4`).appendChild(likeA);
    }
}

async function getLikes(){
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22&distinct=_ownerId&count`);


    let data = await response.json();

    return data;
    
}

async function giveLike() {
let header = getHeader(`POST`, {
    movieId:movie._id})
    await fetch(`http://localhost:3030/data/likes`, header);
    showMovie();
}


function deleteMovie() {
    let header = getHeader(`DELETE`, null)

    fetch(`http://localhost:3030/data/movies/${movie._id}`, header);

    goHome();
}

export async function editMovie(event) {
    event.preventDefault();
    let movie = JSON.parse(sessionStorage.getItem(`movie`));

    let body = getData(event);

    let data = await createRequest(`PUT`, body, movie._id);

    sessionStorage.setItem(`movie`, JSON.stringify(data));
    goToMovie(data);
}

async function createRequest(method, body, id) {
    let header = getHeader(method, body)
    let response = await fetch(`http://localhost:3030/data/movies/${id} `, header);

    let data = await response.json();

    return data;
}

function getHeader(method, body) {
    let userData = JSON.parse(sessionStorage.getItem(`userData`));
    let token = userData.accessToken;
    let obj = {
        method: method,
        headers: {
            'Content-Type': `application/json`,
            'X-Authorization': token
        }
    }
    if (body) {
        obj.body = JSON.stringify(body);
    }

    return obj;
}

function getData(event) {

    let { title, img, description } = Object.fromEntries(new FormData(event.target));

    let body = { title, img, description };

    return body;
}
