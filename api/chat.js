import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


export default async function handler(req, res) {


  // ==========================
  // VALIDAR MÉTODO
  // ==========================

  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Método no permitido"
    });

  }


  try {


    // ==========================
    // RECIBIR DATOS
    // ==========================

    const { message, history = [] } = req.body;


    if (!message || !message.trim()) {

      return res.status(400).json({
        error: "El mensaje está vacío"
      });

    }


    // ==========================
    // PERSONALIDAD DE TONY STARK
    // ==========================

    const systemPrompt = `
Eres Tony Stark: genio, ingeniero y mentor tecnológico.

Hablas en español con confianza, humor sarcástico e ingenio.

Responde de forma natural, clara y muy breve.
Máximo 2 o 3 frases.

Nunca digas que eres Gemini ni un modelo de Google.

Si no sabes algo, dilo claramente.
`;


    // ==========================
    // OPTIMIZACIÓN DE HISTORIAL
    // ==========================

    const limitedHistory = history.slice(-8);


    // ==========================
    // CONVERTIR HISTORIAL
    // ==========================

    const contents = limitedHistory.map((item) => ({

      role: item.role === "assistant"
        ? "model"
        : "user",

      parts: [
        {
          text: item.content
        }
      ]

    }));


    // ==========================
    // GENERAR RESPUESTA
    // ==========================

    const response = await ai.models.generateContent({

      model: "gemini-flash-latest",

      contents,

      config: {

        systemInstruction: systemPrompt,

        // Limita la cantidad de texto generado
        maxOutputTokens: 80

      }

    });


    // ==========================
    // RESPUESTA
    // ==========================

    return res.status(200).json({

      reply: response.text

    });


  } catch (error) {


    console.error("===== ERROR GEMINI =====");
    console.error(error);


    // ==========================
    // MANEJO DE RATE LIMIT
    // ==========================

    if (error?.status === 429) {

      return res.status(429).json({

        error:
          "Demasiadas solicitudes. Espera unos segundos e inténtalo nuevamente."

      });

    }


    // ==========================
    // ERROR GENERAL
    // ==========================

    return res.status(500).json({

      error:
        "Error al comunicarse con Gemini"

    });

  }

}