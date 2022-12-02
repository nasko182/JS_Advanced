import { put } from "../api/api.js";
import { getById } from "../api/data.js";
import {html} from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (offer,onEdit)=>html`
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${offer.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${offer.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${offer.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                .value=${offer.description}
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                .value=${offer.requirements}
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${offer.salary}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;

        export async function showEdit(ctx){
            const id = ctx.params.id;
            let offer = await getById(id);

            ctx.render(editTemplate(offer,createSubmitHandler(onEdit)));

            function onEdit(data){
                if(Object.values(data).some(e=>e==``)){
                    return alert(`All fields required`)
                }
                else{
                    put(`/data/offers/` +id,data);
                    ctx.page.redirect(`/catalog/`+id)
                }
            }
        }