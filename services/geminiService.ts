
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeContact = async (contact: UserProfile) => {
  const prompt = `Analyze this business contact:
    Name: ${contact.firstName} ${contact.lastName}
    Job: ${contact.title} at ${contact.company}
    Bio: ${contact.bio}
    Tags: ${contact.tags.join(', ')}

    Please categorize this contact and identify potential business opportunities or follow-up strategies.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "Professional category (e.g., Potential Client, Tech Partner, Recruiter)" },
            opportunity: { type: Type.STRING, description: "Identified business opportunity" },
            followUpPrompt: { type: Type.STRING, description: "A message to send as follow-up" },
            smartTags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
            }
          },
          required: ["category", "opportunity", "followUpPrompt", "smartTags"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
};

export const generateSmartTags = async (bio: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: `Generate 5 professional tags for this bio: "${bio}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        });
        return JSON.parse(response.text);
    } catch (e) {
        return [];
    }
}
