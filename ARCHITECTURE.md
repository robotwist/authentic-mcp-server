# Architecture Overview

## Important: CUDA Error Explanation

The CUDA error you're seeing:
```
LLAMA_CPP_PROCESS_ERROR: The model process encountered an unexpected error.
libcudart.so.12: cannot open shared object file
```

**This is from Jan's internal llama-server, NOT our MCP server.**

## Architecture Diagram

```
┌─────────────────┐
│   Jan (Host)    │  ← CUDA error happens here (Jan's internal model backend)
│                 │
│  ┌───────────┐  │
│  │ MCP Client│  │
│  └─────┬─────┘  │
└────────┼────────┘
         │ stdio (stdin/stdout)
         │ NO PORT NEEDED
         ▼
┌─────────────────┐
│  Our MCP Server │  ← No CUDA needed here!
│  (src/index.js) │  ← Uses Ollama via HTTP
└────────┬────────┘
         │ HTTP (port 11434)
         ▼
┌─────────────────┐
│   Ollama Server │  ← Already running ✓
│  (localhost)    │  ← No CUDA dependency
└─────────────────┘
```

## Key Points

1. **Our MCP Server** = No CUDA needed
   - Uses Ollama via HTTP API
   - Works on CPU or GPU (Ollama handles it)
   - No CUDA libraries required

2. **Jan's Internal Models** = CUDA error source
   - Jan tries to use its own llama-server
   - llama-server needs CUDA libraries
   - This is SEPARATE from our MCP server

3. **Solutions:**

   **Option A: Use Jan without internal models (Recommended)**
   - Jan acts as MCP client only
   - Our MCP server handles all AI via Ollama
   - No CUDA needed at all

   **Option B: Install CUDA (if you want Jan's internal models)**
   ```bash
   # Check if CUDA is installed
   nvcc --version
   
   # If not installed and you have NVIDIA GPU:
   # Install CUDA Toolkit 12.x (check your system docs)
   ```

   **Option C: Use CPU-only mode in Jan**
   - Some Jan versions support CPU-only backend
   - Check Jan settings for backend options

## Verification

Your setup is correct:
- ✅ Ollama running (port 11434)
- ✅ MCP server compiles
- ✅ Node.js installed
- ❌ Jan's CUDA libraries (separate issue, not blocking MCP server)

## Bottom Line

**The CUDA error does NOT affect our MCP server.**

Our MCP server will work perfectly with Jan, even if Jan's internal models have CUDA issues, because:
- Our server uses Ollama (already running)
- Ollama handles GPU/CPU automatically
- Communication is via stdio (no port/CUDA needed)

You can safely use the MCP server with Jan right now, even with the CUDA error in Jan's internal backend.
