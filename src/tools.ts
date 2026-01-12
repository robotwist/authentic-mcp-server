/**
 * TOOLS - Tool Definitions and Handlers
 * Wires together Prompts + Heuristics + Groq (cloud) for MCP tools
 */

import { callGroq as callOllama } from "./groq.js"; // Alias for compatibility
import {
  ANALYSIS_SYSTEM_PROMPT,
  COMPARISON_SYSTEM_PROMPT,
  DISTILLATION_SYSTEM_PROMPT,
  generateUserPrompt,
} from "./prompts.js";
import { detectFallaciesHeuristic } from "./heuristics.js";

// Tool Definitions (MCP Schema)
export const TOOL_DEFINITIONS = [
  {
    name: "scan_for_fallacies",
    description: "Analyzes text for logical fallacies and cognitive distortions. Returns a list of detected flaws with confidence ratings.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "The raw text to analyze" },
        power_mode: {
          type: "string",
          enum: ["eco", "performance"],
          description: "Power mode: 'eco' limits input to 2000 chars, 'performance' allows up to 10000 chars",
          default: "eco",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "compare_sources",
    description: "Performs a semantic 'Word Diff' between two texts on the same topic. Highlights how language differs (e.g., 'Riot' vs 'Protest').",
    inputSchema: {
      type: "object",
      properties: {
        source_a: { type: "string", description: "Text from the first source" },
        source_b: { type: "string", description: "Text from the second source" },
        power_mode: {
          type: "string",
          enum: ["eco", "performance"],
          description: "Power mode: 'eco' limits input to 2000 chars per source, 'performance' allows up to 10000 chars",
          default: "eco",
        },
      },
      required: ["source_a", "source_b"],
    },
  },
  {
    name: "distill_kernel",
    description: "Strips all adjectives, adverbs, and emotional loading from text, leaving only the verifiable subject-verb-object facts.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "The text to distill" },
        power_mode: {
          type: "string",
          enum: ["eco", "performance"],
          description: "Power mode: 'eco' limits input to 2000 chars, 'performance' allows up to 10000 chars",
          default: "eco",
        },
      },
      required: ["text"],
    },
  },
];

/**
 * scanForFallacies
 * Tool handler for scan_for_fallacies
 * Step A: Run detectFallaciesHeuristic (The Intern)
 * Step B: Call callOllama with ANALYSIS_SYSTEM_PROMPT (The PhD)
 * Step C: Merge results
 */
export async function scanForFallacies(text: string): Promise<unknown> {
  // Step A: Run heuristic detection first (fast, local)
  const heuristicMatches = detectFallaciesHeuristic(text);

  // Step B: Call Ollama with the analysis prompt
  const userPrompt = generateUserPrompt(undefined, undefined, text);
  const fullPrompt = `${ANALYSIS_SYSTEM_PROMPT}\n\n${userPrompt}`;

  let aiAnalysis: unknown = null;
  try {
    const ollamaResponse = await callOllama(fullPrompt);
    
    // Parse the JSON response from Ollama
    try {
      aiAnalysis = JSON.parse(ollamaResponse.response);
    } catch (parseError) {
      console.error("[Tools] Failed to parse Ollama JSON response:", parseError);
      aiAnalysis = {
        error: "Failed to parse AI response",
        raw_response: ollamaResponse.response.substring(0, 500),
      };
    }
  } catch (ollamaError) {
    console.error("[Tools] Ollama call failed:", ollamaError);
    // Continue with heuristic results only
  }

  // Step C: Merge heuristic and AI results
  return {
    heuristic_matches: heuristicMatches,
    ai_analysis: aiAnalysis,
    verification_engine: "groq-llama3.3",
  };
}

/**
 * compareSources
 * Tool handler for compare_sources
 * Calls Ollama with COMPARISON_SYSTEM_PROMPT + both sources
 */
export async function compareSources(
  sourceA: string,
  sourceB: string
): Promise<unknown> {
  // Build comparison prompt
  const comparisonPrompt = `${COMPARISON_SYSTEM_PROMPT}\n\nSOURCE A:\n${sourceA}\n\nSOURCE B:\n${sourceB}`;

  const ollamaResponse = await callOllama(comparisonPrompt);

  // Parse and return JSON
  try {
    return JSON.parse(ollamaResponse.response);
  } catch (parseError) {
    console.error("[Tools] Failed to parse comparison JSON:", parseError);
    return {
      error: "Failed to parse AI response",
      raw_response: ollamaResponse.response.substring(0, 500),
    };
  }
}

/**
 * distillKernel
 * Tool handler for distill_kernel
 * Calls Ollama with DISTILLATION_SYSTEM_PROMPT
 */
export async function distillKernel(text: string): Promise<unknown> {
  // Build distillation prompt
  const distillationPrompt = `${DISTILLATION_SYSTEM_PROMPT}\n\nTEXT:\n${text}`;

  const ollamaResponse = await callOllama(distillationPrompt);

  // Parse and return JSON
  try {
    return JSON.parse(ollamaResponse.response);
  } catch (parseError) {
    console.error("[Tools] Failed to parse distillation JSON:", parseError);
    return {
      error: "Failed to parse AI response",
      raw_response: ollamaResponse.response.substring(0, 500),
    };
  }
}
