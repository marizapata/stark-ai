/* ==========================
   IMPORTAR VISTAS
========================== */

import { Home } from "./views/home.js";
import { Chat } from "./views/chat.js";
import { About } from "./views/about.js";

import {
  isValidMessage,
  createMessage,
  limitHistory
} from "./utils.js";


/* ==========================
   CONTENEDOR PRINCIPAL
========================== */

const app = document.querySelector("#app");

let chatHistory = [];


/* ==========================
   RENDERIZAR VISTA
========================== */

function render(view) {

  app.innerHTML = view();

  initializeView();

  restoreChatHistory();

}


/* ==========================
   NAVEGACIÓN
========================== */

function navigate(path) {

  if (window.location.pathname === path) {
    return;
  }

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
   RESTAURAR HISTORIAL
========================== */

function restoreChatHistory() {

  const messages = document.querySelector(".messages");

  if (!messages) {
    return;
  }

  chatHistory.forEach((item) => {

    const message = document.createElement("div");

    message.classList.add("message");

    if (item.role === "user") {

      message.classList.add("user");

    } else {

      message.classList.add("assistant");

    }

    message.textContent = item.content;

    messages.appendChild(message);

  });

  messages.scrollTop = messages.scrollHeight;

}


/* ==========================
   INICIALIZAR VISTA
========================== */

function initializeView() {


  /* ==========================
     HOME → CHAT
  ========================== */

  const startButton = document.querySelector("#start-chat");

  if (startButton) {

    startButton.addEventListener("click", function () {

      navigate("/chat");

    });

  }


  /* ==========================
     HOME → ABOUT
  ========================== */

  const aboutButton = document.querySelector("#go-about");

  if (aboutButton) {

    aboutButton.addEventListener("click", function () {

      navigate("/about");

    });

  }


  /* ==========================
     BOTÓN INICIO
  ========================== */

  const homeButton = document.querySelector("#go-home");

  if (homeButton) {

    homeButton.addEventListener("click", function () {

      navigate("/");

    });

  }


  /* ==========================
     BOTÓN CHAT
  ========================== */

  const chatButton = document.querySelector("#go-chat");

  if (chatButton) {

    chatButton.addEventListener("click", function () {

      navigate("/chat");

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

      if (!isValidMessage(input.value)) {

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


      chatHistory.push(
  createMessage(
    "user",
    userMessage.textContent
  )
);


      /* ==========================
         MENSAJE DEL ASISTENTE
      ========================== */

      const assistantMessage = document.createElement("div");

      assistantMessage.classList.add("message");
      assistantMessage.classList.add("assistant");

      assistantMessage.textContent = "Pensando...";

      messages.appendChild(assistantMessage);

      messages.scrollTop = messages.scrollHeight;


      /* ==========================
         COMUNICACIÓN CON API
      ========================== */

      try {

        const response = await fetch("/api/chat", {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            message: userMessage.textContent,

            history: limitHistory(chatHistory)

          })

        });


        const data = await response.json();


        /* ==========================
           RESPUESTA EXITOSA
        ========================== */

        assistantMessage.textContent = data.reply;


        chatHistory.push(
  createMessage(
    "assistant",
    data.reply
  )
);


        messages.scrollTop = messages.scrollHeight;


      } catch (error) {


        /* ==========================
           ERROR
        ========================== */

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