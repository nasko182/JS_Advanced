import { goRegister, redirect } from "./redirect.js";

export async function onRegister(event) {
    event.preventDefault();
    let { email, password, repeatPassword } = getData(event);
    if (email.length > 0
        && password.length > 5
        && password === repeatPassword) {
            let data = await createRequest(email,password);

            data= JSON.stringify(data);
            document.getElementById(`email-register`).value=``;
            document.getElementById(`password-register`).value=``;
            document.getElementById(`repeatPassword-register`).value=``;

            if(data!=="23"){
                sessionStorage.clear();
            sessionStorage.setItem(`userData`,data);
            redirect();
            }
            else{
                goRegister();
                sessionStorage.clear();
            }
    }
    else{
        console.log(`Wrong input, please try again`);
        // setTimeout(()=>{
            
        // },2000)
        goRegister();
        sessionStorage.clear();
    }
}

function getData(event) {
    event.preventDefault();
    let { email, password, repeatPassword } = Object.fromEntries(new FormData(event.target));

    return { email, password, repeatPassword }
}

async function createRequest(email,password ){
    let header=getHeader(`post`,{ email,password})
    try{
        let response = await fetch(`http://localhost:3030/users/register`,header);
        if(response.status!==200){
            throw new Error(`Wrong input, please try again`)
        }
    let data = response.json();

    return data;
    }catch(e){
        console.log(e.message);
        // setTimeout(()=>{
            
        // },2000)
        return 23
    }

}

function getHeader(method, body) {

    let obj = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (body) {
        obj.body = JSON.stringify(body);
    }
    return obj;
}