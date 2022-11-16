import { goHome, goToMovie } from "./redirect.js";


export async function LoadMovies(){
    let list = document.getElementById(`movies-list`);
    list.innerHTML=``;
    let movies = await createRequest(`GET`,null);

    for (const movie of movies) {
        let li = document.createElement(`li`);

        let detailsBtn=document.createElement(`button`);
        detailsBtn.addEventListener(`click`,()=>{
            sessionStorage.setItem(`movie`,JSON.stringify(movie));
            goToMovie();
        });

        let name = document.createElement(`p`);
        name.textContent = movie.title;

        li.appendChild(name);
        li.appendChild(detailsBtn);

        list.appendChild(li);
    }


}

export function createMovie(event){
    event.preventDefault();

    let body = getData(event);

    createRequest(`POST`,body);

    goHome();
}

function getData(event){

    let {title,img,description} = Object.fromEntries(new FormData(event.target));

    let body = {title,img,description};

    return body;
}

async function createRequest(method,body){
    let header = getHeader(method, body)
    let response = await fetch(`http://localhost:3030/data/movies `, header);
    
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