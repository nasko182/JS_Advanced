import {html,render} from "./node_modules/lit-html/lit-html.js"
import { cats } from "./catSeeder.js";

let root = document.getElementById(`allCats`);

let catCard = (cat) =>html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onToggle}>Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
            </div>
            </div>
            </li>`;


render(cats.map(catCard),root);

function onToggle(event){
    let parent = event.target.parentElement;
    let div = parent.querySelector(`div.status`);
    if(div.style.display===`block`){
        event.target.textContent=`Show status code`;
        div.style.display=`none`;
    }else{
        event.target.textContent=`Hide status code`;
        div.style.display=`block`;
    }
}