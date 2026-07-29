/* ==========================
   IMPORTAR VISTAS
========================== */

import { Home } from "./views/home.js";

/* ==========================
   CONTENEDOR PRINCIPAL
========================== */

const app = document.querySelector("#app");

/* ==========================
   RENDERIZAR VISTA INICIAL
========================== */

app.innerHTML = Home();