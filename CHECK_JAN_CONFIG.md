# Checking Jan Configuration

## Found Jan Directories

- `~/.config/Jan`
- `~/.config/jan.ai.app`

## Next Steps

1. **Explore these directories** to find:
   - Configuration files (*.json, *config*, *settings*)
   - Log files (*.log)
   - MCP-related files

2. **Check Jan's Settings UI:**
   - Where exactly are you adding the MCP configuration?
   - Is it in a Settings UI form?
   - Or a JSON file?

3. **Check the error context:**
   - Where does the error appear? (UI? Logs?)
   - What does "AuthenticVerifier" refer to? (Is that the name you entered?)

## Important Questions

**To resolve this, I need to know:**

1. **Where are you configuring this in Jan?**
   - Settings UI with form fields?
   - JSON file? (what path?)
   - Other location?

2. **What name did you use for the server?**
   - "authentic-verification-layer"?
   - "AuthenticVerifier"?
   - Something else?

3. **What format did you enter?**
   - Separate fields (Command, Args)?
   - JSON text?
   - Other format?

4. **Can you access Jan's data folder?**
   - Settings > Advanced Settings > Open Jan Data Folder
   - Check for config files there

Let's explore the directories we found first.
