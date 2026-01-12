# Fix Jan Chat - Use Ollama Instead of Internal Models

## Problem

Jan's chat is trying to use its internal models (llama-server) which require CUDA. When CUDA fails, Jan can't respond to chat messages.

## Solution: Configure Jan to Use Ollama

You already have Ollama running with 8 models! Jan can use Ollama instead of its internal models.

### Benefits
1. ✅ No CUDA needed (Ollama handles it)
2. ✅ Jan can chat (using Ollama models)
3. ✅ Works with our MCP server (both use Ollama)
4. ✅ You already have it set up

## How to Configure Jan to Use Ollama

### Option 1: Jan Settings UI (Recommended)

1. **Open Jan Settings**
   - Go to Settings → Models (or Model Settings)

2. **Add Ollama as Model Provider**
   - Look for "Ollama" or "External Models" option
   - Add Ollama endpoint: `http://localhost:11434`
   - Select a model (e.g., `llama3:latest`)

3. **Set as Default Model**
   - Make Ollama model the default
   - Disable Jan's internal models (if possible)

4. **Restart Jan**
   - Quit completely and restart

### Option 2: Jan Configuration File

If Jan uses a config file for models, you might need to:
- Add Ollama provider
- Set Ollama endpoint
- Configure model selection

### Option 3: Install CUDA (If You Want Jan's Internal Models)

Only if you want to use Jan's internal models:
```bash
# Check if you have NVIDIA GPU
nvidia-smi

# If you have GPU, install CUDA Toolkit 12.x
# See: https://developer.nvidia.com/cuda-downloads
```

**Note:** Using Ollama is easier and you already have it!

## Verification

After configuring:
1. Jan should be able to chat (using Ollama)
2. No more CUDA errors in logs
3. Our MCP server continues to work
4. Both systems use Ollama (consistent)

## Next Steps

1. **Try Jan Settings UI first** - Look for Ollama/External Models option
2. **Check Jan's documentation** - For how to configure Ollama
3. **If no UI option** - Check for config files or Jan's model settings

The key is: **Configure Jan to use Ollama instead of its internal llama-server**.
