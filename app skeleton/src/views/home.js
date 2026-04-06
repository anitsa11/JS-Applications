import { html } from "../lib.js";

const homeTemplate = () => html`
<h1>Home Page</h1>`;

export function homeView(ctx) {
    ctx.render(homeTemplate())
}