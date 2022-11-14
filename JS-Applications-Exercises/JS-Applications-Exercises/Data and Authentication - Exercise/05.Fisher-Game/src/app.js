let userData = JSON.parse(sessionStorage.getItem(`userData`));
window.addEventListener(`DOMContentLoaded`, onLoadHTML);
let addCatchForm = document.getElementById(`addForm`);
addCatchForm.addEventListener(`submit`, addCatch);
document.querySelector(`.load`).addEventListener(`click`, onLoad);

async function onLoad() {
    let catches = document.getElementById(`catches`);
    catches.innerHTML = ``;

    let response = await fetch(`http://localhost:3030/data/catches`);
    let data = await response.json();

    for (const element of data) {
        let mainDiv = document.createElement(`div`);
        mainDiv.classList.add(`catch`);
        if (element._ownerId === userData.id) {
            mainDiv.innerHTML = `<label>Angler</label>
        <input type="text" class="angler" value="${element.angler}">
        <label>Weight</label>
        <input type="text" class="weight" value="${element.weight}">
        <label>Species</label>
        <input type="text" class="species" value="${element.species}">
        <label>Location</label>
        <input type="text" class="location" value="${element.location}">
        <label>Bait</label>
        <input type="text" class="bait" value="${element.bait}">
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${element.captureTime}">
        <button class="update" data-id="${element._id}">Update</button>
        <button class="delete" data-id="${element._id}">Delete</button>`

            mainDiv.querySelector(`.delete`).addEventListener(`click`, onDelete);
            mainDiv.querySelector(`.update`).addEventListener(`click`, onUpdate);
        } else {
            mainDiv.innerHTML = `<label>Angler</label>
        <input type="text" class="angler" value="${element.angler}">
        <label>Weight</label>
        <input type="text" class="weight" value="${element.weight}">
        <label>Species</label>
        <input type="text" class="species" value="${element.species}">
        <label>Location</label>
        <input type="text" class="location" value="${element.location}">
        <label>Bait</label>
        <input type="text" class="bait" value="${element.bait}">
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${element.captureTime}">
        <button class="update" data-id="${element._id}" disabled>Update</button>
        <button class="delete" data-id="${element._id}" disabled>Delete</button>`
        }

        catches.appendChild(mainDiv);
    }


}


async function onDelete(event) {
    let id = event.target.attributes[1].value;
    let header = getHeader(`DELETE`, null)

    let response = fetch(`http://localhost:3030/data/catches/${id}`, header);

    onLoad();
}

function onLoadHTML() {
    let btnLogout = document.querySelector(`#logout`);
    let user = document.querySelector(`#user`);
    let guest = document.querySelector(`#guest`); let catches = document.getElementById(`catches`);
    catches.innerHTML = ``;

    if (userData) {
        guest.style.display = `none`;
        user.style.display = `inline-block`;
        btnLogout.addEventListener(`click`, onLogout);
        document.querySelector(`p.email span`).textContent = userData.email;
        addCatchForm.querySelector(`.add`).disabled = false;
    }
    else {
        guest.style.display = `inline-block`;
        user.style.display = `none`;
        document.querySelector(`p.email span`).textContent = `guest`;
    }
}

async function onLogout() {
    let header = getHeader(`GET`, null)
    let response = await fetch(`http://localhost:3030/users/logout`, header);

    if (response.status === 204) {
        sessionStorage.clear();
        window.location.href = `./index.html`;
        onLoadHTML();
    }
}

async function addCatch(event) {
    event.preventDefault();

    let { angler, weight, species, location, bait, captureTime } = Object.fromEntries(new FormData(event.target));
    captureTime = Number(captureTime);
    weight = Number(weight);
    if (angler !== undefined && typeof angler === `string`
        && weight !== undefined && typeof weight === `number` && weight > 0
        && species !== undefined && typeof species === `string`
        && location !== undefined && typeof location === `string`
        && bait !== undefined && typeof bait === `string`
        && captureTime !== undefined && typeof captureTime === `number` && captureTime > 0) {
        let body = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };
        let header = getHeader(`Post`, body);

        await fetch(`http://localhost:3030/data/catches`, header);

    }


}


async function onUpdate(event) {
    let id = event.target.attributes[1].value;
    let parent = event.target.parentElement;

    let angler = parent.querySelector(`.angler`).value;
    let weight = Number(parent.querySelector(`.weight`).value);
    let species = parent.querySelector(`.species`).value;
    let location = parent.querySelector(`.location`).value;
    let bait = parent.querySelector(`.bait`).value;
    let captureTime = Number(parent.querySelector(`.captureTime`).value);
    
    
    console.log(weight);
    console.log(typeof weight)
    if (angler !== undefined && typeof angler === `string`
        && weight !== undefined && typeof weight === `number` && weight > 0
        && species !== undefined && typeof species === `string`
        && location !== undefined && typeof location === `string`
        && bait !== undefined && typeof bait === `string`
        && captureTime !== undefined && typeof captureTime === `number` && captureTime > 0) {
        let body = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };
        let header = getHeader(`PUT`, body)
    
        let response = fetch(`http://localhost:3030/data/catches/${id}`, header);
        console.log(response);
        onLoad();
    }
}

function getHeader(method, body) {
    let token = userData.token;
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
