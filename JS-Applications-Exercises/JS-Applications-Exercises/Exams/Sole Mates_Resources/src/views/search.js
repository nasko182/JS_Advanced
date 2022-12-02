import { getShoes } from "../api/apply.js";
import { getAll } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { createSubmitHandler } from "../util.js";
let hasSearched = false;

const searchTemplate = (shoes, onSearch,user) => html`
<section id="search">
  <h2>Search by Brand</h2>

  <form @submit=${onSearch} class="search-wrapper cf">
    <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>

  
  ${shoeControl(shoes, shoeCard,user)}


</section>
`;

function shoeControl(shoes, shoeCard,user) {
  if (!hasSearched) {
    return nothing;
  }
  if (shoes.length !== 0) {
    return html`<ul class="card-wrapper">
  ${shoes.map(s=>shoeCard(s,user))}
</ul>`
  }
  else {
    return html`<h2>There are no results found.</h2>`
  }
}

const shoeCard = (shoe,user) => html`
    <li class="card">
      <img src=${shoe.imageUrl} alt="travis" />
      <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
      </p>
      <p>
        <strong>Model: </strong><span class="model">${shoe.model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>

      ${user._id == shoe._ownerId
      ? html`<a class="details-btn" href="/catalog/${shoe._id}">Details</a>`
    : nothing}
    </li>
`;

export async function showSearch(ctx) {
  ctx.render(searchTemplate([], createSubmitHandler(onCreate)))
  hasSearched = false;

  async function onCreate(data) {
    let shoes = await getShoes(data.search);
    hasSearched = true;
    let user= ctx.user;

    ctx.render(searchTemplate(shoes, createSubmitHandler(onCreate),user))
  }
}