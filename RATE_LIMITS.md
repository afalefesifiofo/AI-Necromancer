# OpenAI Rate Limits Guide

## Understanding Rate Limits

OpenAI enforces rate limits based on your account tier. The most restrictive limit is usually **RPM (Requests Per Minute)**.

## Current Limits by Tier

### Free Tier (Default)
- **3 RPM** (Requests Per Minute) ⚠️ **Most restrictive**
- 60,000 TPM (Tokens Per Minute)
- 200 RPD (Requests Per Day)
- 200,000 TPD (Tokens Per Day)

### Tier 1+ (Paid)
- **60 RPM** (Requests Per Minute)
- Higher token limits
- More daily requests

## How AI Necromancer Works

Each file requires **3 API requests**:
1. **Analyze** - Detect language and issues (~500 tokens)
2. **Modernize** - Transform the code (~2,000 tokens)
3. **Document** - Generate README and changelog (~800 tokens)

**Total per file: ~3,300 tokens, 3 requests**

## Processing Speed

### Free Tier (3 RPM)
- **1 file per minute** (3 requests = 1 minute)
- 10 files = ~10 minutes
- 50 files = ~50 minutes

With our 20-second delay between requests:
- Request 1 (analyze): 0s
- Request 2 (modernize): 20s
- Request 3 (document): 40s
- **Total: ~60 seconds per file**

### Tier 1+ (60 RPM)
- **20 files per minute** (60 requests / 3 per file)
- 10 files = ~30 seconds
- 50 files = ~2.5 minutes

With 1-second delay:
- Request 1: 0s
- Request 2: 1s
- Request 3: 2s
- **Total: ~3 seconds per file**

## Configuration

Edit `server/.env`:

```env
# For Free Tier (3 RPM)
RATE_LIMIT_DELAY=20000

# For Tier 1+ (60 RPM)
RATE_LIMIT_DELAY=1000
```

## What Happens When You Hit Limits

1. **429 Error**: "You exceeded your current quota"
2. **Banner Appears**: Shows error with options
3. **Two Choices**:
   - **Add Credits**: Go to OpenAI billing
   - **Use Fallback Mode**: Basic transformations without AI

## Fallback Mode

When API limits are hit, fallback mode provides:
- File extension-based language detection
- Regex-based modernization (var → const, etc.)
- Template-based translations
- Basic documentation generation

**No API calls required!**

## Recommendations

### For Development/Testing
- Use fallback mode for quick testing
- Test with 1-2 files first
- Monitor the terminal for rate limit messages

### For Production Use
1. **Upgrade to Tier 1+** for faster processing
2. **Add credits** to your OpenAI account
3. **Batch processing**: Upload files in smaller groups
4. **Be patient**: Free tier works, just slower

## Monitoring Usage

Check your usage at:
- https://platform.openai.com/usage

Set spending limits at:
- https://platform.openai.com/account/billing/limits

## Cost Estimation

Using gpt-4o-mini:
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens

**Per file cost:**
- Small (100 lines): ~$0.001
- Medium (500 lines): ~$0.005
- Large (2000 lines): ~$0.02

**100 files: ~$0.50 - $2.00**

Very affordable for most use cases!
