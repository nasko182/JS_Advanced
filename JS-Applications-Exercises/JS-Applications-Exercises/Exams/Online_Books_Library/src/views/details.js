import { deleteById, getById } from "../api/data.js";
import {html} from "../lib.js"

const detailsTemplate = (book,isOwner,onDelete) =>html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.image}></p>
                <div class="actions">
                    ${isOwner
                    ? html` 
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
                    : html`
                    <a class="button" href="#">Like</a>`}
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section> `;

export async function showDetails(ctx){
    let id = ctx.params.id;
    let book = await getById(id);
    let user = ctx.user;
    let isOwner = user && user._id==book._ownerId;
    ctx.render(detailsTemplate(book,isOwner,onDelete));

    async function onDelete(){
        const choice = confirm(`Are you sure you want to delete this book`)

        if(choice){
            await deleteById(id);
            ctx.page.redirect(`/catalog`);
        }
    }
}