# Groq Rate Limit Information

## Error: 429 Rate Limit Exceeded

You're hitting Groq's free tier rate limits. This is **normal** and expected behavior.

## Free Tier Limits

- **Tokens per minute (TPM)**: 12,000 tokens/minute
- **Model**: `llama-3.3-70b-versatile` (70B model)
- **Reset**: Limits reset every minute

## Your Current Usage

From the error:
- **Limit**: 12,000 TPM
- **Used**: 8,380 tokens
- **Requested**: 4,089 tokens
- **Wait time**: ~2.3 seconds

## Solutions

### Option 1: Wait and Retry (Simplest) ✅

Just wait a few seconds and try again. The limit resets every minute.

**Quick fix:**
- Wait 2-3 seconds
- Try your request again
- Should work after the limit resets

### Option 2: Use Smaller Model (Recommended)

Smaller models have higher rate limits on free tier:
- `llama-3.1-8b-instant` - Faster, higher limits
- `mixtral-8x7b-32768` - Good balance
- `gemma2-9b-it` - Smaller, faster

To change model, update `src/groq.ts`:
```typescript
export async function callGroq(
  prompt: string,
  model: string = "llama-3.1-8b-instant"  // Changed from llama-3.3-70b-versatile
)
```

### Option 3: Upgrade to Dev Tier (If Needed)

If you need higher limits:
- Visit: https://console.groq.com/settings/billing
- Upgrade to Dev Tier
- Higher rate limits
- Still free for most use cases

### Option 4: Implement Rate Limit Handling (Code)

Add automatic retry with exponential backoff to handle 429 errors gracefully.

**This would require code changes to add retry logic.**

## Understanding the Limits

**Free Tier:**
- 12,000 tokens/minute for large models (70B)
- Higher limits for smaller models
- Resets every minute
- Shared across all requests

**Why it happens:**
- You've made several requests quickly
- Free tier has generous but finite limits
- Large models (70B) consume more tokens

## Best Practices

1. **Wait between requests** - Don't spam the API
2. **Use smaller models** - Higher limits, still good quality
3. **Batch requests** - Make requests over time, not all at once
4. **Monitor usage** - Check Groq console for usage stats

## Quick Fix for Now

**Just wait 2-3 seconds and try again!**

The rate limit resets every minute, so after a short wait, your request should work.

## Summary

✅ **This is normal** - Free tier has rate limits
✅ **Wait 2-3 seconds** - Limits reset quickly
✅ **Consider smaller model** - Higher limits for smaller models
✅ **Upgrade if needed** - Dev tier has higher limits (still free)

The rate limit is a usage limit, not a code bug. Your MCP server is working correctly!
