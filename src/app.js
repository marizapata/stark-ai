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

      /* ==========================
         VALIDAR MENSAJE
      ========================== */

      if (input.value.trim() === "") {
        return;
      }

      const messages = document.querySelector(".messages");

      /* ==========================
         MENSAJE DEL USUARIO
      ========================== */

      const userMessage = document.createElement("div");

      userMessage.classList.add("message");
      userMessage.classList.add("user");

      userMessage.textContent = input.value;

      messages.appendChild(userMessage);

      messages.scrollTop = messages.scrollHeight;

      input.value = "";

      /* ==========================
         MENSAJE DEL ASISTENTE
      ========================== */

      const assistantMessage = document.createElement("div");

      assistantMessage.classList.add("message");
      assistantMessage.classList.add("assistant");

      assistantMessage.textContent =
        "Soy Tony Stark. Aún no estoy conectado con Gemini, pero pronto responderé como un verdadero Avenger.";

      messages.appendChild(assistantMessage);

      messages.scrollTop = messages.scrollHeight;

    });

  }

}

/* ==========================
   INICIAR APLICACIÓN
========================== */

render(Home);