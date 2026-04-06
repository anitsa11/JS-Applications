// стартираме нещата

import { page } from "./lib.js";
import { addRender } from "./utils/render.js";
import { homeView } from "./views/home.js";


import { loginView } from "./views/login.js";


page(addRender)

//TODO Bind project URLs to view handlers
page('/', homeView);
page('/login', loginView)

page.start();