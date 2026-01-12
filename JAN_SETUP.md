# Jan MCP Server Setup Guide

## Quick Setup for Jan

### 1. Locate Jan's MCP Configuration

Jan stores its MCP server configuration in one of these locations:

**Linux:**
- `~/.config/Jan/mcp_settings.json` (or similar)
- Check Jan's settings/preferences for MCP server configuration

**Alternative locations:**
- `~/.local/share/Jan/mcp_settings.json`
- Jan's data directory from the error: `~/.local/share/Jan/`

### 2. MCP Server Configuration

Add this to Jan's MCP settings (JSON format):

```json
{
  "mcpServers": {
    "authentic-verification-layer": {
      "command": "node",
      "args": [
        "/home/robwistrand/authentic-mcp-server/src/index.js"
      ],
      "env": {}
    }
  }
}
```

**Important:**
- Use the absolute path (shown above)
- Use `node` command (not `ts-node` or `npx`)
- Server uses stdio transport (no port needed)

### 3. Verify Path

Run this to get the exact path:
```bash
realpath /home/robwistrand/authentic-mcp-server/src/index.js
```

### 4. Jan Settings UI

If Jan has a UI for MCP servers:
1. Go to Settings → MCP Servers (or similar)
2. Add new server
3. Name: `authentic-verification-layer`
4. Command: `node`
5. Args: `/home/robwistrand/authentic-mcp-server/src/index.js`
6. Transport: stdio (or leave empty/default)

### 5. Test Configuration

After adding to Jan:
1. Restart Jan
2. Check Jan's logs for MCP server startup
3. Look for: "Authentic Verification MCP Server running on stdio"
4. The tools should appear in Jan's tool list

## Available Tools

Once connected, Jan can use these tools:

1. **scan_for_fallacies** - Analyzes text for logical fallacies
   - Input: `text` (string), `power_mode` (optional: "eco" | "performance")

2. **compare_sources** - Semantic comparison between two texts
   - Input: `source_a` (string), `source_b` (string), `power_mode` (optional)

3. **distill_kernel** - Strips emotional language to return facts
   - Input: `text` (string), `power_mode` (optional)

## Troubleshooting

### Server Not Starting
- Check that Node.js is in PATH: `which node`
- Verify the path exists: `ls -la /home/robwistrand/authentic-mcp-server/src/index.js`
- Check Jan's logs for error messages

### Connection Issues
- Ensure Ollama is running: `curl http://localhost:11434/api/tags`
- Check server compiles: `npx tsc` (should have no errors)

### Tool Not Found
- Restart Jan after configuration changes
- Check Jan's MCP server list/status
- Verify server started in Jan's logs
