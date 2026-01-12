# Configure Jan to Use Ollama (Fix Chat Error)

## Problem

Jan's chat can't respond because it's trying to use its internal models (llama-server) which require CUDA. When CUDA fails, Jan can't chat.

## Solution: Configure Jan to Use Ollama

You already have Ollama running with 8 models! Configure Jan to use Ollama instead of its internal models.

## Step-by-Step Instructions

### Method 1: Jan Settings UI (Recommended)

1. **Open Jan Settings**
   - Click the Settings icon (gear) in Jan
   - Or: File → Settings / Preferences

2. **Find Model Settings**
   - Look for: "Models", "Model Providers", "AI Models", or "Backend Settings"
   - May be under: Settings → Models or Settings → AI

3. **Add Ollama Provider**
   - Look for: "Ollama", "External Models", "API Models", or "Custom Backend"
   - Click "Add" or "Configure"
   - Set endpoint: `http://localhost:11434`
   - Select a model (e.g., `llama3:latest` or `llama3.2:latest`)

4. **Set as Default**
   - Make the Ollama model the default/active model
   - Disable or remove Jan's internal models from the default selection

5. **Restart Jan**
   - Quit completely (don't just close window)
   - Restart Jan
   - Try chatting again

### Method 2: Check Jan's Model Configuration Files

If Jan uses config files:
- Look in: `~/.local/share/Jan/data/`
- Look for: `models.json`, `config.json`, or model-related configs
- May need to add Ollama provider configuration

### Method 3: Install CUDA (Alternative - Not Recommended)

Only if you want to use Jan's internal models:
```bash
# Check if you have NVIDIA GPU
nvidia-smi

# If you have GPU, install CUDA Toolkit 12.x
# See: https://developer.nvidia.com/cuda-downloads
```

**Note:** Using Ollama is much easier!

## Verification

After configuring Ollama:
1. ✅ Jan should be able to chat (using Ollama models)
2. ✅ No more CUDA errors in logs
3. ✅ Both Jan chat and our MCP server use Ollama (consistent)
4. ✅ Everything works together

## Your Available Ollama Models

Based on your setup, you have these models available:
- `llama3:latest` (or `llama3:8b`)
- `llama3.2:latest`
- `llama2:latest` (or `llama2:7b-chat`)
- `gemma2:2b`
- And more...

Any of these can be used in Jan for chatting.

## Troubleshooting

If you can't find Ollama option in Jan:
1. **Check Jan version** - Make sure you have a recent version that supports Ollama
2. **Check Jan documentation** - Look for "Ollama" or "External Models" in docs
3. **Alternative**: Use Jan's API mode (if available) and configure Ollama endpoint

## Benefits of Using Ollama

1. ✅ **No CUDA needed** - Ollama handles CPU/GPU
2. ✅ **Already working** - You have 8 models ready
3. ✅ **Consistent** - Both Jan chat and MCP server use Ollama
4. ✅ **Flexible** - Can switch models easily

## Next Steps

1. **Open Jan Settings**
2. **Find Model/Backend settings**
3. **Add Ollama provider**
4. **Select a model**
5. **Test chat**

Once configured, Jan should be able to chat without CUDA errors!
