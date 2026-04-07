// стартираме нещата

import { logout } from "./data/user.js";
import { page } from "./lib.js";
import { addRender } from "./utils/render.js";
import { updateNav } from "./utils/utils.js";

import { createView } from "./views/create.js";

import { catalogView } from "./views/catalog.js";
import { detailsView } from "./views/details.js";
import { homeView } from "./views/home.js";

import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { editView } from "./views/edit.js";

updateNav();

//logout menu
document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    updateNav();
    page.redirect('/')
})

page(addRender)

//TODO Bind project URLs to view handlers
page('/', homeView);
page('/catalog', catalogView);
page('/catalog/:id', detailsView);
page('/edit/:id', editView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);


page.start();