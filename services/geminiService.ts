import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // In a real app, you might have a fallback or a more robust configuration system
    // For this example, we'll alert the user and throw an error.
    alert("API_KEY is not configured. AI features will not work.");
    throw new Error("API_KEY environment variable is not set");
  }
  return apiKey;
};

let ai: GoogleGenAI;
try {
  ai = new GoogleGenAI({ apiKey: getApiKey() });
} catch (error) {
  console.error(error);
}


export const generateRfpContent = async (prompt: string): Promise<string> => {
  if (!ai) {
      return Promise.reject("Gemini AI client is not initialized.");
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
          thinkingConfig: { thinkingBudget: 0 } // For faster response
      }
    });
    
    // Remove markdown-style headings (e.g., #, ##) from the beginning of the response.
    const cleanText = response.text.trim().replace(/^#+\s.*?\n\s*/, '');
    
    return cleanText;
  } catch (error) {
    console.error("Error generating content:", error);
    if (error instanceof Error) {
        if(error.message.includes('API key not valid')){
            return Promise.reject("The provided API Key is not valid. Please check your configuration.");
        }
    }
    return Promise.reject("Failed to generate content from AI. Please try again later.");
  }
};
