import { showHome } from "./homeView.js";
import { login } from "./userService.js";
import { userUtil } from "./userUtils.js";

document.getElementById('login-form').addEventListener('submit', onSubmit);

export function showLogin(){
    document.querySelectorAll("section").forEach(s => s.style.display = "none");
    document.getElementById('form-login').style.display = "block";

}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const {email, password} = Object.fromEntries(formData);

    if(!email || !password) {
        alert("login");
        return;
    }

    const userData = await login({email, password});
    userUtil.storeUserData(userData);
    showHome();
}