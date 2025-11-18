# Fallback Mode Feature

## Overview
AI Necromancer now includes an intelligent fallback mode that activates when OpenAI API quota is exceeded or unavailable.

## How It Works

### 1. Automatic Detection
When the app encounters an API quota error (429 status), it:
- Pauses processing immediately
- Shows a prominent banner with the error
- Offers two options: Add Credits or Use Fallback Mode

### 2. User Choice
The user sees a banner with:
- **⚠️ Clear error message** explaining the quota issue
- **🔄 Use Fallback Mode button** - continues with basic transformations
- **💳 Add Credits button** - links to OpenAI billing page
- **Dismiss button** - closes the banner

### 3. Fallback Transformations
When fallback mode is active:
- **Analysis**: Uses file extension detection and pattern matching
- **Modernization**: Applies regex-based transformations (e.g., var → const)
- **Translation**: Creates template code with original as comments
- **Documentation**: Generates basic README and changelog

### 4. Visual Indicators
- Yellow banner shows "🔄 Fallback Mode Active"
- Results indicate when fallback was used
- Users know they're getting basic transformations

## Fallback Capabilities

### JavaScript Modernization
- `var` → `const`
- `function name()` → `const name = ()`
- Basic syntax updates

### Python Translation
- Preserves original code as comments
- Creates Python template structure
- Adds TODO markers for manual implementation

### Generic Transformations
- Adds header with transformation info
- Preserves original code
- Notes fallback mode usage

## Benefits

1. **No Crashes**: App continues working even without API credits
2. **User Control**: Users decide whether to add credits or use fallback
3. **Transparency**: Clear indication when fallback mode is active
4. **Graceful Degradation**: Basic functionality maintained

## API Error Handling

The system handles:
- **429 Too Many Requests**: Quota exceeded
- **401 Unauthorized**: Invalid API key
- **500 Server Error**: API unavailable
- **Network errors**: Connection issues

## Testing

To test fallback mode:
1. Use an API key without credits (or remove the key)
2. Upload files for processing
3. When quota error appears, click "Use Fallback Mode"
4. Processing continues with basic transformations

## Future Enhancements

Potential improvements:
- More sophisticated regex patterns
- Language-specific transformation rules
- AST-based transformations
- Caching of successful transformations
- Offline mode with pre-trained models
