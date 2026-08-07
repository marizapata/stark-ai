/* ==========================
   VISTA CHAT
========================== */

export function Chat() {
  return `
    <main class="chat">

      <header class="chat-header">

        <button id="go-home">
          ← Inicio
        </button>

        <h1>🤖 Tony Stark</h1>

      </header>

      <section class="messages">

        <div class="message assistant">
          Hola, soy Tony Stark.
          ¿En qué puedo ayudarte hoy?
        </div>

      </section>

      <form class="chat-form">

        <input
          id="message-input"
          type="text"
          placeholder="Escribe tu mensaje..."
        >

        <button
          id="send-button"
          type="submit"
        >
          Enviar
        </button>

      </form>

    </main>
  `;
}