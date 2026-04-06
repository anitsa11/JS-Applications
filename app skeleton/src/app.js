// стартираме нещата

import { page } from "./lib.js";
import { addRender } from "./utils/render.js";
import { homeView } from "./views/home.js";


page(addRender);

//TODO Bind project URLs to view handlers
page('/', homeView);

page.start();