import {render,html} from "./node_modules/lit-html/lit-html.js"

let btn = document.getElementById(`btnLoadTowns`);

btn.addEventListener(`click`,onToggle);



function onToggle(event){
    event.preventDefault();
    let towns = document.getElementById(`towns`).value.split(`, `); 

    let ul = (towns) => html`
    <ul>
        ${towns.map((town)=>html`<li>${town}</li>`)}
    </ul>
    `
    render(ul(towns),document.getElementById(`root`));
}