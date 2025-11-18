# AI Necromancer Setup Guide

## Prerequisites

- Node.js 18+ installed
- OpenAI API account with API key

## Step-by-Step Setup

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Configure API Key

```bash
# Navigate to server directory
cd server

# Copy example env file
cp .env.example .env

# Edit .env file and add your API key
# On Windows: notepad .env
# On Mac/Linux: nano .env
```

Add your key to the `.env` file:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

Save and close the file.

### 4. Start the Application

```bash
# Go back to root directory
cd ..

# Start both frontend and backend
npm run dev:full
```

Or start them separately:

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend (in new terminal)
npm run dev
```

### 5. Open in Browser

Navigate to: http://localhost:5174

## Verify Setup

1. Open the app in your browser
2. Upload the example file: `examples/legacy-project.zip`
3. Watch the processing - you should see real AI transformations
4. Check the backend terminal for API calls

## Troubleshooting

### "OPENAI_API_KEY environment variable is not set"
- Make sure `.env` file exists in `server/` directory
- Check that the API key is correctly formatted
- Restart the backend server after adding the key

### "Backend service not running"
- Make sure the backend is started on port 3001
- Check for port conflicts
- Look for errors in the backend terminal

### "OpenAI API error: 401"
- Your API key is invalid or expired
- Get a new key from https://platform.openai.com/api-keys

### "OpenAI API error: 429"
- You've exceeded your API rate limit
- Check your OpenAI account usage and billing

### Backend won't start
- Make sure you ran `npm install` in the `server/` directory
- Check that port 3001 is not already in use

## Cost Considerations

The app uses `gpt-4o-mini` which is very cost-effective:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens

Typical file processing costs:
- Small file (100 lines): ~$0.001
- Medium file (500 lines): ~$0.005
- Large file (2000 lines): ~$0.02

Set usage limits in your OpenAI account to control costs.

## Next Steps

- Try the example files in `examples/`
- Experiment with different vibes (Necromancer, Mentor, Professional)
- Test different target languages (Python, JavaScript, TypeScript, Rust, Go)
- Upload your own legacy code projects!

## Support

For issues or questions:
- Check the main README.md
- Review server/README.md for backend details
- Check OpenAI API status: https://status.openai.com/
