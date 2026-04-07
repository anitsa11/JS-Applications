import { createDrone, getDronesById, updateDrone } from "../data/drones.js";
import { html } from "../lib.js";

const editTemplate = (droneDate, onEdit) => html`
      <section id="edit">
        <div class="form form-item">
          <h2>Edit Offer</h2>
          <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="model" id="model" placeholder="Drone Model" .value=${droneDate.model}/>
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" value=${droneDate.imageUrl}/>
            <input type="number" name="price" id="price" placeholder="Price" value=${droneDate.price}/>
            <input type="number" name="weight" id="weight" placeholder="Weight" value=${droneDate.weight}/>
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" value=${droneDate.phone} />
            <input type="text" name="condition" id="condition" placeholder="Condition" value=${droneDate.condition} />
            <textarea name="description" id="description" placeholder="Description" value=${droneDate.description}></textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>`;

export async function editView(ctx) {
    const id= ctx.params.id;

    const droneDate = await getDronesById(id);

    ctx.render(editTemplate(droneDate, onEdit));

    async function onEdit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const {
            model,
            imageUrl,
            price,
            condition,
            weight,
            phone,
            description
        } = Object.fromEntries(formData.entries());

        try {
            if (!model || !imageUrl || !price || !condition || !weight || !phone || !description) {
                throw new Error("All fields are required!");
            }


            await updateDrone (id, {model, imageUrl,price, condition, weight, phone, description})

            ctx.page.redirect('/catalog/'+ id)
        } catch (err) {

            alert (err.message)
        }

    }
}