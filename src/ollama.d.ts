/**
 * OLLAMA CLIENT - Local LLM Interface
 * Connects to Ollama running on localhost:11434
 */
export interface OllamaResponse {
    response: string;
    duration: number;
}
export interface OllamaRequestParams {
    model: string;
    prompt: string;
    stream: boolean;
    format: string;
}
/**
 * callOllama
 * Calls the local Ollama API with a prompt and returns the JSON response
 *
 * @param prompt - The prompt to send to Ollama
 * @param model - The model to use (default: "llama3:latest")
 * @returns Promise<OllamaResponse> - The AI response and duration
 * @throws Error if connection fails or request times out
 */
export declare function callOllama(prompt: string, model?: string): Promise<OllamaResponse>;
//# sourceMappingURL=ollama.d.ts.map