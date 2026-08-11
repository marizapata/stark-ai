# Stark AI 🤖

Aplicación web de chat con Inteligencia Artificial inspirada en el personaje Tony Stark.

El proyecto permite mantener una conversación con un asistente de IA que responde con una personalidad definida, mantiene el contexto de la conversación y utiliza la API de Gemini mediante una función serverless de Vercel.

## 🚀 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- Node.js
- Vercel
- Vercel Serverless Functions
- Google Gemini API
- SDK `@google/genai`

## 🧠 Características

- Chat conversacional con Inteligencia Artificial.
- Personalidad personalizada de Tony Stark.
- Respuestas breves y naturales.
- Historial de conversación.
- Memoria del contexto durante la conversación.
- Historial limitado para optimizar el consumo de tokens.
- Manejo de errores de la API.
- Manejo de errores por límite de solicitudes (HTTP 429).
- API Key protegida mediante variables de entorno.
- Arquitectura Frontend → Serverless Function → Gemini API.
- SPA con navegación entre vistas.
- Navegación entre Home, Chat y About.
- Recarga directa de las rutas de la aplicación.

## 📁 Estructura del proyecto

```text
stark-ai/
│
├── api/
│   └── chat.js
│
├── src/
│   ├── views/
│   │   ├── about.js
│   │   ├── chat.js
│   │   └── home.js
│   │
│   ├── app.js
│   ├── index.html
│   └── styles.css
│
├── tests/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── vercel.json