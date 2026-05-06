// api/gemini.js — Fixed version

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, language } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompts = {
    bn: `তুমি JARVIS, Abdur-এর AI assistant। বাংলায় সংক্ষিপ্ত, সঠিক উত্তর দাও।`,
    hi: `आप JARVIS हैं, Abdur का AI assistant। हिंदी में संक्षिप्त, सटीक जवाब दें।`,
    en: `You are JARVIS, Abdur's AI assistant. Be concise and accurate.`
  };

  try {
    // ✅ FIXED: Model name updated to gemini-2.0-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${prompts[language] || prompts.en}\n\nUser: ${question}\n\nAnswer:`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Gemini API error');
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.';

    return res.status(200).json({ answer: answer.trim() });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from Gemini',
      details: error.message 
    });
  }
}