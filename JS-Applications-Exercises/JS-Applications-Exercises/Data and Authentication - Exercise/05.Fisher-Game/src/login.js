document.getElementById(`login-form`).addEventListener(`submit`, onLogin);
document.querySelectorAll(`a`).forEach(a => a.classList.remove(`active`));
document.querySelector(`#login`).classList.add(`active`);
document.querySelector(`#user`).style.display = `none`;

function onLogin(event) {
    event.preventDefault();

    let { email, password } = Object.fromEntries(new FormData(event.target));

    createRequest(email, password);

    
}

async function createRequest(email, password) {
    let url = `http://localhost:3030/users/login`
    let header = getHeader(`POST`, { email, password });
    try {
        let response = await fetch(url, header);
        
        if (response.status !== 200) {
            throw new Error(data.message);
        }

        let data = await response.json();
        
        let userData = {
            email: data.email,
            token: data.accessToken,
            id: data._id
        }
        sessionStorage.setItem(`userData`, JSON.stringify(userData));
        window.location.href = `./index.html`;
    } catch (e) {
        let errorBox = document.querySelector(`p.notification`);
        errorBox.textContent = `Invalid input`;
        setTimeout(() => {
            errorBox.textContent = ``;
        }, 2000)
    }

}

function getHeader(method, body) {
    let obj = {
        method: method,
        headers: {
            'Content-Type': `application/json`
        }
    }
    if (body) {
        obj.body = JSON.stringify(body);
    }

    return obj;
}