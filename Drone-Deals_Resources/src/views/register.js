import { html } from "../lib.js";

import {register} from "../data/user.js"
import { updateNav } from "../utils/utils.js";


const registerTemplate = (onRegister) => html`
      <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="register-form" @submit=${onRegister}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>`;

export function registerView(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('re-password');


        try {
            if (!email || !password) {
                throw new Error('All fields are required');
            }
            if (password != repass) {
                throw new Error('Password don\'t match');
            }

            await login (email, password);

            updateNav();
            ctx.page.redirect('/')
        } catch (err) {
            alert(err.message);
        }           

    }
}