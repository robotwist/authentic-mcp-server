# Testing with MCP Inspector

The [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) is the official tool for testing and debugging MCP servers. This is perfect for verifying our server works before integrating with Jan.

## Quick Test

Run the Inspector with our server:

```bash
cd /home/robwistrand/authentic-mcp-server
npx @modelcontextprotocol/inspector node src/index.js
```

This will:
1. Start the MCP Inspector in your browser
2. Connect to our server via stdio
3. Allow you to test all three tools interactively

## What You'll See

The Inspector provides:

### Server Connection Pane
- Shows the server is connected via stdio transport
- Displays server metadata

### Tools Tab
- Lists our three tools:
  - `scan_for_fallacies`
  - `compare_sources`
  - `distill_kernel`
- Allows testing each tool with custom inputs
- Shows tool schemas and execution results

### Resources Tab
- Lists available resources (if any)

### Prompts Tab
- Shows available prompts (if any)

### Notifications Pane
- Shows server logs (stderr output)
- Displays "Authentic Verification MCP Server running on stdio"

## Testing Our Tools

1. **scan_for_fallacies**
   - Input: `{ "text": "This is a test article with some logical fallacies..." }`
   - Should run through gates first, then call Ollama

2. **compare_sources**
   - Input: `{ "source_a": "Text from source A", "source_b": "Text from source B" }`
   - Should compare both texts via Ollama

3. **distill_kernel**
   - Input: `{ "text": "This is an amazing and terrible article..." }`
   - Should strip emotional language via Ollama

## Benefits

- **Verify server works** before Jan integration
- **Debug issues** with interactive testing
- **See actual responses** from Ollama
- **Test gate logic** with different inputs
- **No Jan configuration needed** - test independently

## Next Steps

1. Run the Inspector command above
2. Test each tool to verify they work
3. Once verified, we can troubleshoot Jan configuration
4. The Inspector proves the server works correctly
