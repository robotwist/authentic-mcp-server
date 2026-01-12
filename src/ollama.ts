/**
 * OLLAMA CLIENT - Local LLM Interface
 * Connects to Ollama running on localhost:11434
 */

import axios, { type AxiosError } from "axios";

const OLLAMA_ENDPOINT = "http://localhost:11434/api/generate";
const DEFAULT_TIMEOUT_MS = 60000; // 60 seconds (Minute Stop)

export interface OllamaResponse {
  response: string; // The raw JSON string from the AI
  duration: number; // Duration in milliseconds for performance logging
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
 * @param model - The model to use (default: "llama3")
 * @returns Promise<OllamaResponse> - The AI response and duration
 * @throws Error if connection fails or request times out
 */
export async function callOllama(
  prompt: string,
  model: string = "llama3"
): Promise<OllamaResponse> {
  const startTime = Date.now();
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, DEFAULT_TIMEOUT_MS);

  try {
    const params: OllamaRequestParams = {
      model,
      prompt,
      stream: false,
      format: "json",
    };

    console.error(`[Ollama] Calling model "${model}" (timeout: ${DEFAULT_TIMEOUT_MS}ms)`);

    const response = await axios.post(
      OLLAMA_ENDPOINT,
      params,
      {
        signal: abortController.signal,
        timeout: DEFAULT_TIMEOUT_MS,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const duration = Date.now() - startTime;
    clearTimeout(timeoutId);

    // Ollama returns the response in the 'response' field
    const responseText = response.data?.response;
    
    if (!responseText) {
      throw new Error("Ollama returned empty response");
    }

    console.error(`[Ollama] Success (${duration}ms)`);

    return {
      response: responseText,
      duration,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    const duration = Date.now() - startTime;

    // Handle abort (timeout)
    if (abortController.signal.aborted) {
      console.error(`[Ollama] Timeout after ${duration}ms`);
      throw new Error(`Ollama request timed out after ${DEFAULT_TIMEOUT_MS}ms`);
    }

    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.code === "ECONNREFUSED" || axiosError.code === "ENOTFOUND") {
        console.error("[Ollama] Connection refused");
        throw new Error("Ollama connection failed. Is the service running on port 11434?");
      }

      if (axiosError.code === "ETIMEDOUT" || axiosError.code === "ECONNABORTED") {
        console.error(`[Ollama] Request timeout after ${duration}ms`);
        throw new Error(`Ollama request timed out after ${duration}ms`);
      }

      if (axiosError.response) {
        console.error(`[Ollama] HTTP ${axiosError.response.status}: ${axiosError.response.statusText}`);
        throw new Error(`Ollama API error: ${axiosError.response.status} ${axiosError.response.statusText}`);
      }

      console.error(`[Ollama] Network error: ${axiosError.message}`);
      throw new Error(`Ollama network error: ${axiosError.message}`);
    }

    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[Ollama] Error: ${errorMessage}`);
    throw new Error(`Ollama error: ${errorMessage}`);
  }
}
