# Official MCP Server Configuration Format

Based on the [official MCP documentation](https://modelcontextprotocol.io/docs/develop/build-server), here are the correct configuration formats:

## Format Examples from Documentation

### Format 1: Binary with Full Path (Rust example)
```json
{
  "mcpServers": {
    "weather": {
      "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/target/release/weather"
    }
  }
}
```
**Note:** Just `command`, no `args` field!

### Format 2: Command + Args (Python example)
```json
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": ["run", "weather.py"],
      "cwd": "/path/to/project"
    }
  }
}
```
**Note:** Uses `command`, `args` (array), and `cwd` (optional)

### Format 3: Node.js Equivalent

For our Node.js server, following the Python pattern:

```json
{
  "mcpServers": {
    "authentic-verification-layer": {
      "command": "node",
      "args": ["/home/robwistrand/authentic-mcp-server/src/index.js"]
    }
  }
}
```

This matches what we've been trying!

## Important Points from Documentation

1. **Absolute paths required** - Must use full absolute paths
2. **Command vs Args** - Binary can use just `command`, interpreted languages need `command` + `args`
3. **Stdio transport** - Our server uses stdio (no port needed)
4. **Logging** - Must use stderr (we're using console.error ✓)

## Jan Compatibility

The error "Failed to extract command args from config" suggests:

1. **Jan might expect different format** than Claude for Desktop
2. **Jan might not fully support MCP** yet
3. **Jan might auto-rename servers** (error says "AuthenticVerifier")

## Recommendation

Since the official format matches what we've tried, and all formats failed in Jan:

1. **Test with MCP Inspector first** - Verify server works with official tool
2. **Check Jan's MCP support** - Jan might have different requirements
3. **Use Inspector results** - If Inspector works, Jan's config format is the issue

Let's test with the Inspector to prove our server works correctly!
