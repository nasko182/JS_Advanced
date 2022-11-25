import { getMyBooks } from "../api/data.js";
import { html } from "../lib.js";

const catalogTemplate = (books) => html`<section id="my-books-page" class="my-books">
<h1>My Books</h1>
${books.length!=0
? html`
<ul class="my-books-list">
 ${books.map(bookCard)}
 </ul>`
: html` <p class="no-books">No books in database!</p>`}
</section>`;

const bookCard = (book) => html`
<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src="${book.imageUrl}"></p>
<a class="button" href="/catalog/${book._id}">Details</a>
</li>
`;

export async function showMyBooks(ctx) {
    let books = await getMyBooks(ctx.user._id);
    ctx.render(catalogTemplate(books));
}