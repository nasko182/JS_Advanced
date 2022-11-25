import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

export async function login(email,password){
    const data = await post(`/users/login`,{email,password});

    setUserData(data);
}

export async function register(email,password){
    const data = await post(`/users/register`,{email,password});

    setUserData(data);
}

export function logout(){
    get(`/users/logout`);
    clearUserData();
}