/**
 * TOOLS - Tool Definitions and Handlers
 * Wires together Prompts + Heuristics + Groq (cloud) for MCP tools
 */
export declare const TOOL_DEFINITIONS: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            text: {
                type: string;
                description: string;
            };
            power_mode: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            source_a?: never;
            source_b?: never;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            source_a: {
                type: string;
                description: string;
            };
            source_b: {
                type: string;
                description: string;
            };
            power_mode: {
                type: string;
                enum: string[];
                description: string;
                default: string;
            };
            text?: never;
        };
        required: string[];
    };
})[];
/**
 * scanForFallacies
 * Tool handler for scan_for_fallacies
 * Step A: Run detectFallaciesHeuristic (The Intern)
 * Step B: Call callOllama with ANALYSIS_SYSTEM_PROMPT (The PhD)
 * Step C: Merge results
 */
export declare function scanForFallacies(text: string): Promise<unknown>;
/**
 * compareSources
 * Tool handler for compare_sources
 * Calls Ollama with COMPARISON_SYSTEM_PROMPT + both sources
 */
export declare function compareSources(sourceA: string, sourceB: string): Promise<unknown>;
/**
 * distillKernel
 * Tool handler for distill_kernel
 * Calls Ollama with DISTILLATION_SYSTEM_PROMPT
 */
export declare function distillKernel(text: string): Promise<unknown>;
//# sourceMappingURL=tools.d.ts.map