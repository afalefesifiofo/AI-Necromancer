// Quick setup verification script
import 'dotenv/config';

console.log('🔍 Checking AI Necromancer Backend Setup...\n');

// Check Node version
const nodeVersion = process.version;
console.log(`✓ Node.js version: ${nodeVersion}`);

// Check API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.log('❌ OPENAI_API_KEY not found in .env file');
  console.log('\n📝 To fix:');
  console.log('   1. Copy .env.example to .env');
  console.log('   2. Add your OpenAI API key');
  console.log('   3. Get key from: https://platform.openai.com/api-keys\n');
  process.exit(1);
}

if (!apiKey.startsWith('sk-')) {
  console.log('⚠️  API key format looks incorrect (should start with "sk-")');
} else {
  console.log(`✓ OPENAI_API_KEY found (${apiKey.substring(0, 8)}...)`);
}

// Test API connection
console.log('\n🔌 Testing OpenAI API connection...');

try {
  const response = await fetch('https://api.openai.com/v1/models', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (response.ok) {
    console.log('✓ OpenAI API connection successful!');
    const data = await response.json();
    const hasGPT4 = data.data.some(m => m.id.includes('gpt-4'));
    console.log(`✓ Available models: ${data.data.length} (GPT-4: ${hasGPT4 ? 'Yes' : 'No'})`);
  } else {
    const error = await response.json();
    console.log(`❌ API Error: ${error.error?.message || response.statusText}`);
    console.log('\n📝 Common issues:');
    console.log('   - Invalid API key');
    console.log('   - Expired API key');
    console.log('   - No credits in OpenAI account');
    process.exit(1);
  }
} catch (error) {
  console.log(`❌ Connection failed: ${error.message}`);
  console.log('\n📝 Check your internet connection');
  process.exit(1);
}

console.log('\n✅ Setup complete! Ready to start the server.');
console.log('   Run: npm start\n');
