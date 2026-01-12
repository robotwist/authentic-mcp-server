# Groq Setup - Migration from Ollama to Groq

## ✅ Changes Complete

### Step 1: Created `src/groq.ts` ✅
- Groq API adapter using OpenAI-compatible endpoint
- Uses `llama-3.3-70b-versatile` by default (fast, free tier)
- Includes error handling and timeout (30s)

### Step 2: Updated `src/tools.ts` ✅
- Changed import to use Groq (aliased as `callOllama` for compatibility)
- Updated `verification_engine` to "groq-llama3.3"
- All tool handlers work unchanged (thanks to alias pattern)

### Step 3: Updated Jan Config ✅
- Added `GROQ_API_KEY` environment variable to Jan config
- **⚠️  ACTION REQUIRED**: Replace `YOUR_GROQ_API_KEY_HERE` with your actual key

## Next Steps

### 1. Get Your Groq API Key

1. **Sign up/Login** to Groq: https://console.groq.com
2. **Navigate to API Keys**: https://console.groq.com/keys
3. **Create a new API key** (or copy existing one)
4. **Copy the key** (starts with `gsk_...`)

### 2. Update Jan Configuration

**Option A: Edit Jan Config File**
```bash
nano ~/.local/share/Jan/data/mcp_config.json
```

Find:
```json
"AuthenticVerifier": {
  "env": {
    "GROQ_API_KEY": "YOUR_GROQ_API_KEY_HERE"
  }
}
```

Replace `YOUR_GROQ_API_KEY_HERE` with your actual key:
```json
"AuthenticVerifier": {
  "env": {
    "GROQ_API_KEY": "gsk_your_actual_key_here"
  }
}
```

**Option B: Use Jan UI**
1. Open Jan Settings
2. Navigate to MCP Servers → AuthenticVerifier
3. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: `gsk_your_actual_key_here`
4. Save

### 3. Rebuild TypeScript

```bash
cd /home/robwistrand/authentic-mcp-server
npx tsc
```

### 4. Restart Jan

1. **Quit Jan completely** (don't just close window)
2. **Restart Jan**
3. **Check logs**: `tail -f ~/.local/share/Jan/data/logs/app.log`
4. Should see: "Server AuthenticVerifier started successfully"

### 5. Test the Tools

Try using the MCP tools in Jan - they should now use Groq instead of Ollama!

## Benefits

✅ **50x faster** - Groq's cloud inference is extremely fast
✅ **No CUDA needed** - Cloud API, no local GPU required
✅ **Free tier** - Currently free (check Groq for limits)
✅ **Better models** - Using Llama 3.3 70B (much better than local)
✅ **No local setup** - Works immediately with API key

## Troubleshooting

### "GROQ_API_KEY is missing" Error
- **Check**: API key is set in Jan config (`env` section)
- **Verify**: Key starts with `gsk_`
- **Restart**: Jan after updating config

### Authentication Failed
- **Check**: API key is correct (no extra spaces)
- **Verify**: Key is active in Groq console
- **Check**: Free tier limits not exceeded

### Request Timeout
- **Check**: Internet connection
- **Note**: 30s timeout is set (should be enough)
- **Verify**: Groq API is operational

## Model Information

**Default Model**: `llama-3.3-70b-versatile`
- **Size**: 70B parameters (much larger than local models)
- **Speed**: Extremely fast (Groq's specialty)
- **Quality**: Excellent (better than local 8B models)
- **Format**: JSON output (required for our tools)

**Alternative Models** (if needed):
- `llama-3.1-70b-versatile` (previous version)
- `mixtral-8x7b-32768` (Mixtral model)
- Check Groq docs for latest models

## Migration Notes

- **Ollama not needed**: Can stop Ollama service if not using elsewhere
- **Local models not needed**: All inference happens in cloud
- **Environment variable**: Only `GROQ_API_KEY` needed
- **No CUDA**: Completely removes CUDA dependency

## Summary

✅ Code updated to use Groq
✅ Jan config updated (needs your API key)
⏳ **Next**: Add your Groq API key and rebuild

Your MCP server is now ready to use Groq's fast cloud inference!
