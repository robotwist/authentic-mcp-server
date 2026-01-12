# Fix for Jan Configuration Issue

## ✅ FOUND THE PROBLEM!

Looking at `~/.local/share/Jan/data/mcp_config.json`, I found the issue:

### ❌ Current (WRONG) Structure:
```json
"AuthenticVerifier": {
  "active": false,
  "mcpServers": {           <-- EXTRA NESTING!
    "authentic-verification-layer": {
      "args": [...],
      "command": "/usr/bin/node",
      "env": {}
    }
  }
}
```

### ✅ Correct Structure (like other working servers):
```json
"AuthenticVerifier": {
  "active": true,
  "command": "/usr/bin/node",
  "args": [
    "/home/robwistrand/authentic-mcp-server/src/index.js"
  ],
  "env": {}
}
```

## The Issue

Jan is creating an **extra nested `mcpServers` object** inside `AuthenticVerifier`. The working servers (browsermcp, exa, filesystem, etc.) are **flat** - they don't have the nested `mcpServers` structure.

## The Fix

Remove the extra `mcpServers` nesting. The correct structure should be:

```json
{
  "mcpServers": {
    "AuthenticVerifier": {
      "active": true,
      "command": "/usr/bin/node",
      "args": [
        "/home/robwistrand/authentic-mcp-server/src/index.js"
      ],
      "env": {}
    }
  }
}
```

## How to Fix

### Option 1: Edit the Config File Directly

1. Backup the current config:
```bash
cp ~/.local/share/Jan/data/mcp_config.json ~/.local/share/Jan/data/mcp_config.json.backup
```

2. Edit the file:
```bash
nano ~/.local/share/Jan/data/mcp_config.json
# or
code ~/.local/share/Jan/data/mcp_config.json
```

3. Find `"AuthenticVerifier"` and fix it:
   - Remove the `"mcpServers": { "authentic-verification-layer": { ... } }` nesting
   - Move `command`, `args`, `env` directly under `AuthenticVerifier`

4. Save and restart Jan

### Option 2: Use Jan's UI (Recommended)

1. Open Jan
2. Go to Settings → MCP Servers (or similar)
3. **Remove** the current "AuthenticVerifier" entry
4. **Add new** MCP server with:
   - Name: `AuthenticVerifier` (or any name)
   - Command: `/usr/bin/node`
   - Args: `/home/robwistrand/authentic-mcp-server/src/index.js`
   - (NOT nested - just flat fields)

5. Save and restart Jan

## Expected Result

After fixing, the config should look like:
```json
"AuthenticVerifier": {
  "active": true,
  "command": "/usr/bin/node",
  "args": ["/home/robwistrand/authentic-mcp-server/src/index.js"],
  "env": {}
}
```

**No nested `mcpServers` object!**

## Verification

After fixing:
1. Restart Jan
2. Check logs: `tail -f ~/.local/share/Jan/data/logs/app.log`
3. Should see: "MCP server AuthenticVerifier spawned with PID..."
4. Should see: "Server AuthenticVerifier started successfully."

Let me know if you want me to create a fixed version of the config file!
