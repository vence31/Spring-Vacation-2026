
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getConciergeResponse = async (
  prompt: string, 
  history: ChatMessage[]
): Promise<ChatMessage> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are the STAYVCS LUX AI Travel Concierge. 
        Your goal is to provide luxurious, high-end travel recommendations for Spring Break 2025.
        Always maintain a professional, sophisticated, and helpful tone.
        Focus on premium experiences, exclusive resorts, and fine dining.
        Use real-time data to suggest specific events or seasonal highlights for 2025.
        Keep answers concise but evocative.`,
        tools: [{ googleSearch: {} }]
      },
    });

    const text = response.text || "I apologize, I am currently unable to refine your itinerary. Please try again momentarily.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    const links = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '#'
    })).filter((l: any) => l.uri !== '#') || [];

    return {
      role: 'model',
      text,
      groundingLinks: links
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      role: 'model',
      text: "Our concierge service is experiencing high demand. Please refresh or try again later."
    };
  }
};
