import { del, get } from "./api.js";


export async function getAll(){
   return  get(`/data/offers?sortBy=_createdOn%20desc`);
}

export async function getById(id){
    return get(`/data/offers/`+id)
}

export async function deleteById(id){
    return del(`/data/offers/`+id)
}