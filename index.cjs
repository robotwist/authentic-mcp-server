#!/usr/bin/env node
"use strict";
/**
 * AUTHENTIC VERIFICATION LAYER - MCP SERVER
 * A local-first forensic toolset for AI Agents.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const zod_1 = require("zod");
const axios_1 = __importDefault(require("axios"));
// CONFIG: Point this to your local inference engine (e.g., Ollama) or your existing API
const LOCAL_INFERENCE_URL = "http://localhost:11434/api/generate";
const VERIFICATION_MODEL = "llama3"; // Or your specific fine-tune
// Define the tools
const TOOL_DEFINITIONS = [
    {
        name: "scan_for_fallacies",
        description: "Analyzes text for logical fallacies and cognitive distortions. Returns a list of detected flaws with confidence ratings.",
        inputSchema: {
            type: "object",
            properties: {
                text: { type: "string", description: "The raw text to analyze" },
                sensitivity: { type: "string", enum: ["low", "medium", "high"], description: "Strictness of the audit" }
            },
            required: ["text"]
        }
    },
    {
        name: "compare_sources",
        description: "Performs a semantic 'Word Diff' between two texts on the same topic. Highlights how language differs (e.g., 'Riot' vs 'Protest').",
        inputSchema: {
            type: "object",
            properties: {
                source_a: { type: "string", description: "Text from the first source" },
                source_b: { type: "string", description: "Text from the second source" }
            },
            required: ["source_a", "source_b"]
        }
    },
    {
        name: "distill_kernel",
        description: "Strips all adjectives, adverbs, and emotional loading from text, leaving only the verifiable subject-verb-object facts.",
        inputSchema: {
            type: "object",
            properties: {
                text: { type: "string", description: "The text to distill" }
            },
            required: ["text"]
        }
    }
];
const server = new index_js_1.Server({
    name: "authentic-verification-layer",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// 1. List Tools
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
    tools: TOOL_DEFINITIONS,
}));
// 2. Handle Tool Execution
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        if (name === "scan_for_fallacies") {
            const { text } = zod_1.z.object({ text: zod_1.z.string() }).parse(args);
            const result = await runLocalAnalysis(text, "fallacy_scan");
            return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        if (name === "compare_sources") {
            const { source_a, source_b } = zod_1.z.object({ source_a: zod_1.z.string(), source_b: zod_1.z.string() }).parse(args);
            const result = await runComparison(source_a, source_b);
            return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        if (name === "distill_kernel") {
            const { text } = zod_1.z.object({ text: zod_1.z.string() }).parse(args);
            // For "Kernel", we can use a pure heuristic function to save compute
            const result = heuristicDistillation(text);
            return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        throw new Error(`Unknown tool: ${name}`);
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
/**
 * LOGIC ADAPTERS
 * This is where you port your existing logic.
 */
// A. The Local AI Adapter (Ollama)
async function runLocalAnalysis(text, task) {
    // We wrap your prompt logic here so Jan-Nano doesn't have to know it.
    const prompt = `
    SYSTEM: You are a Forensic Text Analyst. Output ONLY JSON.
    TASK: ${task}
    TEXT: ${text.substring(0, 2000)}
    
    SCHEMA: { "fallacies": [ { "name": string, "quote": string, "severity": number } ] }
  `;
    // Real implementation would call local Ollama/Llama.cpp instance
    // For now, returning mock structure to demonstrate contract
    return {
        verification_engine: "local-llama3",
        fallacies: [
            { name: "Strawman", quote: "They want to ban all fun", severity: 0.8 },
            { name: "Ad Hominem", quote: "The crazy senator", severity: 0.9 }
        ]
    };
}
// B. The Heuristic Adapter (Pure Code)
function heuristicDistillation(text) {
    // Port your "Neutral Rewrite" logic here.
    // Example: Naive implementation stripping adjectives
    return {
        original_length: text.length,
        kernel_facts: "Subject performed action. Event occurred at time.",
        removed_sentiment_count: 5
    };
}
// C. The Comparison Logic
async function runComparison(textA, textB) {
    // Port your "Word Diff" logic here
    return {
        semantic_divergence: [
            { source_a: "Riot", source_b: "Protest", context: "The event in the square" },
            { source_a: "Regime", source_b: "Government", context: "The ruling body" }
        ]
    };
}
// Start the Server
async function run() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("Authentic Verification MCP Server running on stdio");
}
run().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map