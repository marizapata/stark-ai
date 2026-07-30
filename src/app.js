/* ==========================
   IMPORTAR VISTAS
========================== */

import { Home } from "./views/home.js";
import { Chat } from "./views/chat.js";

/* ==========================
   CONTENEDOR PRINCIPAL
========================== */

const app = document.querySelector("#app");

/* ==========================
   RENDERIZAR VISTA
========================== */

function render(view) {
  app.innerHTML = view();
}

/* ==========================
   INICIAR APLICACIÓN
========================== */

render(Home);

/* ==========================
   BOTÓN INICIAR CHAT
========================== */

const startButton = document.querySelector("#start-chat");

/* ==========================
   EVENTO DEL BOTÓN
========================== */

startButton.addEventListener("click", function () {
  render(Chat);
});