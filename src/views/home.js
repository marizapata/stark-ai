/* ==========================
   VISTA HOME
========================== */

export function Home() {
  return `

    <nav class="main-nav">

      <button id="go-home">
        Inicio
      </button>

      <button id="go-chat">
        Chat
      </button>

      <button id="go-about-nav">
        About
      </button>

    </nav>


    <section class="hero">

      <h1>STARK AI</h1>

      <p>
        Habla con Tony Stark utilizando Inteligencia Artificial.
      </p>

      <div class="home-buttons">

        <button id="start-chat">
          Comenzar Chat
        </button>

        <button id="go-about">
          Sobre el Proyecto
        </button>

      </div>

    </section>

  `;
}