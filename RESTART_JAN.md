# How to Restart Jan to Apply Groq Changes

## Steps to Restart Jan

### Step 1: Quit Jan Completely

**Important**: Don't just close the window - you need to quit the application completely.

**Option A: Menu**
- Click the menu (three lines or hamburger icon)
- Select "Quit" or "Exit"

**Option B: System Tray**
- On Linux, check the system tray (top/bottom bar)
- Right-click Jan icon and select "Quit"

**Option C: Keyboard**
- `Ctrl+Q` (Linux/Windows)
- `Cmd+Q` (Mac)

**Option D: Task Manager (if needed)**
- If Jan won't quit normally, check for running processes:
  ```bash
  ps aux | grep -i jan
  killall jan  # If needed
  ```

### Step 2: Wait a Moment

Wait 2-3 seconds to ensure Jan is fully closed.

### Step 3: Restart Jan

Open Jan again from:
- Applications menu
- Desktop shortcut
- Command line: `jan` (if installed)

### Step 4: Verify It's Working

After Jan starts:

1. **Check Jan Logs** (in terminal):
   ```bash
   tail -f ~/.local/share/Jan/data/logs/app.log
   ```

2. **Look for**:
   - "Starting MCP server AuthenticVerifier"
   - "MCP server AuthenticVerifier spawned with PID..."
   - "Server AuthenticVerifier started successfully"
   - **No errors about GROQ_API_KEY missing**

3. **Test the Tools**:
   - Try using the MCP tools in Jan
   - They should now use Groq (much faster!)

## What to Expect

✅ **Success indicators**:
- Server starts without errors
- Tools respond quickly (Groq is fast!)
- No CUDA errors (using cloud API)
- Logs show successful startup

❌ **If errors occur**:
- Check logs for error messages
- Verify API key is correct in Jan config
- Ensure TypeScript compiled successfully (`npx tsc`)

## Quick Restart Command

If you prefer command line:
```bash
# Quit Jan (if you know the process name)
pkill -f jan

# Wait a moment
sleep 2

# Start Jan (adjust command based on your installation)
jan &
```

## Troubleshooting

### Jan won't quit
- Use `pkill -f jan` or `killall jan`
- Check system tray for hidden instances

### Server doesn't start
- Check logs: `tail -f ~/.local/share/Jan/data/logs/app.log`
- Verify API key in config file
- Check TypeScript compiled: `cd ~/authentic-mcp-server && npx tsc`

### API key error
- Verify key in: `~/.local/share/Jan/data/mcp_config.json`
- Key should be in `env.GROQ_API_KEY` field
- Restart Jan after updating config

## Summary

1. **Quit Jan completely** (not just close window)
2. **Wait 2-3 seconds**
3. **Restart Jan**
4. **Check logs** to verify server started
5. **Test tools** - should be fast with Groq!

Your MCP server is ready - just need to restart Jan to pick up the changes!
