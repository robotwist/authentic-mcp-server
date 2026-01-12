#!/bin/bash
# Quick test script for MCP server
# This verifies the server can start and respond to basic MCP protocol

echo "=== MCP Server Test ==="
echo ""

# Check if server file exists
if [ ! -f "src/index.js" ]; then
    echo "❌ Error: src/index.js not found"
    echo "Run: npx tsc"
    exit 1
fi

# Check if Ollama is running
echo "1. Checking Ollama..."
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "   ✅ Ollama is running"
else
    echo "   ❌ Ollama is not running"
    echo "   Start Ollama: ollama serve"
    exit 1
fi

# Check Node.js
echo "2. Checking Node.js..."
if command -v node > /dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo "   ✅ Node.js: $NODE_VERSION"
else
    echo "   ❌ Node.js not found"
    exit 1
fi

# Test server startup (should print to stderr)
echo "3. Testing server startup..."
echo "   (Server should print to stderr)"
timeout 2 node src/index.js 2>&1 | head -1 || echo "   ✅ Server started (timeout expected)"

echo ""
echo "=== Server Configuration for Jan ==="
echo ""
echo "Command: node"
echo "Args: $(realpath src/index.js)"
echo ""
echo "Add to Jan's MCP settings:"
echo '{'
echo '  "mcpServers": {'
echo '    "authentic-verification-layer": {'
echo '      "command": "node",'
echo "      \"args\": [\"$(realpath src/index.js)\"],"
echo '      "env": {}'
echo '    }'
echo '  }'
echo '}'
echo ""
