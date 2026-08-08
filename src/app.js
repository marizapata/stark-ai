/* ==========================
IMPORTAR VISTAS
========================== */

import { Home } from "./views/home.js";
import { Chat } from "./views/chat.js";
import { About } from "./views/about.js";

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
NAVEGACIÓN
========================== */

function navigate(path) {

  history.pushState({}, "", path);

  router();

}

/* ==========================
ROUTER
========================== */

function router() {

  switch (window.location.pathname) {

    case "/":
      render(Home);
      break;

    case "/chat":
      render(Chat);
      break;

    case "/about":
      render(About);
      break;

    default:
      render(Home);

  }

}

/* ==========================
INICIALIZAR VISTA
========================== */

function initializeView() {

  /* ==========================
  BOTÓN HOME → CHAT
  ========================== */

  const startButton = document.querySelector("#start-chat");

  if (startButton) {
    startButton.addEventListener("click", function () {
      navigate("/chat");
    });
  }

  /* ==========================
  BOTÓN HOME → ABOUT
  ========================== */

  const aboutButton = document.querySelector("#go-about");

  if (aboutButton) {
    aboutButton.addEventListener("click", function () {
      navigate("/about");
    });
  }

  /* ==========================
  BOTÓN VOLVER AL HOME
  ========================== */

  const homeButton = document.querySelector("#go-home");

  if (homeButton) {
    homeButton.addEventListener("click", function () {
      navigate("/");
    });
  }

  /* ==========================
  FORMULARIO CHAT
  ========================== */

  const chatForm = document.querySelector(".chat-form");

  if (chatForm) {

    chatForm.addEventListener("submit", async function (event) {

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

      assistantMessage.textContent = "Pensando...";

      messages.appendChild(assistantMessage);

      messages.scrollTop = messages.scrollHeight;

      try {

        const response = await fetch("/api/chat", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            message: userMessage.textContent
          })

        });

        const data = await response.json();

        assistantMessage.textContent = data.reply;

        messages.scrollTop = messages.scrollHeight;

      } catch (error) {

        assistantMessage.textContent =
          "Lo siento, ocurrió un error al comunicarme con Gemini.";

        console.error(error);

      }

    });

  }

}

/* ==========================
BOTONES DEL NAVEGADOR
========================== */

window.addEventListener("popstate", router);

/* ==========================
INICIAR APLICACIÓN
========================== */

router();