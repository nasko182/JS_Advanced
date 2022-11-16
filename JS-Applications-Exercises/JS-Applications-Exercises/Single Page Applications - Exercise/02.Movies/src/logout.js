import { redirect } from "./redirect.js";

export async function onLogout() {
    createRequest()
};

async function createRequest(){
    let header = getHeader(`GET`, null)
    let response = await fetch(`http://localhost:3030/users/logout`, header);
    
    if (response.status === 204) {
        sessionStorage.clear();
        redirect();
    }
    
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