document.getElementById(`register-form`).addEventListener(`submit`, onRegister);
document.querySelectorAll(`a`).forEach(a=>a.classList.remove(`active`));
document.querySelector(`#register`).classList.add(`active`);
document.querySelector(`#user`).style.display = `none`;

function onRegister(event) {
    event.preventDefault();
    let { email, password, rePass } = Object.fromEntries(new FormData(event.target));
    if (password === rePass) {
        createRequest(email, password);
        window.location.href=`./index.html`;
    }
    else {
        let errorBox = document.querySelector(`p.notification`);
        errorBox.textContent = `Incorrect Input`;
        setTimeout(() => {
            errorBox.textContent = ``;
        }, 2000)
    }
}

async function createRequest(email, password) {
    let header = getHeader(`post`, { email, password });
    try {
        let response = await fetch(`http://localhost:3030/users/register`, header);
        let data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        let userData = {
            email: data.email,
            token: data.accessToken,
            id: data._id
        }
        sessionStorage.setItem(`userData`,JSON.stringify(userData));
    } catch (e) {
        let errorBox = document.querySelector(`p.notification`);
        errorBox.textContent = e;
        setTimeout(() => {
            errorBox.textContent = ``;
        }, 2000)
    }
}

function getHeader(method, body) {
    let obj = {
        method: method,
        headers: { 'Content-Type': `application/json` }
    }
    if (body) {
        obj.body = JSON.stringify(body);
    }

    return obj;
}