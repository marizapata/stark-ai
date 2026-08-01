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

  initializeView();
}

/* ==========================
   INICIALIZAR VISTA
========================== */

function initializeView() {

  /* ==========================
     BOTÓN HOME
  ========================== */

  const startButton = document.querySelector("#start-chat");

  if (startButton) {
    startButton.addEventListener("click", function () {
      render(Chat);
    });
  }

  /* ==========================
     FORMULARIO CHAT
  ========================== */

  const chatForm = document.querySelector(".chat-form");

  if (chatForm) {

    chatForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const input = document.querySelector("#message-input");

      console.log(input.value);

    });

  }

}

/* ==========================
   INICIAR APLICACIÓN
========================== */

render(Home);