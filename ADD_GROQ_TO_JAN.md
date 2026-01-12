# How to Add Groq Models to Jan's Chat Interface

## Important: Two Separate Configurations

1. **MCP Server (AuthenticVerifier)** - ✅ Already configured
   - Uses Groq for MCP tools
   - Configured in Jan's MCP settings
   - Already working!

2. **Jan's Chat Models** - Need to configure separately
   - Uses Groq for Jan's chat interface
   - Configured in Jan's Model Providers
   - Separate from MCP server

## How to Add Groq to Jan's Chat

### Step 1: Open Jan Settings

1. Open Jan
2. Go to **Settings** (gear icon)
3. Navigate to **Model Providers** section

### Step 2: Add Groq Provider

1. Look for **Groq** in the Model Providers list
2. Click on **Groq** (or "Add" / "Configure" if it's not there)
3. You'll see a field for API Key

### Step 3: Enter Your Groq API Key

1. Paste your Groq API Key:
   ```
   YOUR_GROQ_API_KEY_HERE
   ```
2. Save the configuration

### Step 4: Access Groq Models

1. In any chat session, open the **model selector**
2. You should now see **Groq models** listed as options
3. Select a Groq model (e.g., `llama-3.3-70b-versatile`)

## Available Groq Models

Groq models you might see:
- `llama-3.3-70b-versatile` (default, very fast)
- `llama-3.1-70b-versatile`
- `mixtral-8x7b-32768`
- And more (check Groq's current offerings)

## Troubleshooting

### Groq Models Not Appearing

1. **Verify API Key**
   - Make sure the key is correct
   - Key should start with `gsk_`
   - No extra spaces

2. **Check Internet Connection**
   - Groq requires internet (cloud API)
   - Stable connection needed

3. **Restart Jan**
   - After adding Groq, restart Jan completely
   - This ensures the provider is loaded

4. **Check Jan Version**
   - Make sure you have a recent version of Jan
   - Older versions might not support Groq

### API Key Issues

- **Invalid Key**: Make sure you copied the full key
- **Expired Key**: Generate a new key from Groq console
- **Permissions**: Ensure the key has proper permissions

## Summary

**Two Separate Configurations:**

1. ✅ **MCP Server** - Already configured (uses Groq for tools)
2. ⏳ **Jan's Chat** - Add Groq in Settings → Model Providers

**Your API Key:**
```
YOUR_GROQ_API_KEY_HERE
```

**Steps:**
1. Settings → Model Providers → Groq
2. Paste API key
3. Save
4. Restart Jan (if needed)
5. Select Groq model in chat

## Benefits

✅ **Fast Inference** - Groq is extremely fast (50x faster)
✅ **Free Tier** - Currently free (check Groq for limits)
✅ **Good Models** - Llama 3.3 70B is excellent quality
✅ **Cloud-Based** - No local GPU/CUDA needed

## Reference

Jan's official documentation:
- https://jan.ai/docs/remote-models/groq

Groq Console (for API keys):
- https://console.groq.com/keys
