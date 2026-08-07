// Importaciones
import { GoogleGenAI } from "@google/genai";

// Configuración
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Handler
export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {

    // Chat
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: message,
    });

    // Respuesta
    return res.status(200).json({
      reply: response.text,
    });

  } catch (error) {

    // Errores
    console.error("========== GEMINI ==========");
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });

  }

}