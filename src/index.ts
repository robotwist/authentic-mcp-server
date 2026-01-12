#!/usr/bin/env node

/**
 * AUTHENTIC VERIFICATION LAYER - MCP SERVER
 * A local-first forensic toolset for AI Agents.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { runPowerGate, runTruthGate } from "./gates.js";
import {
  TOOL_DEFINITIONS,
  scanForFallacies,
  compareSources,
  distillKernel,
} from "./tools.js";

// Initialize MCP Server
const server = new Server(
  {
    name: "authentic-verification-layer",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 1. Tool Listing
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOL_DEFINITIONS,
}));

// 2. Tool Execution with Gate Middleware
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Extract power_mode if present, default to "eco"
    const powerMode =
      args && typeof args === "object" && "power_mode" in args
        ? (args.power_mode === "performance" ? "performance" : "eco")
        : "eco";

    // Run gates BEFORE any tool execution
    if (name === "scan_for_fallacies") {
      const { text } = z.object({ text: z.string() }).parse(args);

      // Run Power Gate
      const powerGateResult = runPowerGate(text, powerMode);
      if (!powerGateResult.allowed) {
        throw new Error(`Gate blocked: ${powerGateResult.reason}`);
      }

      // Run Truth Gate
      const truthGateResult = runTruthGate(text);
      if (!truthGateResult.allowed) {
        throw new Error(`Gate blocked: ${truthGateResult.reason}`);
      }

      // Execute tool handler
      const result = await scanForFallacies(text);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === "compare_sources") {
      const { source_a, source_b } = z
        .object({
          source_a: z.string(),
          source_b: z.string(),
        })
        .parse(args);

      // Run gates on both sources
      const powerGateA = runPowerGate(source_a, powerMode);
      if (!powerGateA.allowed) {
        throw new Error(`Gate blocked (Source A): ${powerGateA.reason}`);
      }

      const truthGateA = runTruthGate(source_a);
      if (!truthGateA.allowed) {
        throw new Error(`Gate blocked (Source A): ${truthGateA.reason}`);
      }

      const powerGateB = runPowerGate(source_b, powerMode);
      if (!powerGateB.allowed) {
        throw new Error(`Gate blocked (Source B): ${powerGateB.reason}`);
      }

      const truthGateB = runTruthGate(source_b);
      if (!truthGateB.allowed) {
        throw new Error(`Gate blocked (Source B): ${truthGateB.reason}`);
      }

      // Execute tool handler
      const result = await compareSources(source_a, source_b);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === "distill_kernel") {
      const { text } = z.object({ text: z.string() }).parse(args);

      // Run Power Gate
      const powerGateResult = runPowerGate(text, powerMode);
      if (!powerGateResult.allowed) {
        throw new Error(`Gate blocked: ${powerGateResult.reason}`);
      }

      // Run Truth Gate
      const truthGateResult = runTruthGate(text);
      if (!truthGateResult.allowed) {
        throw new Error(`Gate blocked: ${truthGateResult.reason}`);
      }

      // Execute tool handler
      const result = await distillKernel(text);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    // Log errors to console.error
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[Tool Execution Error] ${name}:`, errorMessage);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              error: errorMessage,
              tool: name,
              timestamp: new Date().toISOString(),
            },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  }
});

// Start the Server
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Authentic Verification MCP Server running on stdio");
}

run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
