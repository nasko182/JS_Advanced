 import { goLogin, redirect } from "./redirect.js";

export async function onLogin(event){
    event.preventDefault();
    let { email, password,} = getData(event);
    if (email.length > 0
        && password.length > 0) {
            let data = await createRequest(email,password);
            data= JSON.stringify(data);

            document.getElementById(`email-login`).value=``;
            document.getElementById(`password-login`).value=``;
            
            if(data!=="23"){
                sessionStorage.clear();
                sessionStorage.setItem(`userData`,data);
                redirect();

            }
            else{
                goLogin();
                sessionStorage.clear();
            }
    }
    else{
        console.log(`Wrong input, please try again`);
        setTimeout(()=>{
            
        },2000)
    }
    
}

function getData(event) {
    event.preventDefault();
    let { email, password} = Object.fromEntries(new FormData(event.target));
    
    return { email, password};
}

async function createRequest(email,password ){
    let header=getHeader(`post`,{ email,password})
    try{
        let response = await fetch(`http://localhost:3030/users/login`,header);
        if(response.status!==200){
            throw new Error(`Wrong input, please try again`);
        }
        let data = await response.json();
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