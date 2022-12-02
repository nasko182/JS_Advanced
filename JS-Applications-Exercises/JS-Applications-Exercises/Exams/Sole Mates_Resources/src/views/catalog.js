import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const catalogTemplate = (shoes) => html`
<section id="dashboard">
          <h2>Collectibles</h2>
          ${shoes.length !== 0 
    ? html` <ul class="card-wrapper">
    ${shoes.map(shoeCard)}
    </ul>`

    : html`
    <h2>There are no items added yet.</h2>`
    }

</section>
`;

const shoeCard = (shoe) => html`
    <li class="card">
              <img src=${shoe.imageUrl} alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${shoe.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
              <a class="details-btn" href="/catalog/${shoe._id}">Details</a>
            </li>
`;

export async function showCatalog(ctx) {
    let shoes = await getAll();
    ctx.render(catalogTemplate(shoes));
    
}