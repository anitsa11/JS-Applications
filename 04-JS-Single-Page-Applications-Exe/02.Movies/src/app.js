import {showHome} from "./homeView.js"

document.querySelectorAll("section").forEach(section => section.style.display = "none");
document.querySelector("nav").addEventListener("click", onNavigate);

const routes = {
    "/": showHome,
    "/home": showHome,
    "/login": "",
    "/register": "",
    "/logout": ""

}

showHome();

function onNavigate(e) {
    const el = e.target;
    if (el.tagName !== "A" || el.href =="") {
        return;
    }
    e.preventDefault();
    const path = new URL(el.href).pathname;
    routes[path]();

}