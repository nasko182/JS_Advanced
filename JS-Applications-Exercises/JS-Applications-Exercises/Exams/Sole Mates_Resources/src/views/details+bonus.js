import { deleteById, getById } from "../api/data.js";
import { html,nothing } from "../lib.js"
import { apply, getApply, getOwnApply } from "../api/apply.js";
// correct urls in apply.js    Copy/paste
//uncomment , comment
//correct params in ctx.render

const detailsTemplate = (offer, isOwner,hasUser, onDelete,applications,canApply,onApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${offer.imageUrl} alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${applications}</strong></p>

        <div id="action-buttons">
            ${offerControl(offer,isOwner,hasUser,onDelete,canApply,onApply)}
        </div>
    </div>
</section>`;

function offerControl(offer,isOwner,hasUser,onDelete,canApply,onApply){
    if(!hasUser){
        return nothing;
    }
    if(isOwner){
        return html`
        <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)"  id="delete-btn">Delete</a>
        `
    }
    if(hasUser&&canApply){
        return html`
        <a @click=${onApply} href="" id="apply-btn">Apply</a>
        `
    }
}

// const detailsTemplate = (offer, isOwner,hasUser, onDelete) => html`
// <section id="details">
//     <div id="details-wrapper">
//         <img id="details-img" src=${offer.imageUrl} alt="example1" />
//         <p id="details-title">${offer.title}</p>
//         <p id="details-category">
//             Category: <span id="categories">${offer.category}</span>
//         </p>
//         <p id="details-salary">
//             Salary: <span id="salary-number">${offer.salary}</span>
//         </p>
//         <div id="info-wrapper">
//             <div id="details-description">
//                 <h4>Description</h4>
//                 <span>${offer.description}</span>
//             </div>
//             <div id="details-requirements">
//                 <h4>Requirements</h4>
//                 <span>${offer.requirements}</span>
//             </div>
//         </div>
//         <p>Applications: <strong id="applications">${10}</strong></p>

//         <div id="action-buttons">
//             ${offerControl(offer,isOwner,hasUser,onDelete)}
//         </div>
//     </div>
// </section>`;

// function offerControl(offer,isOwner,hasUser,onDelete,canApply,onApply){
//     if(!hasUser){
//         return nothing;
//     }
//     if(isOwner){
//         return html`
//         <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
//         <a @click=${onDelete} href="javascript:void(0)"  id="delete-btn">Delete</a>
//         `
//     }
//     if(hasUser){
//         return html`
//         <a href="" id="apply-btn">Apply</a>
//         `
//     }
// }

export async function showDetails(ctx) {
    let id = ctx.params.id;
    const requests=[
        getById(id),
        getApply(id)
    ]
    let user = ctx.user;
    // let offer = await getById(id); // to comment
    if(user){
        requests.push(getOwnApply(id,user._id))
    }
    let [offer,applications,hasApply] = await Promise.all(requests);
    let isOwner = user && user._id == offer._ownerId;
    let canApply = !isOwner && hasApply == 0
    // ctx.render(detailsTemplate(offer,isOwner,user, onDelete)) // to comment
    ctx.render(detailsTemplate(offer,isOwner,user, onDelete,applications,canApply,onApply));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this book`)

        if (choice) {
            await deleteById(id);
            ctx.page.redirect(`/catalog`);
        }
    }
    async function onApply(){
        await apply(id);
        ctx.page.redirect(`/catalog/`+id)
    }
}