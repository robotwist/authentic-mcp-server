/**
 * GROQ CLIENT - Cloud LLM Interface
 * Uses Groq's fast cloud API (50x faster than local, free tier)
 */
export interface GroqResponse {
    response: string;
    duration: number;
}
/**
 * callGroq
 * Calls the Groq cloud API with a prompt and returns the JSON response
 *
 * @param prompt - The prompt to send to Groq
 * @param model - The model to use (default: "llama-3.3-70b-versatile")
 * @returns Promise<GroqResponse> - The AI response and duration
 * @throws Error if API key is missing, connection fails, or request times out
 */
export declare function callGroq(prompt: string, model?: string): Promise<GroqResponse>;
//# sourceMappingURL=groq.d.ts.map