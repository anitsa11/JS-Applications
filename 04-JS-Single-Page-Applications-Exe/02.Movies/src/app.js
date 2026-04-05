import {showHome} from "./homeView.js"
import { showRegister } from "./register.js";

document.querySelectorAll("section").forEach(section => section.style.display = "none");
document.querySelector("nav").addEventListener("click", onNavigate);

const routes = {
    "/": showHome,
    "/home": showHome,
    "/login": () => console.log('login'),
    "/register": showRegister,
    "/logout": () => console.log('logout')

}

showHome();

function onNavigate(e) {
    const el = e.target;
    if (el.tagName !== "A") {
        return;
    }

    e.preventDefault();
    const path = new URL(el.href).pathname;
    routes[path]();

}