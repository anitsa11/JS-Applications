import { getUserData } from "./utils.js";

export function hasUser(ctx, next) {
    const userData = getUserData();

    if (!userData) {
        //TODO Change URL if needed
        ctx.page.redirect('/login');
        return;
    }

    next();
}