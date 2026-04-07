import { html, nothing} from "../lib.js";
import { deleteDrone, getDronesById } from "../data/drones.js";
import { getUserData } from "../utils/utils.js";

const detailsTemplate = (drone, isOwner, onDelete) => html`
      <section id="details">
        <div id="details-wrapper">
          <div>
            <img id="details-img" src=${drone.imageUrl} />
            <p id="details-model">${drone.model}</p>
          </div>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="details-price">Price: €${drone.price}</p>
              <p class="details-condition">Condition: ${drone.condition}</p>
              <p class="details-weight">Weight: ${drone.weight}g</p>
              <p class="drone-description">${drone.description}</p>
              <p class="phone-number">Phone: ${drone.phone}</p>
            </div>
            ${isOwner ? html `
            <div class="buttons">
              <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>` : nothing}
        </div>
        </div>
      </section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const drone = await getDronesById(id)

    const userData = getUserData()
    const isOwner = userData && String(drone._owner) === String(userData.id);


    async function onDelete() {

        const choice = confirm(`Are you sure you want to delete offer`)

        if (choice) {
            await deleteDrone(drone._id);

            ctx.page.redirect('/catalog');
        }
    }
    ctx.render(detailsTemplate(drone, isOwner, onDelete))

}