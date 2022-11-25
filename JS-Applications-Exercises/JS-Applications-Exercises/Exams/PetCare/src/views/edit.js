import { put } from "../api/api.js";
import { getById } from "../api/data.js";
import {html} from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (pet,onEdit)=>html`
<section id="editPage">
            <form @submit=${onEdit} class="editForm">
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value=${pet.name}>
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value=${pet.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value=${pet.age}>
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value=${pet.weight}>
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value=${pet.image}>
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>`;

        export async function showEdit(ctx){
            const id = ctx.params.id;
            let pet = await getById(id);

            ctx.render(editTemplate(pet,createSubmitHandler(onEdit)));

            function onEdit(data){
                if(data.name==``||data.breed==``
                ||data.age==``||data.weight==``
                ||data.image==``){
                    return alert(`All fields required`)
                }
                else{
                    put(`/data/pets/` +id,data);
                    ctx.page.redirect(`/catalog/`+id)
                }
            }
        }