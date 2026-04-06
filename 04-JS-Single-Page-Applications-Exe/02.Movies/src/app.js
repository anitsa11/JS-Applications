import { showHome } from "./homeView.js"
import { showLogin } from "./login.js";
import { showLogout } from "./logout.js";
import { showRegister } from "./register.js";
import { userUtil } from "./userUtils.js";

document.querySelectorAll("section").forEach(section => section.style.display = "none");
document.querySelector("nav").addEventListener("click", onNavigate);

const routes = {
    "/": showHome,
    "/home": showHome,
    "/login": showLogin,
    "/register": showRegister,
    "/logout": showLogout

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

export function updateNav() {
    const emailRef = document.getElementById("welcome-msg");

    if (userUtil.hasUser) {
        emailRef.style.display = "";
        emailRef.textContent = userUtil.getUserData()?.email;
        document.querySelectorAll("li.nav-item.user").forEach(item => item.style.display = "block");
        document.querySelectorAll("li.nav-item.guest").forEach(item => item.style.display = "none");
    } else {
        emailRef.style.display = "none";
        document.querySelectorAll("li.nav-item.user").forEach(item => item.style.display = "none");
        document.querySelectorAll("li.nav-item.guest").forEach(item => item.style.display = "block");
    }
}