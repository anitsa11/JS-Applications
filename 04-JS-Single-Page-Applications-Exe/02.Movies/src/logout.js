import { showLogin } from "./login.js";
import { logout } from "./userService.js";
import { userUtil } from "./userUtils.js";

export async function showLogout() {
    await logout();
    userUtil.clearUserData();
    showLogin();

}