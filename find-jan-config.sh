#!/bin/bash
echo "=== Finding Jan Configuration ==="
echo ""

echo "1. Checking ~/.config/Jan:"
find ~/.config/Jan -type f -name "*.json" -o -name "*.config" -o -name "*mcp*" 2>/dev/null | head -10

echo ""
echo "2. Checking ~/.local/share/Jan:"
find ~/.local/share/Jan -type f -name "*.json" -o -name "*.config" -o -name "*mcp*" 2>/dev/null | head -10

echo ""
echo "3. Checking for log files:"
find ~/.local/share/Jan ~/.config/Jan -name "*.log" 2>/dev/null | head -10

echo ""
echo "4. Current Jan data directory (from error):"
ls -la ~/.local/share/Jan/data 2>/dev/null | head -20
