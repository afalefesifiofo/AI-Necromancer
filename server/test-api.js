// Quick test of OpenAI API
import 'dotenv/config';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

console.log('🧪 Testing OpenAI API with actual request...\n');

try {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say "Hello from AI Necromancer!" in exactly 5 words.' },
      ],
      temperature: 0.7,
      max_tokens: 50,
    }),
  });

  console.log(`Status: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const error = await response.json();
    console.log('\n❌ Error Response:');
    console.log(JSON.stringify(error, null, 2));
    
    if (error.error?.code === 'insufficient_quota') {
      console.log('\n💡 Solution:');
      console.log('   1. Go to: https://platform.openai.com/account/billing');
      console.log('   2. Add payment method and credits');
      console.log('   3. Check usage limits');
    }
  } else {
    const data = await response.json();
    console.log('\n✅ Success!');
    console.log(`Response: ${data.choices[0].message.content}`);
    console.log(`\nTokens used: ${data.usage.total_tokens}`);
    console.log(`Cost: ~$${(data.usage.total_tokens * 0.00015 / 1000).toFixed(6)}`);
  }
} catch (error) {
  console.log('\n❌ Request failed:');
  console.log(error.message);
}
