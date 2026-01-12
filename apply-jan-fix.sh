#!/bin/bash
echo "=== Jan Configuration Fix ==="
echo ""
echo "This script will:"
echo "1. Backup your current config"
echo "2. Apply the fix (remove nested mcpServers)"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 1
fi

CONFIG_FILE="$HOME/.local/share/Jan/data/mcp_config.json"
BACKUP_FILE="$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"

# Backup
echo "1. Backing up current config..."
cp "$CONFIG_FILE" "$BACKUP_FILE"
echo "   Backup: $BACKUP_FILE"

# Apply fix using Python
python3 << 'PYTHON'
import json
import sys

config_file = "/home/robwistrand/.local/share/Jan/data/mcp_config.json"

try:
    with open(config_file, 'r') as f:
        config = json.load(f)
    
    # Fix AuthenticVerifier
    if 'mcpServers' in config and 'AuthenticVerifier' in config['mcpServers']:
        auth_verifier = config['mcpServers']['AuthenticVerifier']
        if 'mcpServers' in auth_verifier and 'authentic-verification-layer' in auth_verifier['mcpServers']:
            nested = auth_verifier['mcpServers']['authentic-verification-layer']
            config['mcpServers']['AuthenticVerifier'] = {
                'active': False,
                'command': nested.get('command', '/usr/bin/node'),
                'args': nested.get('args', ['/home/robwistrand/authentic-mcp-server/src/index.js']),
                'env': nested.get('env', {})
            }
            print("✅ Fixed AuthenticVerifier structure")
        else:
            print("AuthenticVerifier structure already looks correct")
    
    # Write fixed config
    with open(config_file, 'w') as f:
        json.dump(config, f, indent=2)
    
    print("✅ Config file updated")
    print("\nNext steps:")
    print("1. Restart Jan")
    print("2. Check logs: tail -f ~/.local/share/Jan/data/logs/app.log")
    print("3. Should see: 'Server AuthenticVerifier started successfully'")
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
PYTHON

