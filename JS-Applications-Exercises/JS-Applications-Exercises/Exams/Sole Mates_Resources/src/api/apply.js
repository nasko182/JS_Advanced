import { get, post } from "./api.js";

export async function apply(offerId){
    return post(`/data/applications`,{offerId})
}

export async function getApply(offerId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}

export async function getShoes(brand){
    return get(`/data/shoes?where=brand%20LIKE%20%22${brand}%22`)
}

export async function getOwnApply(offerId,userId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
