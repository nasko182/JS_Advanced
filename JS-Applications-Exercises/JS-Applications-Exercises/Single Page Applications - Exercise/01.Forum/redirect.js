import { showDetails } from "./details.js";

let home = document.getElementById(`home`);
let details = document.getElementById(`details`);


export function redirect(){
    document.querySelector(`nav ul li a`).addEventListener(`click`,goHome);
    document.querySelectorAll(`topic-name-wrapper`).forEach(t=> t.addEventListener('click',goToDetail));
    
}
export function goToDetail(){
    home.style.display=`none`;
    details.style.display=`block`;
    showDetails();
}
function goHome(){
    home.style.display=`block`;
    details.style.display=`none`;
}