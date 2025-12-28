import { GoogleGenAI } from "@google/genai";

// Helper to get the API Key safely
const getApiKey = (): string => {
  try {
    // @ts-ignore
    const viteKey = import.meta.env.VITE_API_KEY;
    if (viteKey && viteKey.length > 10) return viteKey;
  } catch (e) {
    // Ignorar
  }

  if (typeof process !== 'undefined' && process.env) {
    const envKey = process.env.VITE_API_KEY || process.env.REACT_APP_API_KEY || process.env.API_KEY;
    if (envKey && envKey.length > 10) return envKey;
  }

  return 'AIzaSyD_RUlrw7gaL4zuuSXx8-t1xYat2DatiQ4';
};

export const chatWithTutor = async (history: {role: string, parts: {text: string}[]}[], message: string, context: string = "") => {
  const apiKey = getApiKey().trim();

  if (!apiKey) {
    return "⚠️ Error crítico: No hay API Key configurada.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Prioridad: gemini-2.5-flash-lite para baja latencia
  const modelsToTry = ['gemini-2.5-flash-lite-preview-02-05', 'gemini-flash-lite-latest', 'gemini-2.0-flash-exp'];

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      // console.log(`🤖 Conectando con: ${model}...`);
      
      const chat = ai.chats.create({
        model: model,
        history: history,
        config: {
          systemInstruction: `Eres "Koko-Bot", un tutor experto de la plataforma educativa 'Agüita e Koko'.
          
          CONTEXTO DEL TEMA ACTUAL:
          ${context}

          INSTRUCCIONES:
          1. Responde SOLO sobre farmacología y medicina basándote en el contexto proporcionado.
          2. Sé extremadamente conciso y directo (respuestas de < 50 palabras si es posible).
          3. Usa un tono amigable, motivador y utiliza emojis.
          4. Si la pregunta no tiene nada que ver con medicina, responde con una rima divertida rechazando el tema.
          `,
        }
      });

      const result = await chat.sendMessage({ message });
      return result.text;
      
    } catch (error: any) {
      console.warn(`⚠️ Falló el modelo ${model}:`, error.message);
      lastError = error;
    }
  }

  console.error("❌ Todos los intentos fallaron.", lastError);
  
  if (lastError?.message?.includes('404')) return "⚠️ Error 404: Modelo no disponible.";
  if (lastError?.message?.includes('429')) return "⏳ Sistema saturado. Espera un momento.";
  
  return `😵 Error técnico: ${lastError?.message || 'Desconocido'}.`;
};

export const generateQuizExplanation = async (question: string, answer: string) => {
    const apiKey = getApiKey().trim();
    if (!apiKey) return "Error: API Key faltante.";

    const ai = new GoogleGenAI({ apiKey });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite-preview-02-05',
            contents: `Explica muy brevemente por qué "${answer}" es la respuesta a: "${question}".`,
        });
        return response.text;
    } catch (error) {
        return "";
    }
}