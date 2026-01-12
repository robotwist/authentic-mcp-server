/**
 * GROQ CLIENT - Cloud LLM Interface
 * Uses Groq's fast cloud API (50x faster than local, free tier)
 */
import axios from "axios";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_TIMEOUT_MS = 30000; // 30 seconds
/**
 * callGroq
 * Calls the Groq cloud API with a prompt and returns the JSON response
 *
 * @param prompt - The prompt to send to Groq
 * @param model - The model to use (default: "llama-3.3-70b-versatile")
 * @returns Promise<GroqResponse> - The AI response and duration
 * @throws Error if API key is missing, connection fails, or request times out
 */
export async function callGroq(prompt, model = "llama-3.3-70b-versatile") {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("GROQ_API_KEY is missing. Please set it in your environment.");
    }
    const startTime = Date.now();
    console.error(`[Groq] Sending request to ${model}...`);
    try {
        const response = await axios.post(GROQ_ENDPOINT, {
            model: model,
            messages: [
                { role: "system", content: "You are a precise JSON-outputting AI." },
                { role: "user", content: prompt }
            ],
            temperature: 0.1,
            response_format: { type: "json_object" }
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            timeout: DEFAULT_TIMEOUT_MS
        });
        const duration = Date.now() - startTime;
        const content = response.data.choices[0]?.message?.content || "{}";
        console.error(`[Groq] Success (${duration}ms)`);
        return {
            response: content,
            duration: duration
        };
    }
    catch (error) {
        const duration = Date.now() - startTime;
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                console.error("[Groq] Authentication failed - check GROQ_API_KEY");
                throw new Error("Groq API authentication failed. Check your GROQ_API_KEY.");
            }
            if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
                console.error(`[Groq] Request timeout after ${duration}ms`);
                throw new Error(`Groq request timed out after ${DEFAULT_TIMEOUT_MS}ms`);
            }
            console.error("[Groq] API error:", error.response?.data || error.message);
            throw new Error(`Groq API error: ${error.response?.status || error.message}`);
        }
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`[Groq] Error: ${errorMessage}`);
        throw new Error(`Groq error: ${errorMessage}`);
    }
}
//# sourceMappingURL=groq.js.map