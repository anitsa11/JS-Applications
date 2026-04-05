import { showHome } from "./homeView.js";
import {register} from "./userService.js";
import { userUtil } from "./userUtils.js";

document.getElementById('register-form').addEventListener('submit', onSubmit);

export function showRegister() {
    document.querySelectorAll('section').forEach(section=>section.style.display = "none");
    document.getElementById("form-sign-up").style.display='block';

}

async function onSubmit(e) {
    e.preventDefault();
    const formData= new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get("password");
    const rePass = formData.get("repeatPassword");

    if (!email || password.length <6 || password !==rePass) {
        alert('register');
        return;
    }

    const userData = await register({email, password});

    userUtil.storeUserData(userData);
    showHome();
    
}