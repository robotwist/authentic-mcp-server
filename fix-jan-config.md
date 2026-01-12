# Jan MCP Configuration Fix

## Error: "Failed to extract command args from config"

Jan might need a different configuration format. Try these alternatives:

### Option 1: Full Command as String (Recommended to try first)

```json
{
  "mcpServers": {
    "authentic-verification-layer": {
      "command": "node /home/robwistrand/authentic-mcp-server/src/index.js",
      "args": [],
      "env": {}
    }
  }
}
```

### Option 2: Absolute Path to Node

```json
{
  "mcpServers": {
    "authentic-verification-layer": {
      "command": "/usr/bin/node",
      "args": ["/home/robwistrand/authentic-mcp-server/src/index.js"],
      "env": {}
    }
  }
}
```

### Option 3: Original Format (if Jan supports it)

```json
{
  "mcpServers": {
    "authentic-verification-layer": {
      "command": "node",
      "args": ["/home/robwistrand/authentic-mcp-server/src/index.js"],
      "env": {}
    }
  }
}
```

### Option 4: Using a Shell Wrapper (if above don't work)

Create a wrapper script:

```bash
#!/bin/bash
# Save as: /home/robwistrand/authentic-mcp-server/run-server.sh
cd /home/robwistrand/authentic-mcp-server
exec node src/index.js
```

Then use:
```json
{
  "mcpServers": {
    "authentic-verification-layer": {
      "command": "/home/robwistrand/authentic-mcp-server/run-server.sh",
      "args": [],
      "env": {}
    }
  }
}
```

## Troubleshooting Steps

1. **Check Jan's Logs**: Look for more detailed error messages
2. **Try Option 1 First**: Many MCP implementations prefer command as full string
3. **Verify Paths**: Make sure all paths are absolute
4. **Check Permissions**: Ensure Jan can execute the files

## Common Issues

- **Args format**: Some MCP hosts want empty array `[]` when command includes path
- **Path format**: Always use absolute paths
- **Command format**: Some want full command, others want just executable
