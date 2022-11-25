import { post } from "../api/api.js";
import {html} from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate=(onCreate)=>html`
 <section id="create-page" class="create">
            <form @submit=${onCreate} id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>`;

export function showAddBook(ctx){
    ctx.render(createTemplate(createSubmitHandler(onCreate)))

    function onCreate(data){
        if(data.title==``||data.description==``
        ||data.imageUrl==``||data.type==``){
            return alert(`All fields required`)
        }
        else{
            post(`/data/books`,data);
            ctx.page.redirect(`/catalog`)
        }
    }

}