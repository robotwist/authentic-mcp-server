# Test Server with MCP Inspector

Perfect! The [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) is the official tool for testing MCP servers. This will help us:

1. **Verify the server works** before troubleshooting Jan
2. **Test all tools interactively**
3. **Debug any issues** with a proper testing tool

## Run the Inspector

```bash
cd /home/robwistrand/authentic-mcp-server
npx @modelcontextprotocol/inspector node src/index.js
```

This command:
- Starts the MCP Inspector (opens in browser)
- Connects to our server via stdio transport
- Shows all available tools and resources

## What to Test

Once the Inspector opens:

### 1. Check Server Connection
- Should see "Authentic Verification MCP Server running on stdio" in logs
- Server should be connected via stdio transport

### 2. Test Tools Tab
Our three tools should appear:
- **scan_for_fallacies** - Test with sample text
- **compare_sources** - Test with two source texts  
- **distill_kernel** - Test with emotional text

### 3. Test Gate Logic
Try these to test gates:
- Short text (< 50 chars) with "I feel" or "I believe" (should block via Truth Gate)
- Long text (> 2000 chars) in eco mode (should block via Power Gate)
- Normal text (should pass gates and call Ollama)

### 4. Check Ollama Integration
- Tools should call Ollama (if Ollama is running)
- You'll see responses from llama3:latest model

## Expected Results

✅ **If Inspector works:**
- Server is correctly configured
- Issue is with Jan's configuration format
- We can use Inspector results to fix Jan config

❌ **If Inspector fails:**
- Server has an issue we need to fix first
- Better to debug here than in Jan

## Next Steps After Testing

1. **If Inspector works:** We know the server is fine, so Jan's config format is the issue
2. **If Inspector fails:** Fix server issues first, then try Jan again

Run the command and let me know what you see!
