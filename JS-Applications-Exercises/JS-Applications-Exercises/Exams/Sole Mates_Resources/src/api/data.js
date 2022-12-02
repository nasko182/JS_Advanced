import { del, get } from "./api.js";


export async function getAll(){
   return  get(`/data/shoes?sortBy=_createdOn%20desc`);
}

export async function getById(id){
    return get(`/data/shoes/`+id)
}

export async function deleteById(id){
    return del(`/data/shoes/`+id)
}